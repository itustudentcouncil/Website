import { WeeklyEvent } from "@/lib/interfaces/events/weekly-event";
import { OrganisationMember } from "@/lib/interfaces/organisations/organisation-member";
import { WeeklyEventsList } from "@/app/events/components/weekly-events-list";
import { OrganisationMembersCard } from "./components/organisation-members-card";
import { Event } from "@/lib/interfaces/events/event";
import { EventCard } from "@/app/events/components/event-card";

async function getMembers(id: string): Promise<OrganisationMember[]> {
    try {
        const response = await fetch(`https://api.studentcouncil.dk/query/v1/organisations/${id}/members`, {
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            console.error(`API returned ${response.status}`);
            return [];
        }

        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Failed to fetch members:", error);
        return [];
    }
}

async function getUpcomingEvents(id: string): Promise<Event[]> {
    try {
        const response = await fetch(`https://api.studentcouncil.dk/query/v1/organisations/${id}/events?filter=0`, {
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

async function getPastEvents(id: string): Promise<Event[]> {
    try {
        const response = await fetch(`https://api.studentcouncil.dk/query/v1/organisations/${id}/events?filter=1`, {
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

async function getWeeklyEvents(id: string): Promise<WeeklyEvent[]> {
    try {
        // Fetch directly from the external API
        const response = await fetch(`https://api.studentcouncil.dk/query/v1/organisations/${id}/weekly-events`, {
            next: { revalidate: 0 } // Cache for 1 hour
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

export default async function OrganisationHomePage({ params }: { params: Promise<{ identifier: string }> }) {
    const { identifier } = await params;
    const [members, upcomingEvents, pastEvents, weeklyEvents] = await Promise.all([
        getMembers(identifier),
        getUpcomingEvents(identifier),
        getPastEvents(identifier),
        getWeeklyEvents(identifier)
    ]);

    const hasWeeklyEvents = weeklyEvents.length > 0;
    const hasMembers = members.length > 0;
    const hasUpcomingEvents = upcomingEvents.length > 0;
    const hasPastEvents = pastEvents.length > 0;
    const hasLeftContent = hasWeeklyEvents || hasMembers;
    const hasAnyEvents = hasUpcomingEvents || hasPastEvents;

    if (!hasLeftContent && !hasAnyEvents) {
        return (
            <section className="py-10 text-center">
                <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Nothing here yet</h2>
                <p className="mt-3 text-gray-600 dark:text-gray-300">
                    There are no upcoming or past events to show here yet
                </p>
            </section>
        );
    }

    return (
        <div className={`grid grid-cols-1 gap-8 ${hasLeftContent && hasAnyEvents ? "md:grid-cols-2" : ""}`}>
            {hasLeftContent && (
                <div className="flex flex-col gap-8">
                    {hasWeeklyEvents && (
                        <section>
                            <h2 className="mb-4 text-2xl font-bold">Weekly Events</h2>
                            <WeeklyEventsList weeklyEvents={weeklyEvents} />
                        </section>
                    )}

                    {hasMembers && <OrganisationMembersCard members={members} />}
                </div>
            )}

            {hasAnyEvents && (
                <div className="flex flex-col gap-8">
                    {hasUpcomingEvents && (
                        <section aria-labelledby="upcoming-events-heading">
                            <h2
                                id="upcoming-events-heading"
                                className="mb-4 text-2xl font-bold text-neutral-900 dark:text-neutral-100"
                            >
                                Upcoming events
                            </h2>
                            <div className="space-y-4">
                                {upcomingEvents.map((event, index) => (
                                    <EventCard key={event.id || `upcoming-${index}`} event={event} />
                                ))}
                            </div>
                        </section>
                    )}

                    {hasPastEvents && (
                        <section aria-labelledby="past-events-heading">
                            <h2
                                id="past-events-heading"
                                className="mb-4 text-2xl font-bold text-neutral-900 dark:text-neutral-100"
                            >
                                Past events
                            </h2>
                            <div className="space-y-4">
                                {pastEvents.map((event, index) => (
                                    <EventCard key={event.id || `past-${index}`} event={event} />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            )}
        </div>
    );
}
