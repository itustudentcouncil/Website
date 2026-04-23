import { Event } from "@/lib/interfaces/events/event";
import { WeeklyEvent } from "@/lib/interfaces/events/weekly-event";
import * as motion from "motion/react-client";
import { EventCard } from "./components/event-card";
import { WeeklyEventsList } from "./components/weekly-events-list";

const headerText = "Events";
const descText = "Discover upcoming events and weekly activities from the Student Council and student organisations";

async function getEvents(): Promise<Event[]> {
    try {
        const response = await fetch("https://api.studentcouncil.dk/query/v1/events", {
            next: { revalidate: 3600 } // Cache for 1 hour
        });
        
        if (!response.ok) {
            console.error(`API returned ${response.status}`);
            return [];
        }
        
        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Failed to fetch events:", error);
        return [];
    }
}

async function getWeeklyEvents(): Promise<WeeklyEvent[]> {
    try {
        // Fetch directly from the external API
        const response = await fetch("https://api.studentcouncil.dk/query/v1/weekly-events", {
            next: { revalidate: 3600 } // Cache for 1 hour
        });
        
        if (!response.ok) {
            console.error(`API returned ${response.status}`);
            return [];
        }
        
        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Failed to fetch weekly events:", error);
        return [];
    }
}

export default async function EventsPage() {
	const events = await getEvents();
	const weeklyEvents = await getWeeklyEvents();
	
	// Filter for upcoming events only
	const upcomingEvents = events.filter(event => {
		const eventDate = new Date(event.date);
		return eventDate >= new Date();
	}).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

	return (
		<div>
			<header>
				<div className="px-6 sm:px-16 pt-4 sm:pt-16">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3, ease: "easeOut" }}>
						<header className="text-4xl font-bold mb-4">
							{headerText}
						</header>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}>
						<p className="text-xl text-gray-600 dark:text-gray-300">
							{descText}
						</p>
					</motion.div>
				</div>
			</header>
			<main className="pt-8 px-6 sm:px-16 pb-8">
				<div className="max-w-7xl mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						{/* Weekly Events - Left Side */}
						<motion.div
							className="lg:col-span-1"
							initial={{ opacity: 0, x: -30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
						>
							<h2 className="text-2xl font-bold mb-4">Weekly Schedule</h2>
							{weeklyEvents.length > 0 ? (
								<WeeklyEventsList weeklyEvents={weeklyEvents} />
							) : (
								<div className="text-center text-gray-500 py-8 rounded-lg border border-gray-200 dark:border-[rgba(185,114,114,0.35)] bg-white dark:bg-[rgba(40,23,25,0.9)]">
									No weekly events scheduled
								</div>
							)}
						</motion.div>

						{/* Upcoming Events - Right Side */}
						<motion.div
							className="lg:col-span-2"
							initial={{ opacity: 0, x: 30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
						>
							<h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
							{upcomingEvents.length > 0 ? (
								<div className="space-y-4">
									{upcomingEvents.map((event, index) => (
										<motion.div
											key={event.id}
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{
												duration: 0.3,
												ease: "easeOut",
												delay: 0.3 + index * 0.05
											}}
										>
											<EventCard event={event} />
										</motion.div>
									))}
								</div>
							) : (
								<div className="text-center text-gray-500 py-12 rounded-lg border border-gray-200 dark:border-[rgba(185,114,114,0.35)] bg-white dark:bg-[rgba(40,23,25,0.9)]">
									No upcoming events
								</div>
							)}
						</motion.div>
					</div>
				</div>
			</main>
		</div>
	);
}
