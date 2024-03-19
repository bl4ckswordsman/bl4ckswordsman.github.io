import {useState} from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Link
} from "@nextui-org/react";
import {GithubButton} from "@/components/github-button";
import {ModeToggle} from '@/components/mode-toggle';

function isValidUrl(url: string, allowedDomains: string[]): boolean {
    if (url.startsWith('/')) {
        return true;  // Allow relative URLs
    }

    try {
        const urlObj = new URL(url);
        return allowedDomains.includes(urlObj.hostname);
    } catch (err) {
        return false;
    }
}

export function NaviMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        {title: "Home", href: "/"}, // Index 0
        {title: "Github daily hits", href: "/hits"}
    ];

    const homeLink = menuItems[0].href;

    const allowedDomains = ["github.com"]; // Add your allowed domains here

    return (
        <Navbar isBordered onMenuOpenChange={setIsMenuOpen}>

            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <Link color="foreground" href={homeLink}>
                        <p className="font-bold text-inherit">bl4ckswordsman</p>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {menuItems.map((item, index) => (
                    isValidUrl(item.href, allowedDomains) && (
                        <NavbarItem key={index}>
                            <Link color="foreground" href={item.href}>
                                {item.title}
                            </Link>
                        </NavbarItem>
                    )
                ))}
                <div className="flex space-x-2">
                    <GithubButton link="https://github.com/bl4ckswordsman"/>
                    <ModeToggle/>
                </div>
            </NavbarContent>

            <NavbarMenu>
                {menuItems.map((item, index) => (
                    isValidUrl(item.href, allowedDomains) && (
                        <NavbarMenuItem key={index}>
                            <Link color="foreground" href={item.href}>
                                {item.title}
                            </Link>
                        </NavbarMenuItem>
                    )
                ))}
                <NavbarMenuItem>
                    <div className="flex space-x-2">
                        <GithubButton link="https://github.com/bl4ckswordsman"/>
                        <ModeToggle/>
                    </div>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    )
}