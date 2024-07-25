import type {NextApiRequest, NextApiResponse} from 'next';
import {getDatabase, ref, push} from "firebase/database";
import '@/app/config/firebase';
import {sendTelegramMessage} from '@/pages/api/internal/send-telegram-message';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({message: 'Method not allowed'});
    }

    const {name, email, message, isPublic, showNameEmail, browserInfo} = req.body;
    const ipAddress = (Array.isArray(req.headers['x-forwarded-for']) ? req.headers['x-forwarded-for'][0] : req.headers['x-forwarded-for']) || req.socket.remoteAddress || 'Unknown IP';

    try {
        // Send to Telegram
        const telegramSuccess = await sendTelegramMessage(req);

        if (telegramSuccess) {
            // Push to Firebase
            const db = getDatabase();
            const guestbookRef = ref(db, 'guestbook');
            const entry = {
                name,
                email,
                message,
                isPublic,
                showNameEmail,
                browserInfo,
                ipAddress,
                timestamp: Date.now(),
            };
            await push(guestbookRef, entry);
            res.status(200).json({message: 'Message sent successfully and guestbook entry added'});
        } else {
            res.status(500).json({message: 'Failed to send message to Telegram'});
        }
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({message: 'An error occurred'});
    }
}