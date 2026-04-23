import { News } from "@/lib/interfaces/news/news";
import Image from "next/image";
import NewsMDX from "./components/news-mdx";

async function getNewsArticle(id: number): Promise<News | null> {
    try {
        // Fetch directly from the external API
        const response = await fetch(`https://api.studentcouncil.dk/query/v1/news/${id}`, {
            next: { revalidate: 3600 } // Cache for 1 hour
        });
        
        if (!response.ok) {
            console.error(`API returned ${response.status}`);
            return null;
        }
        
        const data = await response.json();
        console.log('API response:', data);
        return data;
    } catch (error) {
        console.error("Failed to fetch news:", error);
        return null;
    }
}

export default async function NewsPage({ params }: { params: { identifier: string } }) {
  const news = await getNewsArticle(parseInt(params.identifier));
  
  if (!news) {
    return (
      <div className="container mx-auto px-4 py-8 mt-20">
        <h1 className="text-3xl font-bold">News article not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        {news.banner && (
          <div className="w-full h-64 sm:h-80 md:h-96 relative rounded-lg overflow-hidden mb-8">
            <Image 
              src={`https://cdn.studentcouncil.dk/${news.banner}`} 
              alt={news.title}
              fill
              sizes="(min-width: 1024px) 896px, 100vw"
              quality={90}
              className="object-cover"
              priority
            />
          </div>
        )}
        
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{news.title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
            {news.description}
          </p>
          {news.publishedAt && (
            <p className="text-s text-gray-500 dark:text-gray-400">
              Published on {new Date(news.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          )}
        </header>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <NewsMDX contentPath={news.contentPath} />
        </div>
      </article>
    </div>
  );
}