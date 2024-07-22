import React, {useEffect, useState} from 'react';
import {Card} from '@/components/ui/card';
import RootLayout from "@/app/layout";
import {FadeIn} from "@/components/fade-in";
import CustomBreadcrumb from "@/components/breadcrumbs";
import {useChatLogic} from '@/lib/ai-chat-logic';
import {checkCanCreateTextSession} from "@/utils/ai-chat-browser-compat";
import {useScrollAnchor} from '@/lib/hooks/use-scroll-anchor';
import {Tabs, TabsList, TabsTrigger, TabsContent} from '@/components/ui/tabs';
import RealtimeChatContent from "@/components/chat-realtime-content";
import ChatCardHeader from "@/components/chat-card-header";
import {useRealtimeChatLogic} from "@/lib/realtime-ai-chat";
import ChatContent from "@/components/chat-content";


const ChatPage: React.FC = () => {
    const {containerRef, messagesRef, scrollToBottom} = useScrollAnchor();

    const {
        messages,
        input,
        loading,
        setInput,
        handleSend,
        chatAvailable,
        clearMessages,
    } = useChatLogic(scrollToBottom);

    const {
        input: inputRealtime,
        aiResponse: aiResponseRealtime,
        setInput: setInputRealtime,
    } = useRealtimeChatLogic();

    const [aiReady, setAiReady] = useState<boolean | null>(null);

    useEffect(() => {
        (async () => {
            const result = await checkCanCreateTextSession();
            setAiReady(result.isReadily);
        })();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);
    return (
        <div className="m-4">
            <Tabs className="max-w-md mx-auto" defaultValue="chat">
                <TabsList className="x-md">
                    <TabsTrigger onClick={scrollToBottom} value="chat">Chat mode</TabsTrigger>
                    <TabsTrigger value="realtime">Real-time mode</TabsTrigger>
                </TabsList>
                <TabsContent value="realtime">
                    <Card>
                        <ChatCardHeader headerText="Real-time AI Chat" aiReady={aiReady} clearMessages={clearMessages}/>
                        <RealtimeChatContent
                            input={inputRealtime}
                            aiResponse={aiResponseRealtime}
                            chatAvailable={chatAvailable}
                            setInput={setInputRealtime}
                        />
                    </Card>
                </TabsContent>
                <TabsContent value="chat">
                    <Card>
                        <ChatCardHeader headerText="AI Chat" aiReady={aiReady} clearMessages={clearMessages}/>
                        <ChatContent messages={messages} input={input} loading={loading} chatAvailable={chatAvailable}
                                     setInput={setInput} handleSend={handleSend}
                                     containerRef={containerRef} messagesRef={messagesRef}/>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default function App() {
    return (
        <RootLayout titleKey={"aichat"}>
            <FadeIn>
                <CustomBreadcrumb/>
                <ChatPage/>
            </FadeIn>
        </RootLayout>
    );
}
