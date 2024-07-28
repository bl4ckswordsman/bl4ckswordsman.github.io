import {Card, CardContent} from "@/components/ui/card";
import React from "react";

interface Entry {
    id: string;
    name: string;
    email: string;
    message: string;
    timestamp: number;
}

interface GuestbookEntriesProps {
    entries: Entry[];
}

const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}`;
};

const GuestbookEntries: React.FC<GuestbookEntriesProps> = ({entries}) => {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Messages</h2>
            <div className="space-y-4">
                {entries.map((entry) => (
                    <Card key={entry.id} className="card-shadow">
                        <CardContent className="px-6 py-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-medium">{entry.name}</h3>
                                    {entry.email && <p className="text-muted-foreground">{entry.email}</p>}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {formatDate(entry.timestamp)}
                                </p>
                            </div>
                            <p className="mt-4">{entry.message}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default GuestbookEntries;