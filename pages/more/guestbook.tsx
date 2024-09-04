/**
 * v0 by Vercel.
 * @see https://v0.dev/t/UVAY0uS4jlV
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import RootLayout from "@/app/layout";
import React from "react";
import GuestbookEntries from "@/components/guestbook-entries";
import GuestbookForm from "@/components/guestbook-form";
import {useGuestbookEntries} from "@/lib/hooks/use-guestbook-entries";

const Guestbook = () => {
    const [entries, fetchEntries] = useGuestbookEntries();

    const handleSuccess = async () => {
        await fetchEntries();
    };

    return (
        <div className="m-4">
            <div className="py-12 md:py-16">
                <div className="space-y-6">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Guestbook</h1>
                        <p className="mt-3 text-lg text-muted-foreground">Leave a message and share your thoughts with
                            us.</p>
                    </div>
                    <GuestbookForm onSuccess={handleSuccess}/>
                    <GuestbookEntries entries={entries}/>
                </div>
            </div>
        </div>
    );
};

export default function GuestbookPage() {
    return (
        <RootLayout titleKey={"guestbook"}>
            <Guestbook/>
        </RootLayout>
    );
}