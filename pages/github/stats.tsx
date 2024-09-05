"use client"
import "@/app/layout";
import React, {useState, useEffect} from 'react';
import RootLayout from "@/app/layout";
import {FadeIn} from "@/components/fade-in";
import CustomBreadcrumb from "@/components/breadcrumbs";
import GitHubCalendar from 'react-github-calendar';
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Spacer} from "@nextui-org/react";
import {Separator} from "@/components/ui/separator";
import {useCurrentTheme} from "@/lib/hooks/use-current-theme";
import ChartCard from "@/components/chart-card";

const REPOS = [
    {value: 'bl4ckswordsman/CerberusTiles', label: 'CerberusTiles'},
    {value: 'bl4ckswordsman/abc_app', label: 'abc_app'},
    {value: 'bl4ckswordsman/DT096G', label: 'DT096G'},
    {value: 'bl4ckswordsman/bl4ckswordsman', label: 'bl4ckswordsman'},
    {value: 'bl4ckswordsman/ug-thesis-project', label: 'ug-thesis-project'},
    {value: 'bl4ckswordsman/edu-vault', label: 'edu-vault'},
];

const StatsPage = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<string | null>(null);
    const theme = useCurrentTheme();

    const fetchData = async (repo: string): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/github-hits?repo=${encodeURIComponent(repo)}`);
            let data;
            if (!response.ok) {
                const errorText = await response.text();
                let errorMessage;
                try {
                    const errorData = JSON.parse(errorText);
                    errorMessage = errorData.error || 'Failed to fetch data for ' + repo;
                } catch {
                    errorMessage = errorText || 'Failed to fetch data for ' + repo;
                }
                setError(errorMessage);
                return; // Exit the function early
            } else {
                data = await response.json();
            }
            setChartData(data);
            const timestamp = Date.now();
            localStorage.setItem(repo, JSON.stringify({
                data,
                timestamp
            }));
            setLastUpdated(new Date(timestamp).toLocaleString());
        } catch (err) {
            console.error("Error fetching data:", err);
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (value) {
            const storedData = localStorage.getItem(value);
            if (storedData) {
                const {data, timestamp} = JSON.parse(storedData);
                if (Date.now() - timestamp < 12 * 60 * 60 * 1000) {
                    setChartData(data);
                    setLastUpdated(new Date(timestamp).toLocaleString());
                    return;
                }
            }
            fetchData(value).catch(console.error);
        }
    }, [value]);

    const handleRefresh = () => {
        if (value) {
            fetchData(value).catch(console.error);
        }
    };

    return (
        <div className="m-4">
            <ChartCard
                REPOS={REPOS}
                value={value}
                setValue={setValue}
                chartData={chartData}
                loading={loading}
                error={error}
                open={open}
                setOpen={setOpen}
                handleRefresh={handleRefresh}
                lastUpdated={lastUpdated}
            />
            <Spacer y={2}/>
            <Card>
                <CardHeader className="text-lg font-semibold">GitHub Activity</CardHeader>
                <Separator/>
                <CardContent className="p-3">
                    <GitHubCalendar weekStart={1} username="bl4ckswordsman" colorScheme={theme}/>
                </CardContent>
            </Card>
        </div>
    );
};

export default function Stats() {
    return (
        <RootLayout titleKey={"stats"}>
            <FadeIn>
                <CustomBreadcrumb/>
                <StatsPage/>
            </FadeIn>
        </RootLayout>
    );
}
