import React, {useEffect, useState} from 'react';
import RootLayout from "@/app/layout";
import {Card} from "@/components/ui/card";
import {Spacer} from "@nextui-org/react";
import {FadeIn} from "@/components/fade-in";
import {LoadingSkeleton} from "@/components/loading-skeleton";
import {Toaster} from "@/components/ui/sonner"
import {PortfolioCard, AccordionSection, LanguagesSection, ContactSection} from "@/components/portfolio-comp";
import CustomBreadcrumb from "@/components/breadcrumbs";
/*import firebase from "firebase/analytics";*/

const PortfolioPage = () => {
    const [portfolio, setPortfolio] = useState<Record<string, any> | null>({});
    const cardYSpacing = 8;
    const email = process.env.NEXT_PUBLIC_APP_EMAIL || 'email-not-set@e.com';

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
            <div className="m-4">
                <Card className="p-3">
                    <PortfolioCard title="Skills" data={portfolio.skills} renderContent={data => (
                        <AccordionSection data={data}/>
                    )}/>
                    <Spacer y={cardYSpacing}/>
                    <PortfolioCard title="Experience" data={portfolio.experience} renderContent={data => (
                        <AccordionSection data={data}/>
                    )}/>
                    <Spacer y={cardYSpacing}/>
                    <PortfolioCard title="Education" data={portfolio.education} renderContent={data => (
                        <AccordionSection data={data}/>
                    )}/>
                    <Spacer y={cardYSpacing}/>
                    <PortfolioCard title="Languages" data={portfolio.languages} renderContent={data => (
                        <LanguagesSection languages={data}/>
                    )}/>
                    <Spacer y={cardYSpacing}/>
                    <PortfolioCard title="Contact Me" data={email} renderContent={data => (
                        <ContactSection email={data}/>
                    )}/>
                </Card>
            </div>
        </FadeIn>
    );
};

export default function Portfolio() {
    return (
        <RootLayout titleKey={"portfolio"}>
            <CustomBreadcrumb/>
            <PortfolioPage/>
            <Toaster/>
        </RootLayout>
    );
}