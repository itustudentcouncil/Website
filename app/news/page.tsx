import { News } from "@/lib/interfaces/news/news";
import * as motion from "motion/react-client"
import { BigNewsCard } from "./components/big-news-card";
import { NewsCard } from "./components/news-card";
import { NewsOrganisation } from "@/lib/interfaces/news/news-organisation";
import { NewsOrganisationCard } from "./components/news-organisation-card";
import { NewsOrganisationsDrawer } from "./components/news-organisations-drawer";

const headerText = "News";
const descText = "The latest news from the Student Council and your favourite student organisations";

async function getAllNews(): Promise<News[]> {
    try {
        // Fetch directly from the external API
        const response = await fetch("https://api.studentcouncil.dk/query/v1/news", {
            next: { revalidate: 3600 } // Cache for 1 hour
        });
        
        if (!response.ok) {
            console.error(`API returned ${response.status}`);
            return [];
        }
        
        const data = await response.json();
        console.log('API response:', data);
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Failed to fetch news:", error);
        return [];
    }
}

async function getNewsOrganisations(): Promise<NewsOrganisation[]> {
    try {
        // Fetch directly from the external API
        const response = await fetch("https://api.studentcouncil.dk/query/v1/news/organisations", {
            next: { revalidate: 3600 } // Cache for 1 hour
        });
        
        if (!response.ok) {
            console.error(`API returned ${response.status}`);
            return [];
        }
        
        const data = await response.json();
        console.log('API response:', data);
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Failed to fetch news:", error);
        return [];
    }
}

export default async function NewsPage() {
    const news = await getAllNews();
    const newsOrganisations = await getNewsOrganisations();
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
            <main className="pt-8 px-4 pb-8">
                <div className="max-w-7xl mx-auto">
                    {news.length > 0 ? (
                        <>
                            <motion.div
                                className="hidden xl:grid grid-cols-3 gap-6 auto-rows-[420px]"
                                layout
                            >
                                {/* First news - Big card spanning 2 columns and 1 row */}
                                <motion.div
                                    className="col-span-2 row-span-1"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                >
                                    <BigNewsCard news={news[0]} />
                                </motion.div>

                                {/* Second news - Regular card in column 3, rows 1-2 */}
                                {news.length > 1 && (
                                    <motion.div
                                        style={{
                                            gridColumn: 3,
                                            gridRow: '1 / 2'
                                        }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
                                    >
                                        <NewsCard news={news[1]} />
                                    </motion.div>
                                )}

                                {/* Remaining news cards - 2 per row in columns 1 and 2 only */}
                                {news.slice(2).map((item, index) => (
                                    <motion.div
                                        key={index}
                                        style={{
                                            gridColumn: (index % 2) === 0 ? 1 : 2,
                                            gridRow: 2 + Math.floor(index / 2)
                                        }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.3,
                                            ease: "easeOut",
                                            delay: 0.1 + (index + 1) * 0.05
                                        }}
                                    >
                                        <NewsCard news={item} />
                                    </motion.div>
                                ))}

                                {newsOrganisations.length > 0 && (
                                    <motion.aside
                                        style={{
                                            gridColumn: 3,
                                            gridRowStart: 2
                                        }}
                                        className="self-start"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, ease: "easeOut", delay: 0.15 }}
                                    >
                                        <div className="rounded-lg border border-gray-200 bg-white/90 p-4 dark:border-[rgba(185,114,114,0.35)] dark:bg-[rgba(40,23,25,0.9)]">
                                            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">
                                                Recent news by Student Organisations:
                                            </h3>
                                            <div className="max-h-[calc(420px*2+1.5rem)] space-y-2 overflow-y-auto pr-1">
                                                {newsOrganisations.map((organisation) => (
                                                    <NewsOrganisationCard
                                                        key={organisation.id}
                                                        organisation={organisation}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </motion.aside>
                                )}
                            </motion.div>

                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-[420px] xl:hidden"
                                layout
                            >
                                <motion.div
                                    className="md:col-span-2"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                >
                                    <BigNewsCard news={news[0]} />
                                </motion.div>

                                {news.slice(1).map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.3,
                                            ease: "easeOut",
                                            delay: 0.1 + index * 0.05
                                        }}
                                    >
                                        <NewsCard news={item} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </>
                    ) : (
                        <motion.div
                            className="text-center text-gray-500 py-12"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            No news articles found
                        </motion.div>
                    )}
                </div>
                <NewsOrganisationsDrawer organisations={newsOrganisations} />
            </main>
        </div>
	);
}
