import Image from "next/image";
import Link from "next/link";
import * as motion from "motion/react-client";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Organisation } from "@/lib/interfaces/organisations/organisation";
import { CategoryBadge } from "./category-badge";

interface OrganisationCardProps {
    organisation: Organisation;
}

export function OrganisationCard({ organisation }: OrganisationCardProps) {
    return (
        <Link href={`/organisations/${organisation.slug}`} scroll>
            <motion.div
                className="block group border border-gray-200 dark:border-[rgba(185,114,114,0.35)] dark:bg-[rgba(40,23,25,0.9)] rounded-xl overflow-hidden"
                whileHover={{ 
                    scale: 1.03, 
                    y: -8,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
            >
                <div className="w-full h-48 bg-gray-200 dark:bg-[rgb(50,28,31)] flex items-center justify-center overflow-hidden relative">
                <Image 
                    src={"https://cdn.studentcouncil.dk/" + organisation.banner} 
                    alt={organisation.name}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="relative">
                <div className="absolute -top-8 right-4 w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg z-10">
                    <Image 
                        src={"https://cdn.studentcouncil.dk/" + organisation.icon}
                        alt={`${organisation.name} icon`}
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
            <Card className="cursor-pointer transition-shadow rounded-none border-0 pt-0 dark:bg-[rgba(40,23,25,0.9)]">
                <CardHeader className="pb-2 pt-10 pl-8 pr-8">
                    <CardTitle className="text-2xl font-extrabold group-hover:underline">
                        {organisation.name}
                    </CardTitle>
                    <CardDescription className="overflow-hidden text-ellipsis line-clamp-3" style={{ lineHeight: '1.5', minHeight: 'calc(1.5 * 0.875rem * 3)' }}>
                        {organisation.description || ''}
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <div className="flex w-full flex-wrap gap-2">
                          { /* Show a badge with organisation category and colour it based on category id */
                            organisation.category?.name &&
                            <CategoryBadge category={organisation.category}/>
                          }
                          {/* For future tags <Badge>Tag</Badge>*/}
                    </div>
                </CardFooter>
            </Card>
            </motion.div>
        </Link>
    );
}

