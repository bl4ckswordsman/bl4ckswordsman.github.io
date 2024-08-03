"use client"
import "@/app/layout";
import React, {useState} from 'react';
import RootLayout from "@/app/layout";
import {FadeIn} from "@/components/fade-in";
import {Button} from "@/components/ui/button";
import {
    ResizableHandle, ResizablePanel, ResizablePanelGroup,
} from "@/components/ui/resizable"
import CustomBreadcrumb from "@/components/breadcrumbs";

const repos = [
    'bl4ckswordsman/CerberusTiles',
    'bl4ckswordsman/abc_app',
    'bl4ckswordsman/DT096G',
    'bl4ckswordsman/bl4ckswordsman',
    'bl4ckswordsman/ug-thesis-project',
    // More repository links that have the daily-hits badge to be added here
];

const HitsPage = () => {
    const [repo, setRepo] = useState('');

    const handleShow = (repo: React.SetStateAction<string>) => {
        setRepo(repo);
    };

    const dailyHitsBaseUrl = 'https://hits.seeyoufarm.com/api/count/graph/dailyhits.svg?url=https://github.com/';

    return (
        <div className="m-4">
            <ResizablePanelGroup
                direction="horizontal"
                className="rounded-lg border"
            >
                <ResizablePanel defaultSize={35} className="p-3">
                    <div>
                        {repos.map((repoPath, index) => {
                            const repoName = repoPath.split('/')[1]; // Split the string at '/' and take the second part
                            return (
                                <Button
                                    key={index}
                                    variant={repoPath === repo ? "secondary" : "outline"} // Change the variant based on whether the repo is selected
                                    className="m-2 w-48"
                                    onClick={() => handleShow(repoPath)}
                                >
                                    {repoName} {/* Use the repository name as the button label */}
                                </Button>
                            );
                        })}
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle/>
                <ResizablePanel defaultSize={65}>
                    {repo && (
                        <div className="w-full p-3 overflow-auto">
                            <div style={{transform: 'scale(0.7)', transformOrigin: '0 0'}}>
                                <iframe id="contentiframe"
                                        className="w-[660px] h-[310px] border-0"
                                        src={`${dailyHitsBaseUrl}${repo}`}></iframe>
                            </div>
                        </div>
                    )}
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>

    );
};

export default function Hits() {
    return (
        <RootLayout titleKey={"hits"}>
            <FadeIn>
                <CustomBreadcrumb/>
                <HitsPage/>
            </FadeIn>
        </RootLayout>
    );
}