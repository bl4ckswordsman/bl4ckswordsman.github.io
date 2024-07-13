"use client"
import {Button} from "@/components/ui/button";
import ParticlesBackground from "@/components/particles-background";
import RootLayout from "@/app/layout";
import {Spacer} from "@nextui-org/react";
import {BorderBeam} from "@/components/magicui/border-beam";
/*import TypingAnimation from "@/components/magicui/typing-animation";*/
import BlurIn from "@/components/magicui/blur-in";
import {TextGenerateEffect} from "@/components/ui/text-generate-effect";

const words =
    "Welcome to my homepage.";
const words2 =
    "Check out my GitHub repositories.";

const HomePage = () => {
    return (
        <div>
            <div className="particles-container">
                <ParticlesBackground/>
            </div>
            <div className="content-container flex items-center justify-center">
                <div className="m-4">
                    {/*<TypingAnimation text={words + "\n" + words2} duration={70}/>*/}
                    <TextGenerateEffect fontSize="text-5xl" words={words + "\n" + words2}/>
                </div>
                <Spacer/><Spacer/>
                <BlurIn duration={2}>
                    <div className="overflow-hidden relative p-0.5">
                        <a href="https://github.com/bl4ckswordsman?tab=repositories" target="_blank" role="button">
                            <Button>
                                View Repositories
                                <BorderBeam size={70} borderWidth={3} duration={5}/>
                            </Button>
                        </a>
                    </div>
                </BlurIn>
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