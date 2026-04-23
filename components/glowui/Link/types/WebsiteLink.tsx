"use client"

import GlowLink from "../GlowLink";
import { Home } from "lucide-react";
import Image from "next/image";

interface WebsiteLinkProps {
    href?: string;
    color?: string;
    iconUrl?: string;
    children?: React.ReactNode;
}

export default function WebsiteLink({ href, color, iconUrl, children }: WebsiteLinkProps) {
    return (
        <GlowLink href={href} color={color} icon={iconUrl ? (
            <Image src={iconUrl} alt="website icon" width={28} height={28} />
        ) : (
            <Home size={28} />
        )}>
            {children}
        </GlowLink>
    );
}
