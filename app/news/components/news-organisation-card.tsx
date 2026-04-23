import Image from "next/image";
import Link from "next/link";
import { NewsOrganisation } from "@/lib/interfaces/news/news-organisation";

interface NewsOrganisationCardProps {
	organisation: NewsOrganisation;
}

export function NewsOrganisationCard({ organisation }: NewsOrganisationCardProps) {
	return (
		<Link
			href={`/organisations/${organisation.slug}/news`}
			className="group flex items-center gap-3 rounded-lg border border-gray-200 bg-white/90 px-3 py-2 transition-colors hover:bg-gray-50 dark:border-[rgba(185,114,114,0.35)] dark:bg-[rgba(40,23,25,0.9)] dark:hover:bg-[rgba(55,32,35,0.95)]"
		>
			<div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-md bg-gray-100 dark:bg-[rgb(50,28,31)]">
				{organisation.icon ? (
					<Image
						src={`https://cdn.studentcouncil.dk/${organisation.icon}`}
						alt={organisation.name}
						fill
						sizes="40px"
						className="object-cover"
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center text-sm font-semibold text-gray-500 dark:text-gray-300">
						{organisation.name.charAt(0).toUpperCase()}
					</div>
				)}
			</div>
			<p className="line-clamp-1 flex-1 text-sm font-medium text-gray-800 dark:text-gray-100">
				{organisation.name}
			</p>
			<div className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600 dark:bg-[rgb(50,28,31)] dark:text-gray-300">
				{organisation.count}
			</div>
		</Link>
	);
}
