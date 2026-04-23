'use client';

import { WeeklyEvent } from "@/lib/interfaces/events/weekly-event";
import Image from "next/image";
import * as motion from "motion/react-client";

interface WeeklyEventsListProps {
    weeklyEvents: WeeklyEvent[];
}

const DAYS_OF_WEEK = [
    { id: 1, name: 'Monday', short: 'Mon' },
    { id: 2, name: 'Tuesday', short: 'Tue' },
    { id: 3, name: 'Wednesday', short: 'Wed' },
    { id: 4, name: 'Thursday', short: 'Thu' },
    { id: 5, name: 'Friday', short: 'Fri' },
    { id: 6, name: 'Saturday', short: 'Sat' },
    { id: 7, name: 'Sunday', short: 'Sun' },
];

export function WeeklyEventsList({ weeklyEvents }: WeeklyEventsListProps) {
    // Group events by day of week
    const eventsByDay = DAYS_OF_WEEK.map(day => ({
        ...day,
        events: weeklyEvents.filter(event => event.dayOfWeek === day.id)
    }));

    // Get current day of week (1 = Monday, 7 = Sunday)
    const today = new Date();
    const currentDayOfWeek = today.getDay() === 0 ? 7 : today.getDay();

    return (
        <div className="space-y-4">
            {eventsByDay.map((day, dayIndex) => (
                day.events.length > 0 && (
                    <motion.div
                        key={day.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut", delay: dayIndex * 0.05 }}
                        className={`rounded-lg border overflow-hidden ${
                            day.id === currentDayOfWeek
                                ? 'border-primary dark:border-primary/60 bg-primary/5 dark:bg-primary/10 ring-2 ring-primary/20 dark:ring-primary/30'
                                : 'border-gray-200 dark:border-[rgba(185,114,114,0.35)] bg-white dark:bg-[rgba(40,23,25,0.9)]'
                        }`}
                    >
                        <div className={`px-4 py-2 border-b ${
                            day.id === currentDayOfWeek
                                ? 'bg-primary/10 dark:bg-primary/20 border-primary/20 dark:border-primary/40'
                                : 'bg-gray-50 dark:bg-[rgba(50,28,31,0.6)] border-gray-200 dark:border-[rgba(185,114,114,0.25)]'
                        }`}>
                            <h3 className={`font-bold text-sm ${
                                day.id === currentDayOfWeek
                                    ? 'text-primary dark:text-primary/90'
                                    : 'text-gray-900 dark:text-gray-100'
                            }`}>
                                {day.name} {day.id === currentDayOfWeek && '(Today)'}
                            </h3>
                        </div>
                        <div className="divide-y divide-gray-200 dark:divide-[rgba(185,114,114,0.25)]">
                            {day.events.map((event, eventIndex) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.2, delay: dayIndex * 0.05 + eventIndex * 0.02 }}
                                    className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-[rgba(50,28,31,0.4)] transition-colors"
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-sm text-gray-900 dark:text-gray-100 truncate">
                                                {event.name}
                                            </p>
                                            {event.organisation && (
                                                <div className="flex items-center gap-2 mt-1.5">
                                                    {event.organisation.icon && (
                                                        <div className="relative w-7 h-7 rounded-full overflow-hidden border border-gray-200 dark:border-[rgba(185,114,114,0.5)]">
                                                            <Image 
                                                                src={`https://cdn.studentcouncil.dk/${event.organisation.icon}`}
                                                                alt={event.organisation.name}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                    )}
                                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        {event.organisation.name}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-shrink-0 text-right">
                                            <p className="text-sm font-medium text-primary dark:text-primary/90">
                                                {event.time.split(':').slice(0, 2).join(':')}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )
            ))}
        </div>
    );
}
