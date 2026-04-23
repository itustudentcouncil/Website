"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { UserRoundPlus } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";
import { Button } from "../ui/button";
import GlassSurface from "../ui/glass-surface";
import styles from "./desktop-navigation.module.css";
import { Account } from "@/lib/interfaces/accounts/Account";
import { DesktopAccountFlyout } from "./desktop-account-flyout";

interface NavLink {
  link: string;
  label: string;
  ariaLabel: string;
}

interface DesktopNavigationProps {
    links: NavLink[];
    isAuthenticated: boolean;
    account?: Account;
}

export const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
    links,
    isAuthenticated,
    account
}) => {
    const pathname = usePathname();
    const { resolvedTheme } = useTheme();
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    const isDark = hydrated && resolvedTheme === "dark";

    return (
        <div className="fixed top-2 left-4 right-4 z-50">
            <GlassSurface
                width="100%"
                height="auto"
                borderRadius={14}
                className="shadow-lg relative"
                backgroundOpacity={isDark ? 0.3 : 0}
                saturation={1.2}
                blur={15}
            >
                <nav className="flex items-center justify-between px-6 py-0 w-full relative z-20">
                    <div className="flex items-center justify-center">
                        <Link href="/" aria-label="Go to home page" className="flex items-center py-1">
                            <Image
                                src="https://cdn.studentcouncil.dk/organisations/9-student-council/icon.png"
                                alt="Student Council"
                                width={48}
                                height={48}
                                className="size-12 rounded-full border-0 border-white shadow-lg object-cover"
                                priority
                            />
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <NavigationMenu>
                            <NavigationMenuList>
                                {links.map(({ link, label }) => (
                                    <NavigationMenuItem key={link}>
                                        <NavigationMenuLink
                                            href={link}
                                            className={
                                                hydrated && pathname === link
                                                    ? "text-[var(--primary)] font-bold"
                                                    : ""
                                            }
                                        >
                                            {label}
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                        <AnimatedThemeToggler />
                        {isAuthenticated ? (
                            <DesktopAccountFlyout account={account} />
                        ) : (
                            <Button variant="outline" size="icon" asChild>
                                <Link href="http://login.studentcouncil.dk/login?redirect=https://studentcouncil.dk">
                                    <UserRoundPlus className="h-[1.2rem] w-[1.2rem]" />
                                    <span className="sr-only">Login</span>
                                </Link>
                            </Button>
                        )}
                    </div>
                </nav>
                <div className={`${isDark ? styles.frostedLayerDark : styles.frostedLayerLight} absolute inset-0 rounded-xl pointer-events-none z-10`} />
            </GlassSurface>
        </div>
    );
};