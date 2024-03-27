import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem, NavigationMenuLink, NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import React from "react";

interface DropdownItem {
    name: string;
    href: string;
}

interface GithubMenuDropdownProps {
    items: DropdownItem[];
    minWidthClass?: string;
}

export const GithubMenuDropdown: React.FC<GithubMenuDropdownProps> = ({items, minWidthClass}) => (
    <NavigationMenu>
        <NavigationMenuItem>
            <NavigationMenuTrigger className={minWidthClass}>
                <p className="text-inherit">Github</p>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
                <ul className={`grid gap-3 p-4 w-fit lg:grid-cols-[.75fr_1fr] ${minWidthClass}`}>
                    {items.map((item, index) => (
                        <NavigationMenuList key={index}>
                            <NavigationMenuLink href={item.href}>{item.name}</NavigationMenuLink>
                        </NavigationMenuList>
                    ))}
                </ul>
            </NavigationMenuContent>
        </NavigationMenuItem>
    </NavigationMenu>
);