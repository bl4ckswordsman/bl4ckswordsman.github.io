import React from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {clsx} from 'clsx';
import {NavbarDropdown} from "@/components/navbar-dropdowns";

interface MobileNavItemProps {
    href: string;
    children: React.ReactNode;
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({href, children}) => {
    const pathname = usePathname();

    return (
        <div className="flex w-full items-center text-lg font-semibold">
            <Link
                href={href}
                className={clsx(
                    'flex w-full items-center rounded-md p-1',
                    pathname === href
                        ? 'bg-accent text-accent-foreground'
                        : 'hover:bg-muted focus:bg-muted'
                )}
            >
                {children}
            </Link>
        </div>
    );
};


interface DropdownItem {
    name: string;
    href: string;
    key?: string;
}

const MobileDropdownContent: React.FC<{ component: () => React.ReactElement }> = ({component}) => {
    const ComponentInstance = component();

    if (React.isValidElement<{ items: DropdownItem[] }>(ComponentInstance) &&
        ComponentInstance.type === NavbarDropdown) {
        const {items} = ComponentInstance.props;

        if (items && Array.isArray(items)) {
            return (
                <div className="flex flex-col">
                    {items.map((item, index) => (
                        <MobileNavItem key={index} href={item.href}>
                            {item.name}
                        </MobileNavItem>
                    ))}
                </div>
            );
        }
    }

    return null;
};

export {MobileDropdownContent};
export default MobileNavItem;