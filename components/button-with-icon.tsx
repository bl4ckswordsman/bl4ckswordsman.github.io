import {ReactNode} from 'react';
import {Button} from "@/components/ui/button";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

type ButtonVariant = "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
type ButtonSize = "default" | "sm" | "lg" | "icon" | null | undefined;

interface ButtonWithIconProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    onClick: () => void;
    Icon: ReactNode;
    buttonText?: string;
    tooltipText?: string;
    children?: ReactNode;
}

export function ButtonWithIcon({
                                   variant = "default",
                                   size = "default",
                                   onClick,
                                   Icon,
                                   buttonText = "",
                                   tooltipText = "",
                                   children
                               }: ButtonWithIconProps) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button size={size} variant={variant} onClick={onClick}>
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