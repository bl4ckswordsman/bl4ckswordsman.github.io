import React from 'react';
import {NAV_ITEMS} from "@/components/navigation-menu-header";
import CategoryPageContent from "@/components/category-page-content";

export default function More() {
    const dropdownName = 'More';

    const moreNavItem = NAV_ITEMS.find(item => item.name === dropdownName);
    const MoreComponent = moreNavItem?.component?.();
    const items = MoreComponent?.props.items ?? [];

    return <CategoryPageContent items={items} titleKey="more" dropdownName={dropdownName}/>;
}