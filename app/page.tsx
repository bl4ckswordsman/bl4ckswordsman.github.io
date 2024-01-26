"use client"
import { Button } from "@/components/ui/button";
import {Header} from "@/components/page-header";
import { ParticleOrbBackground } from "@/components/particle-orb-background";
import ParticlesBackground from "@/components/particles-background";


export default function HomePage() {
    return (
        <div>
            <Header />
            <div className="particles-container">
                <ParticlesBackground />
            </div>
            <div className="content-container">
                <div className="wrap">
                    {Array.from({ length: 10 }, (_, i) => (
                        <div key={i} className="c"></div>
                    ))}
                </div>
                <h1>Welcome to my homepage</h1>
                <p>Check out my Github repositories</p>

                <a href="https://github.com/bl4ckswordsman?tab=repositories" target="_blank" role="button">
                    <Button>
                        View Repositories
                    </Button>
                </a>
            </div>
        </div>
    );
}