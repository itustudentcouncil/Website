"use client"

import GlowLink from "../GlowLink";
import { Link } from "lucide-react";
import Image from "next/image";

interface DefaultLinkProps {
    href?: string;
    color?: string;
    iconUrl?: string;
    children?: React.ReactNode;
}

export default function DefaultLink({ href, color, iconUrl, children }: DefaultLinkProps) {
    return (
        <GlowLink href={href} color={color} icon={iconUrl ? (
            <Image src={iconUrl} alt="link icon" width={28} height={28} />
        ) : (
            <Link size={16} />
        )} iconSize={iconUrl ? 28 : undefined}>
            {children}
        </GlowLink>
    );
}
