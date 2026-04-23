'use client';

import { Project } from "@/lib/interfaces/projects/project";
import ProjectCard from "./project-card";
import { useRef, useEffect, useState } from "react";
import * as motion from "motion/react-client";
import Fab from '@mui/material/Fab';
import { ChartNoAxesGantt, X } from 'lucide-react';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"

interface TimelineGroup {
    period: string;
    projects: Project[];
    side: 'left' | 'right';
}

interface ProjectsTimelineProps {
    groups: TimelineGroup[];
}

export default function ProjectsTimeline({ groups }: ProjectsTimelineProps) {
    const [activeGroup, setActiveGroup] = useState<string>(groups[0]?.period || '');
    const [isMobile, setIsMobile] = useState(false);
    const [hydrated, setHydrated] = useState(false);
    const [fabOpen, setFabOpen] = useState(false);
    const groupRefs = useRef<Map<string, HTMLDivElement>>(new Map());
    const isScrollingRef = useRef(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const observerEnabledRef = useRef(false);
    
    useEffect(() => {
        setHydrated(true);
        
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 948); // lg breakpoint - wider than nav
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        
        const enableObserverOnScroll = () => {
            observerEnabledRef.current = true;
            window.removeEventListener('scroll', enableObserverOnScroll);
        };

        window.addEventListener('scroll', enableObserverOnScroll, { passive: true });

        const observer = new IntersectionObserver(
            (entries) => {
                if (!observerEnabledRef.current) return;
                if (isScrollingRef.current) return;
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const period = entry.target.getAttribute('data-period');
                        if (period) {
                            setActiveGroup(period);
                        }
                    }
                });
            },
            {
                threshold: 0.2,
                rootMargin: '-15% 0px -45% 0px'
            }
        );

        groupRefs.current.forEach((element) => {
            if (element) observer.observe(element);
        });

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', enableObserverOnScroll);
            window.removeEventListener("resize", checkMobile);
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, [groups]);

    const scrollToGroup = (period: string) => {
        const element = groupRefs.current.get(period);
        if (element) {
            setActiveGroup(period);
            setFabOpen(false); // Close FAB menu on mobile
            isScrollingRef.current = true;
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - 120;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            scrollTimeoutRef.current = setTimeout(() => {
                isScrollingRef.current = false;
            }, 900);
        }
    };

    console.log('Rendering timeline with groups:', groups);
    
    if (!hydrated) return null;
    
    if (!groups || groups.length === 0) {
        return (
            <div className="w-full max-w-7xl mx-auto p-8 text-center">
                <p className="text-muted-foreground">No completed projects to display.</p>
            </div>
        );
    }
    
    const listVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 flex gap-8">
            {/* Floating Action Button for Mobile */}
            {isMobile && (
                <>
                    <div className="fixed bottom-6 right-6 z-30">
                        <Fab 
                            onClick={() => setFabOpen(!fabOpen)}
                            sx={{
                                backgroundColor: 'oklch(0.645 0.246 16.439)',
                                color: 'oklch(0.969 0.015 12.422)',
                                '&:hover': {
                                    backgroundColor: 'oklch(0.6 0.23 16.439)',
                                }
                            }}
                        >
                        {fabOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.2 }}
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <X />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="menu"
                                initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.2 }}
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <ChartNoAxesGantt />
                            </motion.div>
                        )}
                    </Fab>
                    </div>
                    
                    {/* FAB Menu - Drawer */}
                    <Drawer open={fabOpen} onOpenChange={setFabOpen}>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>Jump to Period</DrawerTitle>
                                <DrawerDescription>Select a time period to navigate to</DrawerDescription>
                            </DrawerHeader>
                            <div className="px-4 pb-4 max-h-[60vh] overflow-y-auto">
                                <div className="space-y-2">
                                    {groups.map((group) => (
                                        <button
                                            key={group.period}
                                            onClick={() => scrollToGroup(group.period)}
                                            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                                                activeGroup === group.period
                                                    ? 'bg-primary/15 text-primary font-semibold ring-1 ring-primary/30'
                                                    : 'hover:bg-accent hover:text-accent-foreground'
                                            }`}
                                        >
                                            {group.period}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <DrawerFooter>
                                <DrawerClose asChild>
                                    <button className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                                        Close
                                    </button>
                                </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </>
            )}

            {/* Left Sidebar Navigation - Desktop Only */}
            {!isMobile && (
                <div className="sticky top-1/2 -translate-y-1/2 h-fit w-48 flex-shrink-0">
                    <motion.div className="space-y-2" variants={listVariants} initial="hidden" animate="show">
                        {groups.map((group) => (
                            <motion.button
                                key={group.period}
                                variants={itemVariants}
                                onClick={() => scrollToGroup(group.period)}
                                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                                    activeGroup === group.period
                                        ? 'bg-primary/15 text-primary font-semibold ring-1 ring-primary/30'
                                        : 'hover:bg-accent hover:text-accent-foreground'
                                }`}
                            >
                                {group.period}
                            </motion.button>
                        ))}
                    </motion.div>
                </div>
            )}

            {/* Timeline */}
            <div className="flex-1 relative min-w-0">
                {/* Center line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />
                
                {/* Timeline groups */}
                <motion.div className="space-y-12" variants={listVariants} initial="hidden" animate="show">
                    {groups.map((group, groupIndex) => (
                        <motion.div 
                            key={`${group.period}-${groupIndex}`} 
                            className="relative"
                            variants={itemVariants}
                            ref={(el) => {
                                if (el) groupRefs.current.set(group.period, el);
                            }}
                            data-period={group.period}
                        >
                            {/* Period indicator on the center line */}
                            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-0">
                                <div className="bg-card rounded-full p-0.5">
                                    <div className="bg-primary/15 text-primary px-4 py-2 rounded-full font-semibold whitespace-nowrap ring-1 ring-primary/30">
                                        {group.period}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Projects layout - centered on mobile, alternating on desktop */}
                            <div className={
                                isMobile 
                                    ? 'flex justify-center pt-12'
                                    : `flex ${group.side === 'left' ? 'justify-start pr-[52%]' : 'justify-end pl-[52%]'} pt-12`
                            }>
                                <motion.div className="space-y-8 w-full" variants={listVariants} initial="hidden" animate="show">
                                    {group.projects.map((project) => (
                                        <motion.div key={project.id} variants={itemVariants}>
                                            <ProjectCard project={project} />
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
