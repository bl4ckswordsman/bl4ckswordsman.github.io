import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import RootLayout from "@/app/layout";
import { FadeIn } from "@/components/fade-in";
import CustomBreadcrumb from "@/components/breadcrumbs";
import { useChatLogic } from '@/lib/chrome-local-ai';

const ChatPage: React.FC = () => {
    const {
        messages,
        input,
        loading,
        setInput,
        handleSend,
        messagesEndRef,
        chatAvailable,
    } = useChatLogic();

    return (
        <Card className="m-4 max-w-md mx-auto">
            <CardHeader className="p-4 border-b">
                <h3 className="text-lg font-semibold">AI Chat Playground</h3>
            </CardHeader>
            <CardContent className="p-4 space-y-4 overflow-y-auto h-80">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ${
                            msg.sender === 'user' ? 'ml-auto bg-blue-500 text-white' : 'bg-gray-200 text-black'
                        }`}
                    >
                        {msg.text}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </CardContent>
            <CardFooter className="p-4 border-t">
                <form
                    onSubmit={async (event) => {
                        event.preventDefault();
                        if (!input.trim()) return;
                        await handleSend();
                    }}
                    className="flex items-center space-x-2 w-full"
                >
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message here..."
                        className="flex-1"
                        autoComplete="off"
                        disabled={!chatAvailable} // Disable input if chat is not available
                    />
                    <Button type="submit" disabled={loading || !chatAvailable}>
                        Send
                    </Button>
                </form>
            </CardFooter>
        </Card>
    );
};

export default function App() {
    return (
        <RootLayout titleKey={"aichat"}>
            <FadeIn>
                <CustomBreadcrumb />
                <ChatPage />
            </FadeIn>
        </RootLayout>
    );
}
