"use client";

import {
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuLink
} from "@/components/ui/navigation-menu";
import React, {useState, useEffect} from "react";
import Link from "next/link";
import {getDescription, metadata} from "@/app/metadata";

export interface DropdownItem {
    name: string;
    href: string;
    key?: keyof typeof metadata.descriptions;
}

export interface NavbarDropdownProps {
    dropdownName: string;
    items: DropdownItem[];
}

export const NavbarDropdown: React.FC<NavbarDropdownProps> = ({dropdownName, items}) => {
    // Force CSR
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null; // or a loading placeholder
    }

    return (
        <NavigationMenuItem>
            <NavigationMenuTrigger className="sm:min-w-0 min-w-[150px] bg-[hsl(var(--popover))]">
                {dropdownName}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
                <ul className={'grid gap-3 p-4 w-[400px]'}>
                    {items.map((item, index) => (
                        <li key={index}>
                            <NavigationMenuLink asChild>
                                <Link
                                    href={item.href}
                                    className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground`}
                                >
                                    <div className="text-sm font-medium leading-none">{item.name}</div>
                                    {item.key && (
                                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                            {getDescription(item.key)}
                                        </p>
                                    )}
                                </Link>
                            </NavigationMenuLink>
                        </li>
                    ))}
                </ul>
            </NavigationMenuContent>
        </NavigationMenuItem>
    );
};