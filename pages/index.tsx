"use client"
import {Button} from "@/components/ui/button";
import {Header} from "@/components/page-header";
import ParticlesBackground from "@/components/particles-background";
import {FadeIn} from "@/components/fade-in";
import RootLayout from "@/app/layout";

const HomePage = () => {
    return (
        <div>
            <div className="particles-container">
                <ParticlesBackground/>
            </div>
            <div className="content-container flex items-center justify-center">
                <div className="wrap">
                    {Array.from({length: 10}, (_, i) => (
                        <div key={i} className="c"></div>
                    ))}
                </div>
                <FadeIn>
                    <h1 style={{fontSize: 'calc(2rem + 4vw)'}}>
                        Welcome to my homepage
                    </h1>
                    <p style={{fontSize: 'calc(1rem + 2vw)'}}>
                        Check out my Github repositories
                    </p>
                    <a href="https://github.com/bl4ckswordsman?tab=repositories" target="_blank" role="button">
                        <Button>
                            View Repositories
                        </Button>
                    </a>
                </FadeIn>
            </div>
        </div>
    );
}

export default function Index() {
    return (
        <RootLayout titleKey={"home"}>
            <Header/>
            <div className="max-w-screen-lg mx-auto"> {/* Match the max width of the navbar */}
                <HomePage/>
            </div>
        </RootLayout>
);
}