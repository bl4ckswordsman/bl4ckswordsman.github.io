import {metadata} from "@/app/metadata";
import {Inter as FontSans} from "next/font/google"
import "@/app/globals.css";
import {ThemeProvider} from "@/components/theme-provider"
import {cn} from "@/lib/utils";
import Head from 'next/head';
import React from "react";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({children}: RootLayoutProps) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <Head>
                <title>{String(metadata.title) || 'Default Title'}</title>
                <style>{`body { font-family: ${fontSans}; }`}</style>
            </Head>
            <div className={cn('root-layout')}>
                {children}
            </div>
        </ThemeProvider>
    )
}