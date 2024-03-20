import React, {useState} from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    Link,
} from "@nextui-org/react";
import {GithubButton} from "@/components/github-button";
import {ModeToggle} from '@/components/mode-toggle';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger, navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import NextLink from 'next/link';

interface NavbarItemLinkProps {
    href: string;
    children: React.ReactNode;
}

const NavbarItemLink: React.FC<NavbarItemLinkProps> = ({ href, children }) => (
    <NavbarItem>
        <NextLink href={href} legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {children}
            </NavigationMenuLink>
        </NextLink>
    </NavbarItem>
);

const GithubMenuDropdown = () => (
    <NavbarItem>
        <NavigationMenu>
            <NavigationMenuItem>
                <NavigationMenuTrigger>
                    <p className="text-inherit">Github</p>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-fit lg:grid-cols-[.75fr_1fr]">
                        <NavigationMenuList>
                            <NavigationMenuLink href="/hits">Daily hits</NavigationMenuLink>
                        </NavigationMenuList>
                    </ul>
                </NavigationMenuContent>
            </NavigationMenuItem>
        </NavigationMenu>
    </NavbarItem>
);

const MenuItems = () => (
    <NavigationMenu>
        <NavigationMenuList>
            <div className="sm:flex sm:space-x-2">
                <GithubMenuDropdown/>
                <NavbarItemLink href="/portfolio">Portfolio</NavbarItemLink>
            </div>
        </NavigationMenuList>
    </NavigationMenu>
);

const NavBarIconButtons = () => (
    <div className="flex space-x-2">
        <GithubButton link="https://github.com/bl4ckswordsman"/>
        <ModeToggle/>
    </div>
);

export function NaviMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <Navbar position="sticky" /*shouldHideOnScroll*/ isBordered onMenuOpenChange={setIsMenuOpen} >
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <Link color="foreground" href={"/"}>
                        <p className="font-bold text-inherit">bl4ckswordsman</p>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <MenuItems/>
                <NavBarIconButtons/>
            </NavbarContent>

            <NavbarMenu>
                <div className="flex-col">
                    <MenuItems/>
                    <NavBarIconButtons/>
                </div>
            </NavbarMenu>
        </Navbar>
    )
}