import React, {useEffect, useState} from 'react';
import {Header} from "@/components/page-header";
import RootLayout from "@/app/layout";
import {Card} from "@/components/ui/card";
import {Accordion, AccordionItem, AccordionTrigger, AccordionContent} from "@/components/ui/accordion";
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

/*// Encryption example
const encrypted = encrypt('Hello World!');

console.log('Encrypted:', encrypted);

const decrypted = decrypt(encrypted);
console.log('Decrypted:', decrypted);*/

const renderAccordionItems = (data: any, keys: string[]) => {
    return keys.map(key => {
        const {title, descr} = data[key];
        return (
            <AccordionItem key={key} value={key}>
                <AccordionTrigger>{title}</AccordionTrigger>
                <AccordionContent>
                    <p>{descr}</p>
                </AccordionContent>
            </AccordionItem>
        );
    });
};

const PortfolioPage = () => {
    const [portfolio, setPortfolio] = useState<Record<string, any> | null>(null);
    const cardYSpacing = 8;
    const email = process.env.NEXT_PUBLIC_APP_EMAIL || 'email-not-set@e.com';

    useEffect(() => {
        // Use the fetch API to get data from your API route
        fetch('/api/portfolio')
            .then(response => response.json())
            .then(data => setPortfolio(data))
            .catch(error => console.log('Fetching portfolio data failed:', error));
    }, []);


    if (!portfolio) {
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
                                <Accordion type="single" collapsible>
                                    {renderAccordionItems(portfolio.skills, Object.keys(portfolio.skills))}
                                </Accordion>
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
                                <Accordion type="single" collapsible>
                                    {renderAccordionItems(portfolio.experience, Object.keys(portfolio.experience))}
                                </Accordion>
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
                                <Accordion type="single" collapsible>
                                    {renderAccordionItems(portfolio.education, Object.keys(portfolio.education))}
                                </Accordion>
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
                            <section id="languages">
                                {
                                    Object.entries(portfolio.languages).map(([key, value]) => (
                                        <Badge key={key} color="primary">{String(value)}</Badge>
                                    ))
                                }
                            </section>
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
                                <CardNextUI className="w-fit p-2">
                                    <h3 className="p-2">Email</h3>
                                    <div className="flex ">
                                        <CopyEmailButton email={email}/>
                                        <Spacer x={2}/>
                                        <SendEmailButton email={email}/>
                                    </div>
                                </CardNextUI>
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
        <RootLayout>
            <Header/>
            <div className="max-w-screen-lg mx-auto"> {/* Match the max width of the navbar */}
                <PortfolioPage/>
            </div>
        </RootLayout>
    );
}