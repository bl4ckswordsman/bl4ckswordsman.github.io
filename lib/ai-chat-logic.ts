import { useState, useRef, useCallback } from 'react';
import { AIMessage, checkAIAvailability, createAISession, handleAIError } from '@/lib/chrome-local-ai';

export const useChatLogic = () => {
    const [messages, setMessages] = useState<AIMessage[]>([]);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('');
    const [chatAvailable, setChatAvailable] = useState<boolean>(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    const appendMessage = (text: string, sender: 'user' | 'ai') => {
        setMessages(prev => [...prev, { text, sender }]);
        scrollToBottom();
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
        scrollToBottom();
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        appendMessage(input.trim(), 'user');
        setInput('');
        setLoading(true);

        try {
            const isAvailable = await checkAIAvailability();
            if (isAvailable) {
                const session = await createAISession();
                const stream = session.promptStreaming(input);

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

    return {
        messages,
        input,
        loading,
        setInput,
        handleSend,
        messagesEndRef,
        chatAvailable,
    };
};