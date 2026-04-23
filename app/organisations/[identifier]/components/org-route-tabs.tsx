"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface OrgRouteTabsProps {
  identifier: string;
}

export function OrgRouteTabs({ identifier }: OrgRouteTabsProps) {
  const pathname = usePathname();
  const basePath = `/organisations/${identifier}`;

  const tabs = [
    { label: "Home", href: basePath },
    { label: "News", href: `${basePath}/news` },
  ];

  const activeTab =
    tabs.find((tab) => pathname === tab.href || pathname === `${tab.href}/`)?.href ?? basePath;

  return (
    <nav aria-label="Organisation sections" className="w-full border-b border-border/70 pb-0.5">
      <Tabs value={activeTab}>
        <TabsList variant="line" className="w-full justify-start gap-2 sm:gap-4 px-0">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.href} value={tab.href} asChild>
            <Link href={tab.href}>{tab.label}</Link>
          </TabsTrigger>
        ))}
        </TabsList>
      </Tabs>
    </nav>
  );
}
