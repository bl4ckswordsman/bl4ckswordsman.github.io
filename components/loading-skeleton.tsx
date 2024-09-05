import React, { useState, useEffect } from 'react';
import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CircularProgress } from "@nextui-org/react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface LoadingSkeletonProps {
    loadingText: string;
    noCard?: boolean;
    fitToParent?: boolean;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ loadingText, noCard = false, fitToParent = false }) => {
    const [status, setStatus] = useState('loading');

    useEffect(() => {
        const timer = setTimeout(() => {
            setStatus('timeout');
        }, 6000); // 6000ms = 6 seconds

        return () => clearTimeout(timer); // cleanup on unmount
    }, []);

    const content = (
        <>
            <div className="flex items-center mb-4">
                <CircularProgress size="sm" aria-label="Loading..." />
                <p className="ml-3">{loadingText}</p>
            </div>
            <div className={`space-y-3 ${fitToParent ? 'flex-1' : ''}`}>
                <Skeleton className={`h-4 w-full ${fitToParent ? 'flex-1' : ''}`} />
                <Skeleton className={`h-4 w-3/4 ${fitToParent ? 'flex-1' : ''}`} />
                <Skeleton className={`h-4 w-1/2 ${fitToParent ? 'flex-1' : ''}`} />
            </div>
        </>
    );

    if (status === 'loading') {
        return (
            <div className={`p-6 ${fitToParent ? 'flex flex-col h-full' : ''}`}>
                {noCard ? content : (
                    <Card className={`p-3 ${fitToParent ? 'h-full' : ''}`}>
                        <CardHeader>{content}</CardHeader>
                    </Card>
                )}
            </div>
        );
    }

    if (status === 'timeout') {
        return (
            <div className={`p-6 ${fitToParent ? 'flex flex-col h-full' : ''}`}>
                {noCard ? (
                    <Alert variant="destructive">
                        <ExclamationTriangleIcon className="h-4 w-4" />
                        <AlertTitle>Timeout Error</AlertTitle>
                        <AlertDescription>
                            Loading took too long. Please try again later.
                        </AlertDescription>
                    </Alert>
                ) : (
                    <Card className={`p-3 ${fitToParent ? 'h-full' : ''}`}>
                        <Alert variant="destructive">
                            <ExclamationTriangleIcon className="h-4 w-4" />
                            <AlertTitle>Timeout Error</AlertTitle>
                            <AlertDescription>
                                Loading took too long. Please try again later.
                            </AlertDescription>
                        </Alert>
                    </Card>
                )}
            </div>
        );
    }

    return null;
};