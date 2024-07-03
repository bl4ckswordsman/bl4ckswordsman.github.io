import {ReactNode} from 'react';
import {Button} from "@/components/ui/button";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

type ButtonVariant = "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;

interface ButtonWithIconProps {
    variant: ButtonVariant;
    onClick: () => void;
    Icon: ReactNode;
    buttonText: string;
    tooltipText: string;
    children?: ReactNode;
}

export function ButtonWithIcon({variant, onClick, Icon, buttonText, tooltipText, children}: ButtonWithIconProps) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant={variant} onClick={onClick}>
                        {Icon}
                        {buttonText}
                        {children}
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{tooltipText}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}