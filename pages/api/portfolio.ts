import {initializeApp, getApps} from "firebase/app";
import {getDatabase, ref, get} from "firebase/database";
import type {NextApiRequest, NextApiResponse} from 'next';

// Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
if (!getApps().length) {
    initializeApp(firebaseConfig);
}

const handlePortfolioRequest = async (_req: NextApiRequest, res: NextApiResponse) => {
    const db = getDatabase(); // variable starting with underscore is not used
    const portfolioRef = ref(db, '/portfolio');

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
