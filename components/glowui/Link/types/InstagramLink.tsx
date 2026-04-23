"use client"

import GlowLink from "../GlowLink";
import { Instagram } from "lucide-react";

interface InstagramLinkProps {
    href?: string;
    children?: React.ReactNode;
}

export default function InstagramLink({ href, children }: InstagramLinkProps) {
    // Instagram gradient colors
    const instagramGradient = "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)";
    
    return (
        <GlowLink 
            href={href} 
            color="#e1306c" 
            icon={
                <div style={{ 
                    background: instagramGradient,
                    borderRadius: "4px",
                    padding: "2px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Instagram size={16} color="white" />
                </div>
            }
        >
            {children}
        </GlowLink>
    );
}
