import {useState, useEffect, useRef} from 'react';
import {AIMessage, AISessionOptions, checkAICapabilities, createAISession, handleAIError} from '@/lib/chrome-local-ai';

export const useChatLogic = (scrollToBottom: () => void) => {
    const [messages, setMessages] = useState<AIMessage[]>([]);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('');
    const [chatAvailable, setChatAvailable] = useState<boolean>(true);
    const sessionRef = useRef<any>(null);

    // Load messages from localStorage when the component mounts
    useEffect(() => {
        const savedMessages = localStorage.getItem('messages');
        if (savedMessages) {
            try {
                const parsedMessages = JSON.parse(savedMessages);
                setMessages(parsedMessages);
                console.log('Messages loaded from localStorage:', parsedMessages);
            } catch (error) {
                console.error('Failed to parse messages from localStorage:', error);
            }
        } else {
            console.log('No messages found in localStorage.');
        }
    }, []);

    // Save messages to localStorage whenever they change
    useEffect(() => {
        if (messages.length > 0) {
            try {
                localStorage.setItem('messages', JSON.stringify(messages));
                console.log('Messages saved to localStorage:', messages);
            } catch (error) {
                console.error('Failed to save messages to localStorage:', error);
            }
        }
    }, [messages]);

    const appendMessage = (text: string, sender: 'user' | 'ai') => {
        setMessages(prev => [...prev, {text, sender}]);
        scrollToBottom(); // Use scrollToBottom from useScrollAnchor hook
    };

    const updateLastMessage = (text: string) => {
        setMessages(prev => {
            const updatedMessages = [...prev];
            const lastIndex = updatedMessages.length - 1;
            if (lastIndex >= 0 && updatedMessages[lastIndex].sender === 'ai') {
                updatedMessages[lastIndex].text = text;
            }
            return updatedMessages;
        });
        scrollToBottom(); // Use scrollToBottom from useScrollAnchor hook
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        appendMessage(input.trim(), 'user');
        setInput('');
        setLoading(true);

        try {
            const isAvailable = await checkAICapabilities();
            if (isAvailable) {
                if (!sessionRef.current) {
                    // @ts-ignore
                    const capabilities = await window.ai.assistant.capabilities();
                    const options: AISessionOptions = {
                        topK: capabilities.defaultTopK,
                        temperature: capabilities.defaultTemperature,
                    };
                    sessionRef.current = await createAISession(options);
                }

                const stream = sessionRef.current.promptStreaming(input);

                let completeResponse = '';
                let previousLength = 0;

                appendMessage('', 'ai');

                for await (const chunk of stream) {
                    const newContent = chunk.slice(previousLength);
                    completeResponse += newContent;
                    updateLastMessage(completeResponse);
                    previousLength = chunk.length;
                }
            } else {
                appendMessage('Sorry, the AI model is not available on your device.', 'ai');
                setChatAvailable(false);
            }
        } catch (error) {
            const errorMessage = handleAIError(error);
            appendMessage(errorMessage, 'ai');
        } finally {
            setLoading(false);
        }
    };

    // Function to clear messages from state and localStorage
    const clearMessages = () => {
        setMessages([]);
        localStorage.removeItem('messages');
        console.log('Messages cleared from localStorage.');
    };

    return {
        messages,
        input,
        loading,
        setInput,
        handleSend,
        chatAvailable,
        clearMessages,
    };
};