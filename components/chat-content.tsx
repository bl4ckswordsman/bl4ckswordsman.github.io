import React from 'react';
import {CardContent, CardFooter} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import MarkdownWithMath from "@/components/markdown-with-math";

interface ChatContentProps {
    messages: any[];
    input: string;
    loading: boolean;
    chatAvailable: boolean;
    setInput: (input: string) => void;
    handleSend: () => Promise<void>;
    containerRef: React.RefObject<HTMLDivElement>;
    messagesRef: React.RefObject<HTMLDivElement>;
}

const ChatContent: React.FC<ChatContentProps> = ({
                                                     messages,
                                                     input,
                                                     loading,
                                                     chatAvailable,
                                                     setInput,
                                                     handleSend,
                                                     containerRef,
                                                     messagesRef,
                                                 }) => (
    <div>
        <CardContent ref={containerRef} className="p-4 space-y-4 overflow-y-auto h-80">
            {messages.map((msg, index) => (
                <div
                    ref={index === messages.length - 1 ? messagesRef : null}
                    key={index}
                    className={`flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ${
                        msg.sender === 'user' ? 'ml-auto bg-blue-500 text-white' : 'bg-gray-200 text-black'
                    }`}
                >
                    <MarkdownWithMath text={msg.text}/>
                </div>
            ))}
            <div/>
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
                    disabled={!chatAvailable}
                />
                <Button type="submit" disabled={loading || !chatAvailable}>
                    Send
                </Button>
            </form>
        </CardFooter>
    </div>
);

export default ChatContent;