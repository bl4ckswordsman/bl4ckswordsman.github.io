import {useEffect, useState} from "react";
import {getGuestbookEntries} from "@/lib/get-guestbook-entries";

interface GuestbookEntry {
    id: string;
    name: string;
    email: string;
    message: string;
    timestamp: number;
}

export const useGuestbookEntries = () => {
    const [entries, setEntries] = useState<GuestbookEntry[]>([]);

    const fetchEntries = async () => {
        const fetchedEntries = await getGuestbookEntries();
        setEntries(fetchedEntries);
    };

    useEffect(() => {
        fetchEntries().catch(console.error);
    }, []);

    return [entries, fetchEntries] as const;
};