import {useState, useRef, useEffect} from 'react';
import {checkAICapabilities, createAISession, handleAIError, AISessionOptions} from '@/lib/chrome-local-ai';

export const useRealtimeChatLogic = () => {
    const [input, setInput] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [chatAvailable, setChatAvailable] = useState<boolean>(true);
    const sessionRef = useRef<any>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    const initializeSession = async () => {
        try {
            const isAvailable = await checkAICapabilities();
            if (isAvailable) {
                // @ts-ignore
                const capabilities = await window.ai.languageModel.capabilities();
                const options: AISessionOptions = {
                    topK: capabilities.defaultTopK,
                    temperature: capabilities.defaultTemperature,
                };
                sessionRef.current = await createAISession(options);
                setChatAvailable(true);
            } else {
                setChatAvailable(false);
            }
        } catch (error) {
            console.error('Error initializing AI session:', error);
            setChatAvailable(false);
        }
    };

    useEffect(() => {
        initializeSession().then(r => r);
    }, []);

    const handleInputChange = async (newInput: string) => {
        setInput(newInput);
        if (sessionRef.current && chatAvailable) {
            try {
                if (abortControllerRef.current) {
                    abortControllerRef.current.abort();
                }

                abortControllerRef.current = new AbortController();

                const stream = sessionRef.current.promptStreaming(newInput, {signal: abortControllerRef.current.signal});

                setAiResponse('');

                let completeResponse = '';
                let previousLength = 0;

                for await (const chunk of stream) {
                    const newContent = chunk.slice(previousLength);
                    completeResponse += newContent;
                    setAiResponse(completeResponse);
                    previousLength = chunk.length;
                }
            } catch (error: unknown) {
                if (error instanceof Error && error.name !== 'AbortError') {
                    const errorMessage = handleAIError(error);
                    setAiResponse(errorMessage);
                }
            }
        }
    };

    return {
        input,
        aiResponse,
        setInput: handleInputChange,
        chatAvailable,
    };
};