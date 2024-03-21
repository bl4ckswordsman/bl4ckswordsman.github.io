import {ClipboardIcon, EnvelopeOpenIcon} from "@radix-ui/react-icons";
import {Button} from "@/components/ui/button";
import copy from 'copy-to-clipboard';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import React from "react";

interface EmailButtonProps {
    email: string;
}

export function CopyEmailButton({email}: EmailButtonProps) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="secondary" onClick={() => copy(email)}>
                        <ClipboardIcon className="h-4 w-4 mr-2"/>
                        Copy
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Click to copy email to clipboard</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export function SendEmailButton({email}: EmailButtonProps) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <a href={`mailto:${email}`}>
                        <Button variant="secondary">
                            <EnvelopeOpenIcon className="h-4 w-4 mr-2"/>
                            Send
                        </Button>
                    </a>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Click to send an email</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}