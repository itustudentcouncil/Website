"use client"

import GlowLink from "../GlowLink";
import Image from "next/image";

interface TeamsLinkProps {
    href?: string;
    children?: React.ReactNode;
}

export default function TeamsLink({ href, children }: TeamsLinkProps) {
    return (
        <GlowLink 
            href={href} 
            color="#6264A7" 
            icon={
                <Image 
                    src="/icons/teams.svg" 
                    alt="Teams" 
                    width={20} 
                    height={20}
                    style={{ display: 'block' }}
                />
            }
        >
            {children}
        </GlowLink>
    );
}
