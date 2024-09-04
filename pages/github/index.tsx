import React from 'react';
import {NAV_ITEMS} from "@/components/navigation-menu-header";
import CategoryPageContent from "@/components/category-page-content";

export default function More() {
    const dropdownName = 'GitHub';

    const githubNavItem = NAV_ITEMS.find(item => item.name === dropdownName);
    const githubComponent = githubNavItem?.component?.();
    const items = githubComponent?.props.items ?? [];

    return <CategoryPageContent items={items} titleKey="github" dropdownName={dropdownName}/>;
}