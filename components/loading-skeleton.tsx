import {Card, CardHeader} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";
import {CircularProgress} from "@nextui-org/react";

export const LoadingSkeleton = ({loadingText}: { loadingText: string }) => (
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