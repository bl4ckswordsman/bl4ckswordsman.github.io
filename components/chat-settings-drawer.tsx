import * as React from "react";
import {useMediaQuery} from "@/lib/hooks/use-media-query";
import {Button} from "@/components/ui/button";
import {GearIcon, EraserIcon, ResetIcon} from "@radix-ui/react-icons";
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
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {ScrollArea} from "@/components/ui/scroll-area";

interface SettingsDrawerProps {
    clearMessages: () => void;
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

const SettingsDrawer: React.FC<SettingsDrawerProps> = ({
                                                           clearMessages,
                                                           shortReplies,
                                                           toggleShortReplies,
                                                           sessionInfo,
                                                           modelConfig,
                                                           updateModelConfig,
                                                           resetModelConfig,
                                                           terminateSession
                                                       }) => {
    const [open, setOpen] = React.useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [localTopK, setLocalTopK] = React.useState(modelConfig.topK);
    const [localTemperature, setLocalTemperature] = React.useState(modelConfig.temperature);

    React.useEffect(() => {
        setLocalTopK(modelConfig.topK);
        setLocalTemperature(modelConfig.temperature);
    }, [modelConfig]);

    const handleUpdateConfig = () => {
        updateModelConfig({topK: localTopK, temperature: localTemperature});
    };

    const settingsButton = (
        <Button size="icon" variant="outline" className="rounded-full">
            <GearIcon className="h-4 w-4"/>
        </Button>
    );

    const content = (
        <ScrollArea className={isDesktop ? "max-h-[calc(100vh-8rem)]" : "h-[calc(100vh-26rem)]"}>
            <div className="space-y-4 pr-4">
                <div>
                    <h3 className="font-semibold mb-2">Session Information</h3>
                    <p>Tokens used: {sessionInfo.tokensSoFar}</p>
                    <p>Max tokens: {sessionInfo.maxTokens}</p>
                    <p>Tokens left: {sessionInfo.tokensLeft}</p>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">Model Configuration</h3>
                    <div className="space-y-2">
                        <Label htmlFor="topK">Top K</Label>
                        <Input
                            id="topK"
                            type="number"
                            value={localTopK}
                            onChange={(e) => setLocalTopK(Number(e.target.value))}
                        />
                    </div>
                    <div className="space-y-2 mt-2">
                        <Label htmlFor="temperature">Temperature</Label>
                        <Input
                            id="temperature"
                            type="number"
                            step="0.1"
                            value={localTemperature}
                            onChange={(e) => setLocalTemperature(Number(e.target.value))}
                        />
                    </div>
                    <div className="flex space-x-2 mt-2">
                        <Button onClick={handleUpdateConfig}>Update Config</Button>
                        <Button onClick={resetModelConfig} variant="outline">Reset to Default</Button>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="short-replies"
                        checked={shortReplies}
                        onCheckedChange={toggleShortReplies}
                    />
                    <Label htmlFor="short-replies">Enable Short Replies</Label>
                </div>
                <ButtonWithIcon
                    onClick={clearMessages}
                    Icon={<EraserIcon className="h-4 w-4 mr-2"/>}
                    variant="secondary"
                    buttonText="Clear Chat History"
                />
                <ButtonWithIcon
                    onClick={terminateSession}
                    Icon={<ResetIcon className="h-4 w-4 mr-2"/>}
                    variant="destructive"
                    buttonText="Terminate Session"
                />
            </div>
        </ScrollArea>
    );

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {settingsButton}
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
                {settingsButton}
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Settings</DrawerTitle>
                    <DrawerDescription>Manage your settings here.</DrawerDescription>
                </DrawerHeader>
                <div className="px-4">
                    {content}
                </div>
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default SettingsDrawer;