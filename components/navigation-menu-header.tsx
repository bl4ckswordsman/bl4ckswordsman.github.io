import {useState} from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Link,
} from "@nextui-org/react";
import {GithubButton} from "@/components/github-button";
import {ModeToggle} from '@/components/mode-toggle';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"


const GithubMenuDropdown = () => (
    <NavigationMenu>
        <NavigationMenuItem>
            <NavigationMenuTrigger>
                <p className="text-inherit">Github</p>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
                <ul className="grid gap-3 p-4 w-fit lg:grid-cols-[.75fr_1fr]">
                    <NavigationMenuList>
                        <NavigationMenuLink href="/hits">Daily hits</NavigationMenuLink>
                    </NavigationMenuList>
                </ul>
            </NavigationMenuContent>
        </NavigationMenuItem>
    </NavigationMenu>
);

const MenuItems = () => (
    <div className="flex space-x-2">
        <NavbarItem>
            <GithubMenuDropdown/>
        </NavbarItem>
        <GithubButton link="https://github.com/bl4ckswordsman"/>
        <ModeToggle/>
    </div>
);

export function NaviMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <Navbar isBordered onMenuOpenChange={setIsMenuOpen}>
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
            </NavbarContent>

            <NavbarMenu>
                <NavbarMenuItem>
                    <GithubMenuDropdown/>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <MenuItems/>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    )
}