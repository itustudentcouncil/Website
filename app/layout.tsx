import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import React from "react";
import { ResponsiveNav } from "@/components/navigation/responsive-nav";
import { Footer } from "@/components/footer";
import { getCurrentAuthSession } from "@/lib/auth/session";

export const metadata: Metadata = {
  metadataBase: new URL("https://studentcouncil.dk"),
  title: "Student Council",
  description: "We are the voice of the students at the IT University of Copenhagen",
  applicationName: "Student Council",
  openGraph: {
    title: "Student Council",
    description: "We are the voice of the students at the IT University of Copenhagen",
    siteName: "Student Council",
    type: "website",
    images: [
      {
        url: "/Banner.png",
        alt: "Student Council",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Student Council",
    description: "We are the voice of the students at the IT University of Copenhagen",
    images: ["/Banner.png"],
  },
};

const links = [
  { link: "/", label: "Home", ariaLabel: "Go to home page" },
  { link: "/organisations", label: "Organisations", ariaLabel: "Go to organisations page" },
  { link: "/events", label: "Events", ariaLabel: "Go to events page" },
  { link: "/news", label: "News", ariaLabel: "Go to organisations page" },
  { link: "/projects", label: "Projects", ariaLabel: "Go to projects page" },
];

const contactItems = [
  { label: 'Email', link: 'mailto:board@studentcouncil.dk' },
  { label: 'Instagram', link: 'https://www.instagram.com/studentcouncilitu' },
  { label: 'GitHub', link: 'https://github.com/itustudentcouncil' }
];

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [authSession] = await Promise.all([
    getCurrentAuthSession(),
  ]);
  const { isAuthenticated, account } = authSession;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ResponsiveNav
            links={links}
            contactItems={contactItems}
            isAuthenticated={isAuthenticated}
            account={account}
          />
          {/* Page Content */}
          <div className="pt-20 md:pt-24 flex-1 flex flex-col">
            {children}
          </div>
          <Footer navLinks={links} />
        </ThemeProvider>
      </body>
    </html>
  );
}
