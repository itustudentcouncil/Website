"use client";
import { useEffect, useState } from "react";
import StaggeredMenu from "@/components/ui/staggered-menu";
import { DesktopNavigation } from "@/components/navigation/desktop-navigation";
import { Account } from "@/lib/interfaces/accounts/Account";

interface ResponsiveNavProps {
  links: Array<{ link: string; label: string; ariaLabel: string }>;
  contactItems: Array<{ label: string; link: string }>;
  isAuthenticated: boolean;
  account?: Account;
}

export function ResponsiveNav({
  links,
  contactItems,
  isAuthenticated,
  account
}: ResponsiveNavProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!hydrated) return null;

  return isMobile ? (
    <StaggeredMenu
      position="right"
      isFixed={true}
      items={links}
      socialItems={contactItems}
      displaySocials
      displayItemNumbering={true}
      menuButtonColor="#f37272"
      openMenuButtonColor="#fff"
      changeMenuColorOnOpen={true}
      colors={['#f05656', '#f37272']}
      logoUrl="https://cdn.studentcouncil.dk/organisations/9-student-council/icon.png"
      accentColor="#f37272"
    />
  ) : (
    <DesktopNavigation
      links={links}
      isAuthenticated={isAuthenticated}
      account={account}
    />
  );
}
