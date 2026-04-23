"use client"

import GlowLink from "../GlowLink";
import { Mail } from "lucide-react";

interface EmailLinkProps {
    href?: string;
    color?: string;
    children?: React.ReactNode;
}

export default function EmailLink({ href, color, children }: EmailLinkProps) {
    return (
        <GlowLink href={href} color={color} icon={<Mail size={20} />}>
            {children}
        </GlowLink>
    );
}
