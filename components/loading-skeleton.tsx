import React, {useState, useEffect} from 'react';
import {Card, CardHeader} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";
import {CircularProgress} from "@nextui-org/react";
import {ExclamationTriangleIcon} from "@radix-ui/react-icons";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";

export const LoadingSkeleton = ({loadingText}: { loadingText: string }) => {
    const [status, setStatus] = useState('loading');

    useEffect(() => {
        const timer = setTimeout(() => {
            setStatus('timeout');
        }, 6000); // 6000ms = 6 seconds

        return () => clearTimeout(timer); // cleanup on unmount
    }, []);

    if (status === 'loading') {
        return (
            <div className="p-6">
                <Card className="p-3">
                    <CardHeader>
                        <div className="flex items-center">
                            <CircularProgress size="md" aria-label="Loading..."/>
                            <p className="ml-3">{loadingText}</p>
                        </div>
                    </CardHeader>
                    <div className="space-y-3">
                        <Skeleton className="h-[150px] rounded-xl"/>
                        <Skeleton className="h-[150px] rounded-xl"/>
                    </div>
                </Card>
            </div>
        );
    }

    if (status === 'timeout') {
        return (
            <div className="p-6">
                <Card className="p-3">
                    <Alert variant="destructive">
                        <ExclamationTriangleIcon className="h-4 w-4"/>
                        <AlertTitle>Timeout Error</AlertTitle>
                        <AlertDescription>
                            Loading took too long. Please try again later.
                        </AlertDescription>
                    </Alert>
                </Card>
            </div>
        );
    }

    return null;
};