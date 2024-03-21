import React from 'react';
import {Header} from "@/components/page-header";
import RootLayout from "@/app/layout";
import {Card} from "@/components/ui/card";
import {Accordion, AccordionItem, AccordionTrigger, AccordionContent} from "@/components/ui/accordion";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Tooltip, TooltipProvider, TooltipTrigger, TooltipContent} from "@/components/ui/tooltip";
import copy from 'copy-to-clipboard';
import {Separator} from "@/components/ui/separator";

const PortfolioPage = () => {
    const email = process.env.NEXT_PUBLIC_APP_EMAIL || 'email-not-set@e.com';

    return (
        <div className="p-6">
            <Card className="p-3">
                <section id="skills">
                    <h2>Skills</h2>
                    <Accordion type="single">
                        <AccordionItem value="computer-skills">
                            <AccordionTrigger>Computer Skills</AccordionTrigger>
                            <AccordionContent>
                                <p>Programming (C++, C, Python, Flutter, Java, MATLAB, HTML, JavaScript, PHP, Qt, VHDL),
                                    Linux, problem solving, image and text processing programs, LaTeX etc.</p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </section>

                <Separator className="my-4"/>
                <section id="experience">
                    <h2>Experience</h2>
                    <Accordion type="single">
                        <AccordionItem value="nordanstigskustens">
                            <AccordionTrigger>Nordanstigskustens församling / Garden and churchyard
                                worker</AccordionTrigger>
                            <AccordionContent>
                                <p>Summer 2021,2022,2023 - Harmånger, Sweden</p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="cdrsp-politecnico">
                            <AccordionTrigger>CDRSP Politécnico de Leiria / Internship in design and product development
                                (APL)</AccordionTrigger>
                            <AccordionContent>
                                <p>November 2019 – December 2019, Leiria, Portugal</p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </section>

                <Separator className="my-4"/>
                <section id="education">
                    <h2>Education</h2>
                    <Accordion type="single">
                        <AccordionItem value="mid-sweden-university">
                            <AccordionTrigger>Mid Sweden University / Civil Engineer in Computer
                                Science</AccordionTrigger>
                            <AccordionContent>
                                <p>August 2021 - Ongoing, Sundsvall, Sweden</p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="bromangymnasiet">
                            <AccordionTrigger>Bromangymnasiet / Technology Programme</AccordionTrigger>
                            <AccordionContent>
                                <p>August 2016 - June 2019, Hudiksvall, Sweden</p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="elementary-school">
                            <AccordionTrigger>Elementary School</AccordionTrigger>
                            <AccordionContent>
                                <p>September 2005 - June 2014, Albania</p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </section>

                <Separator className="my-4"/>
                <section id="languages">
                    <h2>Languages</h2>
                    <Badge color="primary">Swedish - Fluent</Badge>
                    <Badge color="primary">English - Fluent</Badge>
                    <Badge color="primary">Italian - Fluent</Badge>
                    <Badge color="primary">Spanish - Beginner</Badge>
                    <Badge color="primary">Albanian - Native</Badge>
                </section>

                <Separator className="my-4"/>
                <section id="contact">
                    <h2>Contact Me</h2>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant={"secondary"}
                                    onClick={() => copy(email)}>
                                    Copy Email
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Click to copy email to clipboard</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                </section>
            </Card>
        </div>
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