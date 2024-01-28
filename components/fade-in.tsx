import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

export const FadeIn = ({ children }) => {
    const controls = useAnimation();

    useEffect(() => {
        controls.start({
            opacity: 1,
            transition: {duration: 1}
        }).then(r =>{});
    }, [controls]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={controls}
        >
            {children}
        </motion.div>
    );
};