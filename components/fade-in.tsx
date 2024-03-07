//"use client";
import {motion, useAnimation} from 'framer-motion';
import {ReactNode, useEffect} from 'react';

interface FadeInProps {
    children: ReactNode;
}

export const FadeIn = ({children}: FadeInProps) => {
    const controls = useAnimation();

    useEffect(() => {
        controls.start({
            opacity: 1,
            transition: {duration: 1}
        }).then(r => {
        });
    }, [controls]);

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={controls}
        >
            {children}
        </motion.div>
    );
};