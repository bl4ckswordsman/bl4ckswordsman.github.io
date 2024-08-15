import {metadata, domainBase, getFullTitle, getDescription, firstBase} from "@/app/metadata";
import {Inter as FontSans} from "next/font/google"
import "@/app/styles/globals.css";
import {ThemeProvider} from "@/components/theme-provider"
import {cn} from "@/lib/utils";
import React from "react";
import Head from "next/head";
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
            <Head>
                <title>{getFullTitle(props.titleKey)}</title>
                <meta name="description" content={metadata.generalDescription || 'Welcome to my homepage'}/>
                <meta name="og:title" content={getFullTitle(props.titleKey)}/>
                <meta name="og:description" content={getDescription(props.titleKey)}/>
                <meta name="og:image" content={`${domainBase}/api/og?titleKey=${props.titleKey}`}/>
                {/* Allow the user to add the site to their home screen on mobile */}
                <meta name="application-name" content={firstBase}/>
                <meta name="mobile-web-app-capable" content="yes"/>
                <meta name="apple-mobile-web-app-capable" content="yes"/>
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
                <meta name="format-detection" content="telephone=no"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32-circle.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16-circle.png"/>
                <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-180-circle.png"/>
                <meta name="theme-color" content="#143999"/>
                {/*                <link rel="icon" href="/favicon.ico"/>*/}
                {/*<link rel="manifest" href="/manifest.json" crossOrigin="use-credentials"/>*/}

                <style>{`body { font-family: ${fontSans}; }`}</style>
            </Head>
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