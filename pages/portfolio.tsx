import React, {useEffect, useState, Suspense, lazy} from 'react';
import {Header} from "@/components/page-header";
import RootLayout from "@/app/layout";
import {Card} from "@/components/ui/card";
/*import {Accordion, AccordionItem, AccordionTrigger, AccordionContent} from "@/components/ui/accordion";*/
import {Badge} from "@/components/ui/badge";
import {
    Spacer,
    Card as CardNextUI,
    CardBody,
    CardHeader as CardHeaderNextUI
} from "@nextui-org/react";
import {CopyEmailButton, SendEmailButton} from "@/components/email-buttons";
import {Divider} from "@nextui-org/divider";
import {FadeIn} from "@/components/fade-in";
import {LoadingSkeleton} from "@/components/loading-skeleton";
import {Toaster} from "@/components/ui/sonner"
import {toast} from "sonner";
import firebase from "firebase/analytics";
import {Skeleton} from "@/components/ui/skeleton";
const Accordion = React.lazy(() => import("@/components/ui/accordion").then(module => ({default: module.Accordion})));
const AccordionItem = React.lazy(() => import("@/components/ui/accordion").then(module => ({default: module.AccordionItem})));
const AccordionTrigger = React.lazy(() => import("@/components/ui/accordion").then(module => ({default: module.AccordionTrigger})));
const AccordionContent = React.lazy(() => import("@/components/ui/accordion").then(module => ({default: module.AccordionContent})));

/*// Encryption example
const encrypted = encrypt('Hello World!');

console.log('Encrypted:', encrypted);

const decrypted = decrypt(encrypted);
console.log('Decrypted:', decrypted);*/
const ErrorAlert = () => {
    toast.error("Could not load data from the database.", {
        action: {
            label: "Retry",
            onClick: () => window.location.reload(),
        },
    });
    return null;
};

const AccordionItemMemo = React.memo(AccordionItem);

const renderAccordionItems = (data: any, keys: string[]) => {
    if (!data) {
        //handle runtime errors better by returning a default value
        return null; // or return a loading indicator, or some other default value
    }
    return keys.map(key => {
        const {title, descr} = data[key];
        return (
            <AccordionItemMemo key={key} value={key}>
                <AccordionTrigger>{title}</AccordionTrigger>
                <AccordionContent>
                    <p>{descr}</p>
                </AccordionContent>
            </AccordionItemMemo>
        );
    });
};

const PortfolioPage = () => {
    const [portfolio, setPortfolio] = useState<Record<string, any> | null>({});
    const cardYSpacing = 8;
    const email = process.env.NEXT_PUBLIC_APP_EMAIL || 'email-not-set@e.com';

    ///////////////// ANALYTICS /////////////////

    useEffect(() => {
        // Use the fetch API to get data from your API route
        fetch('/api/internal/portfolio', {
            credentials: 'same-origin',
        })
            .then(response => response.json())
            .then(data => setPortfolio(data))
            .catch(error => console.error('Fetching portfolio data failed:', error));
    }, []);


    if (!portfolio || Object.keys(portfolio).length === 0) {
        return <LoadingSkeleton loadingText="Loading data from the database..."/>;
    }

    return (
        <FadeIn>
            <div className="p-6">
                <Card className="p-3">
                    <CardNextUI>
                        <CardHeaderNextUI>
                            <h2>Skills</h2>
                        </CardHeaderNextUI>
                        <Divider/>
                        <CardBody>
                            <section id="skills">
                                <Suspense fallback={<div className="space-y-3">
                                    <Skeleton className="h-[150px] rounded-xl"/>
                                    <Skeleton className="h-[150px] rounded-xl"/>
                                </div>}>
                                    <Accordion type="single" collapsible>
                                        {portfolio.skills ? renderAccordionItems(portfolio.skills, Object.keys(portfolio.skills)) :
                                        <ErrorAlert/>}
                                </Accordion>
                                </Suspense>
                            </section>
                        </CardBody>
                    </CardNextUI>

                    <Spacer y={cardYSpacing}/>
                    <CardNextUI>
                        <CardHeaderNextUI>
                            <h2>Experience</h2>
                        </CardHeaderNextUI>
                        <Divider/>
                        <CardBody>
                            <section id="experience">
                                <Suspense fallback={<div className="space-y-3">
                                    <Skeleton className="h-[150px] rounded-xl"/>
                                    <Skeleton className="h-[150px] rounded-xl"/>
                                </div>}>
                                <Accordion type="single" collapsible>
                                    {portfolio.experience ? renderAccordionItems(portfolio.experience, Object.keys(portfolio.experience)) : null}
                                </Accordion>
                                </Suspense>
                            </section>
                        </CardBody>
                    </CardNextUI>

                    <Spacer y={cardYSpacing}/>
                    <CardNextUI>
                        <CardHeaderNextUI>
                            <h2>Education</h2>
                        </CardHeaderNextUI>
                        <Divider/>
                        <CardBody>
                            <section id="education">
                                <Suspense fallback={<div className="space-y-3">
                                    <Skeleton className="h-[150px] rounded-xl"/>
                                    <Skeleton className="h-[150px] rounded-xl"/>
                                </div>}>
                                <Accordion type="single" collapsible>
                                    {portfolio.education ? renderAccordionItems(portfolio.education, Object.keys(portfolio.education)) : null}
                                </Accordion>
                                </Suspense>
                            </section>
                        </CardBody>
                    </CardNextUI>

                    <Spacer y={cardYSpacing}/>
                    <CardNextUI>
                        <CardHeaderNextUI>
                            <h2>Languages</h2>
                        </CardHeaderNextUI>
                        <Divider/>
                        <CardBody>
                            <Suspense fallback={<div className="space-y-3">
                                <Skeleton className="h-[150px] rounded-xl"/>
                                <Skeleton className="h-[150px] rounded-xl"/>
                            </div>}>
                            <section id="languages">
                                {
                                    portfolio.languages && (
                                        <div className="flex space-x-2">
                                            {Object.keys(portfolio.languages).map(key => (
                                                <Badge key={key} variant="default">{portfolio.languages[key]}</Badge>
                                            ))}
                                        </div>
                                    )
                                }
                            </section>
                            </Suspense>
                        </CardBody>
                    </CardNextUI>

                    <Spacer y={cardYSpacing}/>
                    <CardNextUI>
                        <CardHeaderNextUI>
                            <h2>Contact Me</h2>
                        </CardHeaderNextUI>
                        <Divider/>
                        <CardBody>
                            <section id="contact">
                                <Suspense fallback={<div className="space-y-3">
                                    <Skeleton className="h-[150px] rounded-xl"/>
                                    <Skeleton className="h-[150px] rounded-xl"/>
                                </div>}>
                                <CardNextUI className="w-fit p-2">
                                    <h3 className="p-2">Email</h3>
                                    <div className="flex ">
                                        <CopyEmailButton email={email}/>
                                        <Spacer x={2}/>
                                        <SendEmailButton email={email}/>
                                    </div>
                                </CardNextUI>
                                </Suspense>
                            </section>
                        </CardBody>
                    </CardNextUI>
                </Card>
            </div>
        </FadeIn>
    );
};

export default function Portfolio() {
    return (
        <RootLayout titleKey={"portfolio"}>
            <Header/>
            <div className="max-w-screen-lg mx-auto"> {/* Match the max width of the navbar */}
                <PortfolioPage/>
                <Toaster/>
            </div>
        </RootLayout>
    );
}