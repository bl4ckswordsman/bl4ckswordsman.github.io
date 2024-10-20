type SendMessageParams = {
    name: string;
    email: string;
    message: string;
    isPublic: boolean;
    showNameEmail: boolean;
    turnstileToken: string;
};

export async function sendMessage({name, email, message, isPublic, showNameEmail, turnstileToken}: SendMessageParams): Promise<void> {
    try {
        const browserInfo = {
            userAgent: navigator.userAgent,
            language: navigator.language,
            screenSize: `${window.screen.width}x${window.screen.height}`,
            windowSize: `${window.innerWidth}x${window.innerHeight}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        };

        const response = await fetch('/api/internal/send-guestbook-entry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email, message, isPublic, showNameEmail, turnstileToken, browserInfo}),
        });

        if (response.ok) {
            alert('Message sent successfully!');
        } else {
            alert('Failed to send message. Please try again later.');
        }
    } catch (error) {
        console.error('Error sending message:', error);
        alert('An error occurred. Please try again later.');
    }
}