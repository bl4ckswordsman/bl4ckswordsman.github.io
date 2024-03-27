import {metadata} from "@/app/metadata";
import {Inter as FontSans} from "next/font/google"
import "@/app/globals.css";
import {ThemeProvider} from "@/components/theme-provider"
import {cn} from "@/lib/utils";
import React from "react";
import {Helmet} from "react-helmet";

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
            <div className={cn('root-layout')}>
                {props.children}
            </div>
        </ThemeProvider>
    )
}