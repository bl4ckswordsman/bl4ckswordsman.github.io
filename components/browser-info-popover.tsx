import React, {useEffect, useState, ReactNode} from 'react';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    Accordion,
    AccordionItem,
    Spacer,
    Divider,
    Spinner
} from "@nextui-org/react";
import StatusChip from "@/components/status-chip";
import {
    isCompatibleBrowser,
    aiReadyString,
    aiUnavailableString,
    checkCanCreateTextSession,
    browserVersionReqsString,
    browserReqsString,
    osReqsString
} from "@/utils/ai-chat-browser-compat";
import {ArrowLeftIcon} from '@radix-ui/react-icons';
import {ButtonWithIcon} from "@/components/button-with-icon";
import {Button} from "@/components/ui/button";
import {getBrowserInfo} from '@/utils/browser-utils';
import {OtherReqs, RequirementsSummary} from "@/components/browser-reqs-local-al";

interface BrowserInfoPopoverProps {
    children: ReactNode;
}

const BrowserInfoPopover: React.FC<BrowserInfoPopoverProps> = ({children}) => {
    const [browserInfo, setBrowserInfo] = useState({browserName: "", browserVersion: "", os: "", browserVariant: ""});
    const [aiReady, setAiReady] = useState<boolean | null>(null);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [showSummary, setShowSummary] = useState(false);

    useEffect(() => {
        getBrowserInfo().then(setBrowserInfo);
        checkAiReadiness().catch(error => console.error('Error checking AI readiness:', error)); // TODO: Handle error
    }, []);

    const checkAiReadiness = async () => {
        try {
            const {isReadily} = await checkCanCreateTextSession();
            setAiReady(isReadily);
        } catch (error) {
            console.error('Error checking AI readiness:', error);
            setAiReady(false);
        }
    };

    const {isChromeOrChromium, isVersionCompatible, isOSCompatible} = isCompatibleBrowser(browserInfo);
    const toggleSummaryView = () => setShowSummary(!showSummary);

    return (
        <Popover isOpen={isPopoverOpen} onOpenChange={() => setIsPopoverOpen(!isPopoverOpen)}
                 onClose={() => setShowSummary(false)} className="max-w-2xl" backdrop="blur" color="default">
            <PopoverTrigger>{children}</PopoverTrigger>
            <PopoverContent>
                {showSummary ? (
                    <div>
                        <div className="m-2">
                            <ButtonWithIcon onClick={toggleSummaryView} Icon={<ArrowLeftIcon/>} variant="secondary">
                                Back to requirements
                            </ButtonWithIcon>
                        </div>
                        <Divider/>
                        <div className="m-2">
                            <RequirementsSummary/>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="m-2">
                            {aiReady === null ? (<Spinner/>) : aiReady ? (<p>{aiReadyString}</p>) : (
                                <p>{aiUnavailableString}</p>)}
                        </div>
                        <Divider/>
                        <Spacer/>
                        <Accordion variant="bordered">
                            <AccordionItem key="1" aria-label="Browser" title={
                                <div className="flex justify-between items-center">
                                    Browser:
                                    <StatusChip status={isChromeOrChromium ? 'success' : 'danger'}
                                                content={browserInfo.browserName}/>
                                </div>
                            }>
                                {browserReqsString}
                            </AccordionItem>
                            <AccordionItem key="2" aria-label="Browser version" title={
                                <div className="flex justify-between items-center">
                                    Browser version:
                                    <StatusChip status={isVersionCompatible ? 'success' : 'danger'}
                                                content={browserInfo.browserVersion}/>
                                </div>
                            }>
                                {browserVersionReqsString}
                            </AccordionItem>
                            <AccordionItem key="3" aria-label="OS" title={
                                <div className="flex justify-between items-center">
                                    Operating system:
                                    <StatusChip status={isOSCompatible ? 'success' : 'danger'}
                                                content={browserInfo.os}/>
                                </div>
                            }>
                                {osReqsString}
                            </AccordionItem>
                            <AccordionItem key="4" aria-label="Other" title={
                                <div className="flex justify-between items-center">
                                    Other:
                                    <StatusChip status={aiReady ? 'success' : 'danger'}
                                                content={aiReady ? "Ready" : "Unavailable"}/>
                                </div>
                            } subtitle="View other requirements and instructions">
                                {<OtherReqs/>}
                            </AccordionItem>
                        </Accordion>
                        <Button className="m-2" variant="secondary" onClick={toggleSummaryView}>View instructions
                            summary</Button>
                    </>
                )}
            </PopoverContent>
        </Popover>
    );
};

export default BrowserInfoPopover;
