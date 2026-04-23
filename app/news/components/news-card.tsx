'use client';

import { useState } from 'react';
import { News } from "@/lib/interfaces/news/news";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import * as motion from "motion/react-client";
import Link from 'next/link';

interface NewsCardProps {
    news: News;
}

export function NewsCard({ news }: NewsCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <Link href={`/news/${news.id}`} scroll>
            <motion.div
                layout
                whileHover={{
                    scale: 1.02,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="h-[420px] flex flex-col rounded-lg overflow-hidden border border-gray-200 dark:border-[rgba(185,114,114,0.35)] dark:bg-[rgba(40,23,25,0.9)]"
                onClick={handleClick}
            >
                {news.banner && (
                    <motion.div
                        layoutId={`news-image-${news.id}`}
                        className="w-full h-56 bg-gray-200 dark:bg-[rgb(50,28,31)] overflow-hidden flex-shrink-0 relative"
                    >
                        <Image
                            src={"https://cdn.studentcouncil.dk/" + news.banner}
                            alt={news.title}
                            fill
                            sizes="(min-width: 1024px) 640px, 100vw"
                            quality={90}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                )}
                <Card className="border-0 rounded-none flex-1 cursor-pointer dark:bg-[rgba(40,23,25,0.9)]">
                    <div className="pt-0 p-6 h-full flex flex-col">
                        <motion.h3 layoutId={`news-title-${news.id}`} className="text-lg font-bold mb-0 line-clamp-2">
                            {news.title}
                        </motion.h3>
                        {news.publishedAt && (
                            <p className="text-m text-gray-500 dark:text-gray-500 mt-1">
                                {new Date(news.publishedAt).toLocaleDateString()}
                            </p>
                        )}
                        <p className="text-gray-600 dark:text-gray-400 text-s line-clamp-3 flex-1">
                            {news.description}
                        </p>
                    </div>
                </Card>
            </motion.div>
        </Link>
    );
}
