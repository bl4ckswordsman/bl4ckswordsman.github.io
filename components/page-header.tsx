import {ModeToggle} from '@/components/mode-toggle';
import {GithubButton} from "@/components/github-button";
/*import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import Link from 'next/link';*/
import {NaviMenu} from "@/components/navigation-menu-header";


export const Header = () => {
    return (
        <header className="flex justify-between items-center ">
            <NaviMenu/>
        </header>
    );
};