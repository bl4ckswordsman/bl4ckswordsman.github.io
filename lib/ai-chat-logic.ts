import {useState, useEffect, useRef, useCallback} from 'react';
import {AIMessage, AISessionOptions, checkAICapabilities, createAISession, handleAIError} from '@/lib/chrome-local-ai';

export const useChatLogic = (scrollToBottom: () => void) => {
    const [messages, setMessages] = useState<AIMessage[]>([]);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('');
    const [chatAvailable, setChatAvailable] = useState<boolean>(true);
    const sessionRef = useRef<any>(null);
    const [shortReplies, setShortReplies] = useState(
        typeof window !== 'undefined' && localStorage.getItem('shortReplies') === 'true'
    );

    const [sessionInfo, setSessionInfo] = useState({
        tokensSoFar: 0,
        maxTokens: 0,
        tokensLeft: 0,
    });

    const [modelConfig, setModelConfig] = useState({
        topK: 0,
        temperature: 0,
    });

    useEffect(() => {
        if (sessionRef.current) {
            updateSessionInfo();
        }
    }, [messages]);

    const updateSessionInfo = () => {
        if (sessionRef.current) {
            setSessionInfo({
                tokensSoFar: sessionRef.current.tokensSoFar,
                maxTokens: sessionRef.current.maxTokens,
                tokensLeft: sessionRef.current.tokensLeft,
            });
        }
    };

    const updateModelConfig = useCallback(async (config: { topK?: number; temperature?: number }) => {
        if (sessionRef.current) {
            try {
                await sessionRef.current.updateConfig(config);
                setModelConfig(prevConfig => ({...prevConfig, ...config}));
            } catch (error) {
                console.error('Failed to update model configuration:', error);
            }
        }
    }, []);

    const resetModelConfig = useCallback(async () => {
        if (sessionRef.current) {
            try {
                // @ts-ignore
                const capabilities = await window.ai.assistant.capabilities();
                const defaultConfig = {
                    topK: capabilities.defaultTopK ?? 0,
                    temperature: capabilities.defaultTemperature ?? 0,
                };
                await sessionRef.current.updateConfig(defaultConfig);
                setModelConfig(defaultConfig);
            } catch (error) {
                console.error('Failed to reset model configuration:', error);
            }
        }
    }, []);

    const terminateSession = useCallback(() => {
        if (sessionRef.current) {
            sessionRef.current.destroy();
            sessionRef.current = null;
            setSessionInfo({
                tokensSoFar: 0,
                maxTokens: 0,
                tokensLeft: 0,
            });
        }
    }, []);

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

    const appendMessage = useCallback((text: string, sender: 'user' | 'ai') => {
        setMessages(prev => [...prev, {text, sender}]);
        scrollToBottom(); // Use scrollToBottom from useScrollAnchor hook
    }, [scrollToBottom]);

    const updateLastMessage = useCallback((text: string) => {
        setMessages(prev => {
            const updatedMessages = [...prev];
            const lastIndex = updatedMessages.length - 1;
            if (lastIndex >= 0 && updatedMessages[lastIndex].sender === 'ai') {
                updatedMessages[lastIndex].text = text;
            }
            return updatedMessages;
        });
        scrollToBottom(); // Use scrollToBottom from useScrollAnchor hook
    }, [scrollToBottom]);

    const handleSend = useCallback(async () => {
        if (!input.trim()) return;

        let finalInput = input.trim();
        if (shortReplies) {
            finalInput = `Reply shortly to this: ${finalInput}`;
        }

        appendMessage(finalInput, 'user');
        setInput('');
        setLoading(true);

        try {
            const isAvailable = await checkAICapabilities();
            if (isAvailable) {
                if (!sessionRef.current) {
                    // @ts-ignore
                    const capabilities = await window.ai.assistant.capabilities();
                    const options: AISessionOptions = {
                        topK: capabilities.defaultTopK ?? 0,
                        temperature: capabilities.defaultTemperature ?? 0,
                    };
                    sessionRef.current = await createAISession(options);
                    setModelConfig({
                        topK: options.topK ?? 0,
                        temperature: options.temperature ?? 0,
                    });
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
                updateSessionInfo();
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
    }, [input, shortReplies, appendMessage, updateLastMessage]);

    const toggleShortReplies = useCallback(() => {
        setShortReplies(prev => {
            const newValue = !prev;
            localStorage.setItem('shortReplies', newValue.toString());
            return newValue;
        });
    }, []);

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
        shortReplies,
        toggleShortReplies,
        sessionInfo,
        modelConfig,
        updateModelConfig,
        resetModelConfig,
        terminateSession,
    };
};