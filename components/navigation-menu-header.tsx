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
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import NextLink from 'next/link';
import {GithubMenuDropdown} from "@/components/navbar-dropdowns";

const NAV_ITEMS = [
    {
        name: 'Github',
        component: (props: { minWidthClass?: string }) => <GithubMenuDropdown minWidthClass={props.minWidthClass}
        items={[
            {name: 'Daily hits', href: '/hits'},
        ]}/>},
    {name: 'Portfolio', href: '/portfolio'},
    //{name: 'Projects', href: '/projects'},
    //{name: 'Admin', href: '/admin'},
    //{name: 'Guest Book', href: '/guestbook'},
    // More items here...
];

interface NavbarItemLinkProps {
    href: string;
    children: React.ReactNode;
    minWidthClass?: string;
}

const NavbarItemLink: React.FC<NavbarItemLinkProps> = ({href, children, minWidthClass}) => (
    <NavbarItem>
        <NextLink href={href} legacyBehavior passHref>
            <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${minWidthClass}`}>
                {children}
            </NavigationMenuLink>
        </NextLink>
    </NavbarItem>
);

interface MenuItemsProps {
    classname?: string;
    minWidthClass?: string;
}

const NavbarItemComponent: React.FC<{ component: React.ElementType, minWidthClass?: string }> = ({
                                                                                                     component: Component,
                                                                                                     minWidthClass
                                                                                                 }) => (
    <NavbarItem>
        <Component minWidthClass={minWidthClass}/>
    </NavbarItem>
);

const MenuItems: React.FC<MenuItemsProps> = ({classname, minWidthClass}) => (
    <NavigationMenu>
        <NavigationMenuList>
            <div className={`sm:flex sm:space-x-2 ${classname}`}>
                {NAV_ITEMS.map((item, index) =>
                    item.component
                        ? <NavbarItemComponent key={index} component={item.component} minWidthClass={minWidthClass}/>
                        : <NavbarItemLink key={index} href={item.href}
                                          minWidthClass={minWidthClass}>{item.name}</NavbarItemLink>
                )}
            </div>
        </NavigationMenuList>
    </NavigationMenu>
);

const NavBarIconButtons = () => (
    <div className="flex space-x-2 center">
        <GithubButton link="https://github.com/bl4ckswordsman"/>
        <ModeToggle/>
    </div>
);

export function NaviMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <Navbar shouldHideOnScroll isBordered
                isMenuOpen={isMenuOpen}
                onMenuOpenChange={setIsMenuOpen}>
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
                <div className="flex-col space-y-2">
                    <MenuItems classname="space-y-1" minWidthClass="min-w-[150px]"/>
                    <NavBarIconButtons/>
                </div>
            </NavbarMenu>
        </Navbar>
    )
}