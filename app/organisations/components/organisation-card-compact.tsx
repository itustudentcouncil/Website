import Image from "next/image";
import Link from "next/link";
import * as motion from "motion/react-client";
import { Organisation } from "@/lib/interfaces/organisations/organisation";
import { CategoryBadge } from "./category-badge";

interface OrganisationCardCompactProps {
    organisation: Organisation;
}

export function OrganisationCardCompact({ organisation }: OrganisationCardCompactProps) {
    return (
        <Link href={`/organisations/${organisation.slug}`} scroll>
            <motion.div 
                className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 dark:border-[rgba(185,114,114,0.35)] dark:bg-[rgba(40,23,25,0.9)] bg-white hover:shadow-lg transition-all duration-200 hover:scale-105 w-[320px]"
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1, ease: "easeOut" }}
            >
                {/* Left side - Organisation Icon */}
                <div className="relative flex-shrink-0 w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 dark:border-[rgba(185,114,114,0.5)]">
                    <Image 
                        src={"https://cdn.studentcouncil.dk/" + organisation.icon}
                        alt={`${organisation.name} icon`}
                        fill
                        className="object-cover"
                    />
                </div>
                
                {/* Right side - Organisation Info */}
                <div className="flex-1 min-w-0 flex flex-col items-start">
                    <h3 className="font-bold text-sm text-neutral-800 dark:text-neutral-200 truncate mb-1 w-full text-left">
                        {organisation.name}
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-2 text-left w-full overflow-hidden text-ellipsis line-clamp-2" style={{ lineHeight: '1.5', minHeight: 'calc(1.5 * 0.75rem * 2)' }}>
                        {organisation.description || ''}
                    </p>
                    <div className="self-start">
                        {organisation.category?.name && (
                            <CategoryBadge category={organisation.category} />
                        )}
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
