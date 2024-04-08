import {getDatabase, ref, get} from "firebase/database";
import type {NextApiRequest, NextApiResponse} from 'next';
import '@/app/config/firebase';

const handlePortfolioRequest = async (req: NextApiRequest, res: NextApiResponse) => {
    const db = getDatabase(); // variable starting with underscore is not used
    const portfolioRef = ref(db, '/portfolio');

    const origin = req.headers.origin || req.headers.referer;
    if (!origin/* || new URL(origin).hostname !== req.headers.host*/) {
        console.error('Request not from same origin');
        return res.status(403).json({error: 'Forbidden'});
    }

    try {
        const snapshot = await get(portfolioRef);
        if (snapshot.exists()) {
            res.status(200).json(snapshot.val());
        } else {
            res.status(404).json({error: "Data not found"});
        }
    } catch (error) {
        console.error('Firebase read failed:', error);
        res.status(500).json({error: 'Internal server error'});
    }
};

export default handlePortfolioRequest;
