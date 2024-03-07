import {ModeToggle} from '@/components/mode-toggle';
import {GithubButton} from "@/components/github-button";
/*import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import Link from 'next/link';*/
import {NaviMenu} from "@/components/navigation-menu-header";


export const Header = () => {
    return (
        <header className="flex justify-between items-center p-4">
            <NaviMenu/>
{/*            <Badge variant="outline">
                <div className="text-2xl font-bold">
                    <Link href="/" passHref>
                        <Button variant="link" className="text-primary">
                            bl4ckswordsman
                        </Button>
                    </Link>
                </div>
            </Badge>*/}
            <div className="flex space-x-2">
                <GithubButton link="https://github.com/bl4ckswordsman"/>
                <ModeToggle/>
            </div>
        </header>
    );
};