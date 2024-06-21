import {metadata} from "@/app/metadata";
import {Inter as FontSans} from "next/font/google"
import "@/app/globals.css";
import {ThemeProvider} from "@/components/theme-provider"
import {cn} from "@/lib/utils";
import React from "react";
import {Helmet} from "react-helmet";
import {SpeedInsights} from "@vercel/speed-insights/next";
import {Analytics} from "@vercel/analytics/react";
import {NaviMenu} from "@/components/navigation-menu-header";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})

interface RootLayoutProps {
    children: React.ReactNode;
    titleKey: keyof typeof metadata.titles;
}

export default function RootLayout(props: RootLayoutProps) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
        >
            <Helmet>
                <title>{metadata.titles[props.titleKey]}</title>
                <meta name="description" content={metadata.description || 'Welcome to my homepage'}/>
                <style>{`body { font-family: ${fontSans}; }`}</style>
            </Helmet>
            <NaviMenu/>
            <div className={cn('root-layout')}>
                <div className="max-w-screen-lg mx-auto"> {/* Match the max width of the navbar */}
                    {props.children}
                </div>
            </div>
            <SpeedInsights/>
            <Analytics/>
        </ThemeProvider>
    )
}