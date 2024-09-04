import React from 'react';
import { DropdownItem, NavbarDropdownProps } from "@/components/navbar-dropdowns";
import RootLayout from "@/app/layout";
import { Button } from "@/components/ui/button";
import NextLink from "next/link";
import CustomBreadcrumb from "@/components/breadcrumbs";
import {MetadataKeys} from "@/app/metadata";

interface CategoryPageProps extends NavbarDropdownProps {
    titleKey: MetadataKeys;
}

const CategoryPageContent: React.FC<CategoryPageProps> = ({ items, titleKey }) => {
    return (
        <RootLayout titleKey={titleKey}>
            <CustomBreadcrumb />
            <div className="m-4">
                {items.map((item: DropdownItem, index: number) => (
                    <div key={index} className="m-2">
                        <Button size="lg" variant="secondary">
                            <NextLink href={item.href} scroll={false}>
                                {item.name}
                            </NextLink>
                        </Button>
                    </div>
                ))}
            </div>
        </RootLayout>
    );
};

export default CategoryPageContent;