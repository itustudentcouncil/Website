'use client';

import { useEffect, useState, useRef } from 'react';
import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import * as motion from "motion/react-client";

interface ProjectMDXProps {
    contentPath: string;
    collapsed?: boolean;
}

export default function ProjectMDX({ contentPath, collapsed = false }: ProjectMDXProps) {
    const [MDXContent, setMDXContent] = useState<React.ComponentType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showFade, setShowFade] = useState(false);
    const [mdxReady, setMdxReady] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function loadMDX() {
            try {
                setIsLoading(true);
                const response = await fetch(`/api/mdx-content?path=${encodeURIComponent(contentPath)}`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch MDX content');
                }
                
                const mdxSource = await response.text();
                
                // Compile and evaluate the MDX
                const { default: Content } = await evaluate(mdxSource, {
                    ...runtime,
                    development: false
                });
                
                setMDXContent(() => Content);
                setMdxReady(true);
                setError(null);
            } catch (err) {
                console.error('Error loading MDX:', err);
                setError('Failed to load content');
            } finally {
                setIsLoading(false);
            }
        }

        loadMDX();
    }, [contentPath]);

    useEffect(() => {
        // Check if content is taller than preview height (only in collapsed mode)
        const checkOverflow = () => {
            if (contentRef.current && collapsed) {
                const isOverflowing = contentRef.current.scrollHeight > 176; // 11rem = 176px
                setShowFade(isOverflowing);
            } else {
                setShowFade(false);
            }
        };

        // Check immediately and after animation completes
        checkOverflow();
        const timer = setTimeout(checkOverflow, 300);
        
        return () => clearTimeout(timer);
    }, [collapsed, mdxReady]);

    if (isLoading) {
        return <div className="text-sm text-muted-foreground">Loading content...</div>;
    }

    if (error) {
        return <div className="text-sm text-destructive">{error}</div>;
    }

    if (!MDXContent) {
        return null;
    }

    const baseStyles = "text-sm leading-relaxed max-w-none [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mt-0 [&_ul]:mb-2 [&_ul]:space-y-0.5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mt-0 [&_ol]:mb-2 [&_ol]:space-y-0.5 [&_p]:my-4 [&_p:first-child]:mt-0 [&_p:has(+ul)]:mb-0 [&_p:has(+ol)]:mb-0 [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-primary/80 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mt-6 [&_h1]:mb-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-5 [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2 [&_h4]:text-base [&_h4]:font-semibold [&_h4]:mt-3 [&_h4]:mb-2";

    return (
        <div className="relative -mt-1">
            <div 
                ref={contentRef}
                className={`${baseStyles} ${collapsed ? 'max-h-44 overflow-hidden' : ''}`}
            >
                <MDXContent />
            </div>
            {showFade && (
                <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card dark:from-[rgba(40,23,25,0.9)] to-transparent pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: collapsed ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                />
            )}
        </div>
    );
}
