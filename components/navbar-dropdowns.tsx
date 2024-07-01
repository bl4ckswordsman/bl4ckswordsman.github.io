import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import React from "react";
import {usePathname} from "next/navigation";
import {Button} from "@/components/ui/button";
import NextLink from "next/link";

export interface DropdownItem {
    name: string;
    href: string;
}

export interface GithubMenuDropdownProps {
    items: DropdownItem[];
    minWidthClass?: string;
}

export const GithubMenuDropdown: React.FC<GithubMenuDropdownProps> = ({items, minWidthClass}) => {
    const pathname = usePathname();

    return (
        <NavigationMenu>
            <NavigationMenuItem>
                <NavigationMenuTrigger className={minWidthClass}>
                    <p className="text-inherit">Github</p>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                    <ul className={`grid gap-3 p-3 content-center w-max lg:grid-cols-1 ${minWidthClass}`}>
                        {items.map((item, index) => (
                            <NavigationMenuList key={index} className="w-full">
                                <Button asChild variant={pathname === item.href ? "default" : "ghost"}
                                        className="w-full text-center">
                                    <NextLink href={item.href} scroll={false}>
                                        {item.name}
                                    </NextLink>
                                </Button>
                            </NavigationMenuList>
                        ))}
                    </ul>
                </NavigationMenuContent>
            </NavigationMenuItem>
        </NavigationMenu>
    );
};