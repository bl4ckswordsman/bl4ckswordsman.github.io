
export interface AIMessage {
    text: string;
    sender: 'user' | 'ai';
}

export interface AISessionOptions {
    topK?: number;
    temperature?: number;
}

export async function checkAIAvailability(): Promise<boolean> {
    // @ts-ignore
    if (window.ai && typeof window.ai.canCreateTextSession === 'function') {
        // @ts-ignore
        const canCreate = await window.ai.canCreateTextSession();
        return canCreate !== 'no';
    }
    return false;
}

export async function createAISession(options?: AISessionOptions) {
    // @ts-ignore
    return await window.ai.createTextSession(options);
}

export function handleAIError(error: unknown): string {
    if (error instanceof DOMException) {
        switch (error.name) {
            case 'InvalidStateError':
                return 'The model execution session has been destroyed. Please create a new session.';
            case 'OperationError':
                return 'Model execution service is not available. Please try again, possibly after relaunching Chrome.';
            case 'NotSupportedError':
                return 'The request was invalid. Please ensure that both topK and temperature parameters are specified when calling createTextSession.';
            case 'UnknownError':
                return `An unknown error occurred: ${error.message}. Please retry, possibly after relaunching Chrome.`;
            case 'NotReadableError':
                return 'The response was disabled.';
            case 'AbortError':
                return 'The request was canceled.';
            default:
                return 'An unknown error occurred.';
        }
    }
    return 'An unknown error occurred.';
}