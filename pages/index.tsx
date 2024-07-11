"use client"
import {Button} from "@/components/ui/button";
import ParticlesBackground from "@/components/particles-background";
import {FadeIn} from "@/components/fade-in";
import RootLayout from "@/app/layout";
import {TextGenerateEffect} from "@/components/ui/text-generate-effect";
import {Spacer} from "@nextui-org/react";
import {BorderBeam} from "@/components/magicui/border-beam";

const words =
    "Welcome to my homepage. \nCheck out my GitHub repositories.";

const HomePage = () => {
    return (
        <div>
            <div className="particles-container">
                <ParticlesBackground/>
            </div>
            <div className="content-container flex items-center justify-center">
                <div className="m-4">
                    <TextGenerateEffect fontSize="text-5xl" words={words}/>
                </div>
                <Spacer/><Spacer/>
                <FadeIn>
                    <div className="overflow-hidden relative p-0.5">
                        <a href="https://github.com/bl4ckswordsman?tab=repositories" target="_blank" role="button">
                            <Button>
                                View Repositories
                                <BorderBeam size={70} borderWidth={3} duration={5}/>
                            </Button>
                        </a>
                    </div>
                </FadeIn>
            </div>
        </div>
    );
}

export default function Index() {
    return (
        <RootLayout titleKey={"home"}>
            <HomePage/>
        </RootLayout>
    );
}