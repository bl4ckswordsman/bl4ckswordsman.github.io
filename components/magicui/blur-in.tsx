/*https://magicui.design/docs/components/blur-in*/

"use client";

import {motion} from "framer-motion";

import {cn} from "@/lib/utils";
import {ReactNode} from "react";

interface BlurInProps {
    children: ReactNode;
    className?: string;
    variant?: {
        hidden: { filter: string; opacity: number };
        visible: { filter: string; opacity: number };
    };
    duration?: number;
}

const BlurIn = ({children, className, variant, duration = 1}: BlurInProps) => {
    const defaultVariants = {
        hidden: {filter: "blur(10px)", opacity: 0},
        visible: {filter: "blur(0px)", opacity: 1},
    };
    const combinedVariants = variant || defaultVariants;

    return (
        <motion.div // Changed from motion.h1 to motion.div to be more generic
            initial="hidden"
            animate="visible"
            transition={{duration}}
            variants={combinedVariants}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
};

export default BlurIn;
