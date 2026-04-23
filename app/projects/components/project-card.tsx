'use client';

import { useState } from 'react';
import { Project } from "@/lib/interfaces/projects/project";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import * as motion from "motion/react-client";
import ProjectMDX from "./project-mdx";

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const completedLabel = project.endDate
        ? new Date(project.endDate).toLocaleString('en-US', { month: 'long', year: 'numeric' })
        : null;

    const handleClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <motion.div
            layout
            whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
        >
            <Card 
                className="p-4 transition-shadow cursor-pointer dark:bg-[rgba(40,23,25,0.9)] dark:border-[rgba(185,114,114,0.35)]"
                onClick={handleClick}
            >
                {isExpanded ? (
                    <motion.div className="-m-4" layout>
                        {/* Banner Image */}
                        <motion.div
                            layoutId={`project-image-${project.id}`}
                            className="w-full h-48 bg-gray-200 dark:bg-[rgb(50,28,31)] flex items-center justify-center overflow-hidden relative rounded-t-lg"
                        >
                            <Image
                                src={`https://cdn.studentcouncil.dk/${project.banner}`}
                                alt={project.title}
                                fill
                                sizes="(min-width: 1024px) 640px, 100vw"
                                quality={90}
                                priority
                                className="object-cover"
                            />
                        </motion.div>
                        <motion.div className="px-4 pt-3" layout>
                            <motion.h3 layoutId={`project-title-${project.id}`} className="font-semibold text-xl">
                                {project.title}
                            </motion.h3>
                            <div className="text-base text-muted-foreground">
                                {project.isOngoing ? (
                                    <Badge className='mt-1.5 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300'>ongoing</Badge>
                                ) : (
                                    completedLabel && <span>Completed <b>{completedLabel}</b></span>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div className="flex gap-4 items-start" layout>
                        {/* Banner Image */}
                        <motion.div
                            layoutId={`project-image-${project.id}`}
                            className="flex-shrink-0 w-20 h-20 rounded-md overflow-hidden"
                        >
                            <Image
                                src={`https://cdn.studentcouncil.dk/${project.banner}`}
                                alt={project.title}
                                width={80}
                                height={80}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                        
                        {/* Title */}
                        <div className="flex-1">
                            <motion.h3 layoutId={`project-title-${project.id}`} className="font-semibold text-xl">
                                {project.title}
                            </motion.h3>
                            <div className="text-base text-muted-foreground">
                                {project.isOngoing ? (
                                    <Badge className='mt-1.5 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300'>ongoing</Badge>
                                ) : (
                                    completedLabel && <span>Completed <b>{completedLabel}</b></span>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
                
                {/* MDX Content - Collapsed or Expanded */}
                <ProjectMDX 
                    contentPath={project.contentPath}
                    collapsed={!isExpanded}
                />
            </Card>
        </motion.div>
    );
}
