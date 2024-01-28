import {ModeToggle} from '@/components/mode-toggle';
import {GithubButton} from "@/components/github-button";

export const Header = () => {
    return (
        <header className="flex justify-between items-center p-4">
            <div className="text-2xl font-bold">bl4ckswordsman</div>
            <div className="flex space-x-2">
                <GithubButton link="https://github.com/bl4ckswordsman"/>
                <ModeToggle/>
            </div>
        </header>
    );
};