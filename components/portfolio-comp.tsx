import React, {ReactElement} from 'react';
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
import {toast} from "sonner";

const ErrorAlert = ({message}: { message?: string }) => {
    toast.error(message, {
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
        return null; // TODO: or return a loading indicator, or some other default value
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

export const PortfolioCard = ({title, data, renderContent}: {
    title: string,
    data: any,
    renderContent: (data: any) => ReactElement
}) => (
    <CardNextUI>
        <CardHeaderNextUI>
            <h2>{title}</h2>
        </CardHeaderNextUI>
        <Divider/>
        <CardBody>
            {data ? renderContent(data) : <ErrorAlert message={`Failed to load data for: ${title}`}/>}
        </CardBody>
    </CardNextUI>
);

export const AccordionSection = ({data}: { data: any }) => (
    <section>
        <Accordion type="single" collapsible>
            {renderAccordionItems(data, Object.keys(data))}
        </Accordion>
    </section>
);

export const LanguagesSection = ({languages}: { languages: any }) => (
    <section id="languages">
        {languages && (
            <div className="flex flex-wrap space-x-1 space-y-1 items-center">
                {Object.keys(languages).map(key => (
                    <div key={key}>
                        <Badge className="flex-col">
                            <Badge>{(languages[key] as { language: string, proficiency: string }).language}</Badge>
                            <Badge variant="secondary">{(languages[key] as {
                                language: string,
                                proficiency: string
                            }).proficiency}</Badge>
                        </Badge>
                    </div>
                ))}
            </div>
        )}
    </section>
);

export const ContactSection = ({email}: { email: string }) => (
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
);

export const SkillsSection = ({skills}: { skills: any }) => {
    if (!skills || !skills.computerSkills || !skills.computerSkills.categories) return null;

    // Sort the categories based on the 'order' property
    const sortedCategories = Object.entries(skills.computerSkills.categories)
        .sort(([, a], [, b]) => (a as any).order - (b as any).order)
        .map(([key]) => key);

    return (
        <section id="skills">
            <h2 className="text-xl font-bold mb-4">{skills.computerSkills.title}</h2>
            {sortedCategories.map(categoryKey => {
                const category = skills.computerSkills.categories[categoryKey];
                return (
                    <div key={categoryKey} className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
                        <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill: string) => (
                                <Badge key={skill}>{skill}</Badge>
                            ))}
                        </div>
                    </div>
                );
            })}
        </section>
    );
};