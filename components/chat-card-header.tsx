import React from 'react';
import {CardHeader} from '@/components/ui/card';
import {Badge} from "@nextui-org/badge";
import {IoIosClose, IoIosCheckmark} from "react-icons/io";
import {Button as NextUIButton} from "@nextui-org/button";
import {HiSparkles} from "react-icons/hi2";
import BrowserInfoPopover from "@/components/browser-info-popover";
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/react";
import {GearIcon, EraserIcon} from "@radix-ui/react-icons";
import {ButtonWithIcon} from "@/components/button-with-icon";

interface ChatCardHeaderProps {
    aiReady: boolean | null;
    clearMessages: () => void;
    headerText?: string;
}

const ChatCardHeader: React.FC<ChatCardHeaderProps> = ({aiReady, clearMessages, headerText = "AI Chat"}) => {
    const buttonColor = aiReady ? "success" : "danger";
    const badgeContent = aiReady ? <IoIosCheckmark/> : <IoIosClose/>;

    return (
        <CardHeader className="p-4 border-b">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{headerText}</h3>
                <div className="space-x-4">
                    <Popover className="max-w-2xl" backdrop="blur" showArrow>
                        <PopoverTrigger>
                            <NextUIButton isIconOnly startContent={<GearIcon/>} radius={"full"} variant={"faded"}/>
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className="m-2">
                                <ButtonWithIcon onClick={clearMessages} Icon={<EraserIcon className="h-4 w-4 mr-2"/>}
                                                variant={"secondary"} buttonText={"Clear Messages"}/>
                            </div>
                        </PopoverContent>
                    </Popover>
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