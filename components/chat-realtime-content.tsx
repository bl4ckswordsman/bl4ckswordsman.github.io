import React from 'react';
import {Input} from '@/components/ui/input';
import {ScrollArea} from "@/components/ui/scroll-area";
import {Card, CardContent} from "@/components/ui/card";

interface RealtimeChatContentProps {
    input: string;
    aiResponse: string;
    chatAvailable: boolean;
    setInput: (input: string) => void;
}

const RealtimeChatContent: React.FC<RealtimeChatContentProps> = ({
                                                                     input,
                                                                     aiResponse,
                                                                     chatAvailable,
                                                                     setInput,
                                                                 }) => (
    <>
        <CardContent className="p-4 space-y-4">
            <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message here..."
                className="flex-1"
                autoComplete="off"
                disabled={!chatAvailable}
            />
            <Card>
                <ScrollArea>
                    <div className="text-primary font-bold text-2xl p-4 rounded-lg h-[300px] overflow-auto">
                        {aiResponse || "AI response will appear here in real-time"}
                    </div>
                </ScrollArea>
            </Card>
        </CardContent>
    </>
);

export default RealtimeChatContent;
