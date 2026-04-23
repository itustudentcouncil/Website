"use client"

import GlowLink from "../GlowLink";
import { Github } from "lucide-react";

interface GithubLinkProps {
    href?: string;
    color?: string;
    children?: React.ReactNode;
}

export default function GithubLink({ href, color, children }: GithubLinkProps) {
    return (
        <GlowLink href={href} color={color || "#6e5494"} icon={<Github size={20} />}>
            {children}
        </GlowLink>
    );
}
