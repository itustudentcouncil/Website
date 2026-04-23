"use client"

import GlowLink from "../GlowLink";
import { Facebook } from "lucide-react";

interface FacebookLinkProps {
    href?: string;
    children?: React.ReactNode;
}

export default function FacebookLink({ href, children }: FacebookLinkProps) {
    return (
        <GlowLink href={href} color="#1877F2" icon={<Facebook size={20} />} iconSize={20}>
            {children}
        </GlowLink>
    );
}
