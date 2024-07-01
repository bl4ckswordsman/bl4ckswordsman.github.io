import React from 'react';
import { DropdownItem, GithubMenuDropdownProps } from "@/components/navbar-dropdowns";
import RootLayout from "@/app/layout";
import { Button } from "@/components/ui/button";
import NextLink from "next/link";
import { NAV_ITEMS } from "@/components/navigation-menu-header";
import CustomBreadcrumb from "@/components/breadcrumbs";

const GithubPage: React.FC<GithubMenuDropdownProps> = ({ items }) => {
    return (
        <div className="m-4">
            {items.map((item: DropdownItem, index: number) => (
                <div key={index} className="m-2">
                    <Button variant="secondary">
                        <NextLink href={item.href} scroll={false}>
                            {item.name}
                        </NextLink>
                    </Button>
                </div>
            ))}
        </div>
    );
};

export default function Github() {
    const githubNavItem = NAV_ITEMS.find(item => item.name === 'Github');

    // Use optional chaining and nullish coalescing to safely access items
    const items = githubNavItem?.component?.({})?.props.items ?? [];

    return (
        <RootLayout titleKey={"github"}>
            <CustomBreadcrumb/>
            <GithubPage items={items} />
        </RootLayout>
    );
}
