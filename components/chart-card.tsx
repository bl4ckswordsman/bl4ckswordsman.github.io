import React from 'react';
import {Card, CardContent, CardHeader, CardFooter} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {Check, ChevronsUpDown, RefreshCw} from "lucide-react";
import {BarChart, Bar, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, YAxis} from 'recharts';
import {Alert, AlertDescription} from "@/components/ui/alert";
import {LoadingSkeleton} from "@/components/loading-skeleton";

interface Repo {
    value: string;
    label: string;
}

interface ChartCardProps {
    REPOS: Repo[];
    value: string;
    setValue: (value: string) => void;
    chartData: any[];
    loading: boolean;
    error: string | null;
    open: boolean;
    setOpen: (open: boolean) => void;
    handleRefresh: () => void;
    lastUpdated: string | null;
}

const ChartCard: React.FC<ChartCardProps> = ({
                                                 REPOS,
                                                 value,
                                                 setValue,
                                                 chartData,
                                                 loading,
                                                 error,
                                                 open,
                                                 setOpen,
                                                 handleRefresh,
                                                 lastUpdated
                                             }) => {
    const totalHits = React.useMemo(() =>
            chartData.reduce((acc, curr) => acc + curr.hits, 0),
        [chartData]);

    return (
        <Card>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <h2 className="text-lg font-semibold">GitHub Daily Hits</h2>
                    <p className="text-sm text-muted-foreground">
                        Showing total visitors for the selected repository
                    </p>
                </div>
                <div className="flex items-center space-x-2 px-6 py-4 sm:border-l sm:px-8 sm:py-6">
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-[200px] justify-between"
                            >
                                {value
                                    ? REPOS.find((repo) => repo.value === value)?.label
                                    : "Select repository..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput placeholder="Search repository..."/>
                                <CommandList>
                                    <CommandEmpty>No repository found.</CommandEmpty>
                                    <CommandGroup>
                                        {REPOS.map((repo) => (
                                            <CommandItem
                                                key={repo.value}
                                                value={repo.value}
                                                onSelect={(currentValue) => {
                                                    setValue(currentValue === value ? "" : currentValue);
                                                    setOpen(false);
                                                }}
                                            >
                                                <Check
                                                    className={`mr-2 h-4 w-4 ${
                                                        value === repo.value ? "opacity-100" : "opacity-0"
                                                    }`}
                                                />
                                                {repo.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <Button onClick={handleRefresh} disabled={!value || loading}>
                        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`}/>
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                {error && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                minTickGap={32}
                                tickFormatter={(value) => {
                                    const date = new Date(value);
                                    return date.toLocaleDateString(undefined, {
                                        month: "short",
                                        day: "numeric",
                                    });
                                }}
                            />
                            <YAxis
                                tickLine={true}
                                axisLine={true}
                                tickMargin={4}
                            />
                            <Tooltip
                                content={({active, payload, label}) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="bg-background p-2 border rounded shadow-lg">
                                                <p className="text-sm font-semibold">{new Date(label).toLocaleDateString(undefined, {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}</p>
                                                <p className="text-sm">Hits: {payload[0].value}</p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Bar dataKey="hits" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]}/>
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex items-center justify-center h-[300px]">
                        {loading ?
                            <div className="w-full">
                                <LoadingSkeleton loadingText={"Loading data..."} noCard={true} fitToParent={true}/>
                            </div>
                            : <p className="text-gray-500">Select a repository to view data</p>}
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                    {lastUpdated && (
                        <span>
                            Last updated: {lastUpdated}<br/>
                            Data is cached for 12 hours. Click the refresh button to update.
                        </span>
                    )}
                </p>
                <p className="text-sm text-muted-foreground">
                    Total hits: {totalHits.toLocaleString()}
                </p>
            </CardFooter>
        </Card>
    );
};

export default ChartCard;