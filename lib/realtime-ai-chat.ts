import {useState, useRef, useEffect} from 'react';
import {checkAIAvailability, createAISession, handleAIError} from '@/lib/chrome-local-ai';

export const useRealtimeChatLogic = () => {
    const [input, setInput] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [chatAvailable, setChatAvailable] = useState<boolean>(true);
    const sessionRef = useRef<any>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    const initializeSession = async () => {
        try {
            const isAvailable = await checkAIAvailability();
            if (isAvailable) {
                sessionRef.current = await createAISession();
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
        (async () => {
            try {
                await initializeSession();
            } catch (error) {
                console.error('Failed to initialize session:', error);
            }
        })();
    }, []);

    const handleInputChange = async (newInput: string) => {
        setInput(newInput);
        if (sessionRef.current && chatAvailable) {
            try {
                // Abort previous request if it exists
                if (abortControllerRef.current) {
                    abortControllerRef.current.abort();
                }

                // Create new AbortController for this request
                abortControllerRef.current = new AbortController();

                const stream = sessionRef.current.promptStreaming(newInput, {signal: abortControllerRef.current.signal});

                // Reset the AI response at the start of a new stream
                setAiResponse('');

                for await (const chunk of stream) {
                    // Directly update the aiResponse with the new chunk
                    setAiResponse(chunk);
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