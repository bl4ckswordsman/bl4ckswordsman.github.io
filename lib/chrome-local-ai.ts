import {useCallback, useRef, useState} from 'react';

export const useChatLogic = () => {
    const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'ai' }[]>([]);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('');
    const [chatAvailable, setChatAvailable] = useState<boolean>(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom of chat window
    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
    }, []);

    // Append message without useEffect
    const appendMessage = (text: string, sender: 'user' | 'ai') => {
        setMessages(prev => [...prev, {text, sender}]);
        scrollToBottom(); // Scroll immediately after state update
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
            // Check if window.ai is available before calling methods
            // @ts-ignore  // window.ai is currently an experiment/proposal
            if (window.ai && typeof window.ai.canCreateTextSession === 'function') {
                // @ts-ignore
                const canCreate = await window.ai.canCreateTextSession();
                if (canCreate !== 'no') {
                    // @ts-ignore
                    const session = await window.ai.createTextSession();
                    const stream = session.promptStreaming(input);

                    let completeResponse = '';
                    let previousLength = 0;

                    appendMessage('', 'ai'); // Placeholder for AI response

                    for await (const chunk of stream) {
                        const newContent = chunk.slice(previousLength);
                        completeResponse += newContent;
                        updateLastMessage(completeResponse);
                        previousLength = chunk.length;
                    }
                } else {
                    appendMessage('Sorry, the AI model is not available on your device.', 'ai');
                    setChatAvailable(false); // Update state to indicate chat is not available
                }
            } else {
                appendMessage('AI functionality is not supported on this device.', 'ai');
                setChatAvailable(false); // Update state to indicate chat is not available
            }
        } catch (error) {
            if (error instanceof Error) {
                appendMessage(`Error: ${error.message}`, 'ai');
            } else {
                appendMessage('An unknown error occurred.', 'ai');
            }
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
        chatAvailable, // Expose chat availability state
    };
};
