import React from 'react';
import {CardHeader} from '@/components/ui/card';
import {Badge} from "@nextui-org/badge";
import {IoIosClose, IoIosCheckmark} from "react-icons/io";
import {Button as NextUIButton} from "@nextui-org/button";
import {HiSparkles} from "react-icons/hi2";
import BrowserInfoPopover from "@/components/browser-info-popover";
import SettingsDrawer from "@/components/chat-settings-drawer";

interface ChatCardHeaderProps {
    aiReady: boolean | null;
    clearMessages: () => void;
    headerText?: string;
    shortReplies: boolean;
    toggleShortReplies: () => void;
    sessionInfo: {
        tokensSoFar: number;
        maxTokens: number;
        tokensLeft: number;
    };
    modelConfig: {
        topK: number;
        temperature: number;
    };
    updateModelConfig: (config: { topK?: number; temperature?: number }) => void;
    resetModelConfig: () => void;
    terminateSession: () => void;
}

const ChatCardHeader: React.FC<ChatCardHeaderProps> = ({
                                                           aiReady,
                                                           clearMessages,
                                                           headerText = "AI Chat",
                                                           shortReplies,
                                                           toggleShortReplies,
                                                           sessionInfo,
                                                           modelConfig,
                                                           updateModelConfig,
                                                           resetModelConfig,
                                                           terminateSession
                                                       }) => {
    const buttonColor = aiReady ? "success" : "danger";
    const badgeContent = aiReady ? <IoIosCheckmark/> : <IoIosClose/>;

    return (
        <CardHeader className="p-4 border-b">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{headerText}</h3>
                <div className="space-x-4">
                    <SettingsDrawer
                        clearMessages={clearMessages}
                        shortReplies={shortReplies}
                        toggleShortReplies={toggleShortReplies}
                        sessionInfo={sessionInfo}
                        modelConfig={modelConfig}
                        updateModelConfig={updateModelConfig}
                        resetModelConfig={resetModelConfig}
                        terminateSession={terminateSession}
                        aiAvailable={aiReady}
                    />
                    <Badge isOneChar content={badgeContent} color={buttonColor} placement="bottom-left">
                        <BrowserInfoPopover>
                            <NextUIButton isIconOnly radius={"full"} variant={"ghost"} color={buttonColor}>
                                <HiSparkles/>
                            </NextUIButton>
                        </BrowserInfoPopover>
                    </Badge>
                </div>
            </div>
        </CardHeader>
    );
};

export default ChatCardHeader;