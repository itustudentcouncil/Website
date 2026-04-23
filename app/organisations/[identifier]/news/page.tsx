import * as motion from "motion/react-client";
import { News } from "@/lib/interfaces/news/news";
import { BigNewsCard } from "@/app/news/components/big-news-card";
import { NewsCard } from "@/app/news/components/news-card";

async function getOrganisationNews(id: string): Promise<News[]> {
  try {
    const response = await fetch(`https://api.studentcouncil.dk/query/v1/organisations/${id}/news`, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      console.error(`API returned ${response.status}`);
      return [];
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Failed to fetch organisation news:", error);
    return [];
  }
}

export default async function OrganisationNewsPage({ params }: { params: Promise<{ identifier: string }> }) {
  const { identifier } = await params;
  const news = await getOrganisationNews(identifier);

  if (news.length === 0) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-10 text-center"
      >
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Nothing here yet</h2>
        <p className="mt-3 text-gray-600 dark:text-gray-300">There is no news posted for this Student Organisation.</p>
      </motion.section>
    );
  }

  return (
    <>
      {/* Desktop Layout */}
      <motion.div
         className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-[420px]"
        layout
      >
        {/* First news - Big card spanning 2 columns on desktop */}
        <motion.div
           className="md:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <BigNewsCard news={news[0]} />
        </motion.div>

        {/* Remaining news cards - 1 per column, 2 per row on desktop */}
        {news.slice(1).map((item, index) => (
          <motion.div
            key={item.id || `news-${index}`}
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
      </motion.div>
    </>
  );
}
