import * as React from "react";
import {useMediaQuery} from "@/lib/hooks/use-media-query";
import {Button} from "@/components/ui/button";
import {Button as NextUIButton} from "@nextui-org/button";
import {GearIcon, EraserIcon} from "@radix-ui/react-icons";
import {ButtonWithIcon} from "@/components/button-with-icon";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {Checkbox} from "@/components/ui/checkbox";

interface SettingsPopoverProps {
    clearMessages: () => void;
    shortReplies: boolean;
    toggleShortReplies: () => void;
}

const SettingsPopover: React.FC<SettingsPopoverProps> = ({clearMessages, shortReplies, toggleShortReplies}) => {
    const [open, setOpen] = React.useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const handleCheckboxChange = () => {
        toggleShortReplies();
    };

    const content = (
        <div className="m-2">
            <ButtonWithIcon
                onClick={clearMessages}
                Icon={<EraserIcon className="h-4 w-4 mr-2" />}
                variant={"secondary"}
                buttonText={"Clear Messages"}
            />
            <div className="mt-4 flex items-center space-x-2">
                <Checkbox
                    id="short-replies"
                    checked={shortReplies}
                    onCheckedChange={handleCheckboxChange}
                />
                <label
                    htmlFor="short-replies"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Short replies
                </label>
            </div>
        </div>
    );

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <NextUIButton isIconOnly startContent={<GearIcon/>} radius={"full"} variant={"faded"}/>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Settings</DialogTitle>
                        <DialogDescription>Manage your settings here.</DialogDescription>
                    </DialogHeader>
                    {content}
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <NextUIButton isIconOnly startContent={<GearIcon/>} radius={"full"} variant={"faded"}/>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Settings</DrawerTitle>
                    <DrawerDescription>Manage your settings here.</DrawerDescription>
                </DrawerHeader>
                {content}
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default SettingsPopover;