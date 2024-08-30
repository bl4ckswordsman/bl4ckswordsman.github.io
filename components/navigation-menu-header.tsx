"use client"
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
    NavigationMenuIndicator,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import NextLink from 'next/link';
import {NavbarDropdown} from "@/components/navbar-dropdowns";
import {clsx} from "clsx";
import {usePathname} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import MobileNavItem, {MobileDropdownContent} from "@/components/navbar-mobile";
import {ChevronRightIcon} from "@radix-ui/react-icons";

export const NAV_ITEMS = [
    {name: 'Portfolio', href: '/portfolio', key: 'portfolio'},
    {name: 'AI Chat', href: '/ai-chat', key: 'aichat'},
    {
        name: 'Github',
        component: () =>
            <NavbarDropdown
                dropdownName="Github"
                items={[
                    {
                        name: 'GitHub stats',
                        href: '/github/stats',
                        key: 'stats'
                    },
                    // Add more items as needed
                ]}
            />
    },
    {
        name: 'More',
        component: () =>
            <NavbarDropdown
                dropdownName="More"
                items={[
                    {
                        name: 'Guestbook',
                        href: '/more/guestbook',
                        key: 'guestbook'
                    },
                ]}
            />
    },
    //{name: 'Projects', href: '/projects'},
    //{name: 'Admin', href: '/admin'},
    // More items here...
];

interface NavbarItemLinkProps {
    href: string;
    children: React.ReactNode;
    minWidthClass?: string;
}

const NavbarItemLink: React.FC<NavbarItemLinkProps> = ({href, children, minWidthClass}) => {
    const pathname = usePathname();

    return (
        <NavbarItem>
            <Button asChild variant={pathname === href ? "default" : "ghost"}
                    className={clsx(minWidthClass, pathname !== href && "bg-[hsl(var(--popover))]")}>
                <NextLink href={href} scroll={false}>
                    {children}
                </NextLink>
            </Button>
        </NavbarItem>
    );
};

interface MenuItemsProps {
    classname?: string;
    minWidthClass?: string;
}

const NavbarItemComponent: React.FC<{
    component: React.ElementType,
    minWidthClass?: string
}> = ({
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
            <NavigationMenuIndicator/>
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

            {/*Navbar in the mobile view*/}
            <NavbarMenu>
                <div className="flex-col space-y-1">
                    {NAV_ITEMS.map((item, index) =>
                        item.component ? (
                            <Collapsible key={index} className="w-full p-1">
                                <CollapsibleTrigger
                                    className="flex w-full items-center text-lg font-semibold [&[data-state=open]>svg]:rotate-90"
                                >
                                    {item.name}
                                    <ChevronRightIcon className="ml-auto h-5 w-5 transition-all"/>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <div className="pl-4 pt-2">
                                        <MobileDropdownContent component={item.component}/>
                                    </div>
                                </CollapsibleContent>
                            </Collapsible>
                        ) : (
                            <MobileNavItem key={index} href={item.href}>
                                {item.name}
                            </MobileNavItem>
                        )
                    )}
                </div>
                <NavBarIconButtons/>
            </NavbarMenu>
        </Navbar>
    )
}
