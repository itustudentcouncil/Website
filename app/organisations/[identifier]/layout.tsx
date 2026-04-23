import Image from "next/image";
import type { ReactNode } from "react";
import { CategoryBadge } from "@/app/organisations/components/category-badge";
import { AnimatedOrgDescription, AnimatedOrgHeader } from "./components/animated-org-content";
import { Organisation } from "@/lib/interfaces/organisations/organisation";
import { notFound } from "next/navigation";
import { getDominantColorHex } from "@/lib/helpers/ImageColourHelper";
import { QuickLink } from "@/lib/interfaces/organisations/quicklink";
import { OrgRouteTabs } from "@/app/organisations/[identifier]/components/org-route-tabs";
import { 
  WebsiteLink, 
  EmailLink, 
  InstagramLink, 
  DiscordLink, 
  FacebookLink, 
  GithubLink, 
  CalendarLink, 
  TeamsLink, 
  DefaultLink 
} from "@/components/glowui/Link";
import { ensureLightColor } from "@/lib/helpers/ColourHelper";
import styles from "./layout.module.css";

export const runtime = "nodejs";

async function getOrganisation(identifier: string): Promise<Organisation | null> {
  // API supports fetching with both id or slug
  const res = await fetch(`https://api.studentcouncil.dk/query/v1/organisations/${identifier}`);
  if (res.ok) return res.json(); else return null;
}

async function getOrganisationQuickLinks(identifier: string): Promise<QuickLink[] | null> {
  // API supports fetching with both id or slug
  const res = await fetch(`https://api.studentcouncil.dk/query/v1/organisations/${identifier}/quick-links`);
  if (res.ok) return res.json(); else return null;
}

function renderLinkByType(link: QuickLink, color: string) {
  const props = { href: link.url, color, children: link.name };
  const iconUrl = link.icon ? `https://cdn.studentcouncil.dk/${link.icon}` : undefined;
  
  switch (link.type.id) {
    case 1:
      return <WebsiteLink key={link.id} {...props} iconUrl={iconUrl} />;
    case 3:
      return <EmailLink key={link.id} {...props} />;
    case 4:
      return <InstagramLink key={link.id} href={link.url}>{link.name}</InstagramLink>;
    case 5:
      return <DiscordLink key={link.id} href={link.url}>{link.name}</DiscordLink>;
    case 6:
      return <FacebookLink key={link.id} href={link.url}>{link.name}</FacebookLink>;
    case 7:
      return <GithubLink key={link.id} href={link.url}>{link.name}</GithubLink>;
    case 8:
      return <CalendarLink key={link.id} {...props} />;
    case 9:
      return <TeamsLink key={link.id} href={link.url}>{link.name}</TeamsLink>;
    case 2:
    default:
      return <DefaultLink key={link.id} {...props} iconUrl={iconUrl} />;
  }
}

export default async function OrganisationLayout({
  params,
  children,
}: {
  params: Promise<{ identifier: string }>;
  children: ReactNode;
}) {
  const { identifier } = await params;
  const org = await getOrganisation(identifier);

  const bannerUrl = `https://cdn.studentcouncil.dk/${org?.banner ?? ""}`;
  const dominantColor = org?.banner ? await getDominantColorHex(bannerUrl) : "#1f2937";
  const lightColor = ensureLightColor(dominantColor, 65); // Ensure minimum 65% lightness for good contrast

  if (!org) return notFound();

  const links = await getOrganisationQuickLinks(identifier);

  return (
    <div className="min-h-screen -mt-20 md:-mt-24">
      <section className="relative w-full h-[220px] md:h-[280px]">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, ${dominantColor}cc 0%, ${dominantColor}88 35%, ${dominantColor}33 65%, rgba(0,0,0,0) 100%)`
            }}
          />
          <div
            className="absolute right-0 top-0 h-full w-[68%] md:w-[60%]"
            style={{
              WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 55%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0) 100%)",
              maskImage: "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 55%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0) 100%)"
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 30% 50%, ${dominantColor}55 0%, ${dominantColor}22 45%, rgba(0,0,0,0) 75%)`
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                boxShadow: `-80px 0 120px ${dominantColor}55`
              }}
            />
            <Image
              src={bannerUrl}
              alt={org.name}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 768px) 60vw, 68vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-background" />
        </div>

        <AnimatedOrgHeader
          title={org.name}
          badge={org.category ? <CategoryBadge category={org.category} /> : undefined}
        />

        <div className="absolute -bottom-10 right-6 md:right-10 w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-white shadow-lg">
          <Image
            src={`https://cdn.studentcouncil.dk/${org.icon}`}
            alt={`${org.name} icon`}
            fill
            className="object-cover"
          />
        </div>
      </section>

      {links && links.length > 0 && (
        <section className="mx-auto w-full max-w-5xl px-6 md:px-10 py-6">
          <div className="flex gap-3 flex-wrap pr-28 md:pr-32">
            {links.map((link: QuickLink, index: number) => (
              <div
                key={link.id}
                className={styles.linkSlideIn}
                style={{ animationDelay: `${index * 60}ms` }}
              >
                {renderLinkByType(link, lightColor)}
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto w-full max-w-5xl px-6 md:px-10 pt-2 pb-4">
        <AnimatedOrgDescription text={org.description} />
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 md:px-10 pb-12">
        <OrgRouteTabs identifier={identifier} />
        <div className="mt-6">{children}</div>
      </section>
    </div>
  );
}