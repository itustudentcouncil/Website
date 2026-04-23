'use client';
import { Event } from "@/lib/interfaces/events/event";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import * as motion from "motion/react-client";

interface EventCardProps {
    event: Event;
}

export function EventCard({ event }: EventCardProps) {
    const eventDate = new Date(event.date);
    const eventTime = event.time.split(':').slice(0, 2).join(':');

    return (
        <motion.div
            layout
            whileHover={{
                scale: 1.02,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="rounded-lg overflow-hidden border border-gray-200 dark:border-[rgba(185,114,114,0.35)] dark:bg-[rgba(40,23,25,0.9)] bg-white"
        >
            <Card className="border-0 rounded-none cursor-pointer dark:bg-[rgba(40,23,25,0.9)]">
                <div className="p-3">
                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-primary/10 dark:bg-primary/20 flex flex-col items-center justify-center border border-primary/20 dark:border-primary/30">
                            <span className="text-xs font-semibold text-primary dark:text-primary/90 uppercase">
                                {eventDate.toLocaleDateString('en-US', { month: 'short' })}
                            </span>
                            <span className="text-2xl font-bold text-primary dark:text-primary/90">
                                {eventDate.getDate()}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3">
                                <h3 className="text-lg font-bold line-clamp-2 flex-1 leading-tight">
                                    {event.name}
                                </h3>
                                {event.organisation?.icon && (
                                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200 dark:border-[rgba(185,114,114,0.5)] flex-shrink-0">
                                        <Image
                                            src={`https://cdn.studentcouncil.dk/${event.organisation.icon}`}
                                            alt={event.organisation.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                            </div>
                            <p className="text-sm text-gray-500 mb-1 dark:text-gray-400 leading-tight">
                                <span className="font-bold">{eventTime}</span> • {eventDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                            {event.organisation && (
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {event.organisation.name}
                                </p>
                            )}
                            <p className="text-gray-600 dark:text-gray-400 text-sm whitespace-pre-wrap">
                                {event.description ?? ''}
                            </p>
                        </div>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}