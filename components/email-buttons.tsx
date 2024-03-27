import {ClipboardIcon, EnvelopeOpenIcon} from "@radix-ui/react-icons";
import {Button} from "@/components/ui/button";
import copy from 'copy-to-clipboard';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import React from "react";
import {ButtonWithIcon} from "@/components/button-with-icon";

interface EmailButtonProps {
    email: string;
}

export function CopyEmailButton({email}: EmailButtonProps) {
    return (
        <ButtonWithIcon variant={"secondary"} onClick={() => copy(email)}
                        Icon={<ClipboardIcon className="h-4 w-4 mr-2"/>} buttonText={"Copy"}
                        tooltipText={"Click to copy email to clipboard"}/>
    );
}

export function SendEmailButton({email}: EmailButtonProps) {
    return (
        <ButtonWithIcon variant={"secondary"} onClick={() => window.open(`mailto:${email}`)}
                        Icon={<EnvelopeOpenIcon className="h-4 w-4 mr-2"/>} buttonText={"Send"}
                        tooltipText={"Click to send an email"}/>
    );
}