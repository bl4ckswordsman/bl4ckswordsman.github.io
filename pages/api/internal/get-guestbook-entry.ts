import type {NextApiRequest, NextApiResponse} from 'next';
import {getDatabase, ref, get, query, orderByChild} from "firebase/database";
import '@/app/config/firebase';

function maskString(str: string): string {
    if (str.length <= 3) return str.replace(/./g, '*');
    return str.slice(0, 3) + str.slice(3).replace(/./g, '*');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({message: 'Method not allowed'});
    }

    const db = getDatabase();
    const guestbookRef = ref(db, '/guestbook');

    try {
        const snapshot = await get(query(guestbookRef, orderByChild('timestamp')));
        const entries: Array<{
            id: string | null,
            name: string,
            email: string | null,
            message: string,
            timestamp: number
        }> = [];
        snapshot.forEach((childSnapshot) => {
            const entry = childSnapshot.val();
            if (entry.isPublic) {
                entries.push({
                    id: childSnapshot.key,
                    name: entry.showNameEmail ? entry.name : maskString(entry.name),
                    email: entry.showNameEmail ? entry.email : entry.email ? maskString(entry.email) : null,
                    message: entry.message,
                    timestamp: entry.timestamp,
                });
            }
        });
        res.status(200).json(entries.reverse());
    } catch (error) {
        console.error('Error fetching guestbook entries:', error);
        res.status(500).json({message: 'An error occurred', error: (error as Error).message});
    }
}