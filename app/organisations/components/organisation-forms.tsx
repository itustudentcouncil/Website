"use client"

import { useEffect, useRef, useState } from "react";
import { Banknote, Plus } from "lucide-react";

import { RainbowButton } from "@/components/ui/rainbow-button";

export function OrganisationForms() {
    const containerRef = useRef<HTMLDivElement>(null);
    const fundingButtonRef = useRef<HTMLAnchorElement>(null);
    const createButtonRef = useRef<HTMLAnchorElement>(null);
    const [isStacked, setIsStacked] = useState(false);

    useEffect(() => {
        const updateLayout = () => {
            const container = containerRef.current;
            const fundingButton = fundingButtonRef.current;
            const createButton = createButtonRef.current;

            if (!container || !fundingButton || !createButton) {
                return;
            }

            const gapWidth = 16;
            const requiredWidth = fundingButton.offsetWidth + createButton.offsetWidth + gapWidth;

            setIsStacked(requiredWidth > container.offsetWidth);
        };

        updateLayout();

        const resizeObserver = new ResizeObserver(() => {
            updateLayout();
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={isStacked ? "mt-8 flex flex-col items-start gap-4" : "mt-8 flex flex-row items-center gap-4"}
        >
            <RainbowButton
                ref={fundingButtonRef}
                href="https://forms.studentcouncil.dk/forms/funding"
                target="_blank"
                className={isStacked ? "self-start justify-center" : undefined}
            >
                <Banknote className="h-4 w-4" />
                Apply for funding
            </RainbowButton>
            <RainbowButton
                ref={createButtonRef}
                href="https://forms.studentcouncil.dk/forms/create"
                target="_blank"
                className={isStacked ? "self-start justify-center" : undefined}
            >
                <Plus className="h-4 w-4" />
                Create organisation
            </RainbowButton>
        </div>
    );
}