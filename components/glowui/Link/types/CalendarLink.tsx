"use client"

import GlowLink from "../GlowLink";
import { Calendar } from "lucide-react";

interface CalendarLinkProps {
    href?: string;
    color?: string;
    children?: React.ReactNode;
}

export default function CalendarLink({ href, color, children }: CalendarLinkProps) {
    return (
        <GlowLink href={href} color={color} icon={<Calendar size={20} />}>
            {children}
        </GlowLink>
    );
}
