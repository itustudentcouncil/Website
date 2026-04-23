"use client"
import { useState } from "react"
import * as motion from "motion/react-client"
import { AnimatePresence } from "motion/react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrganisationCard } from "./organisation-card"
import { Category } from "@/lib/interfaces/organisations/category"
import { Organisation } from "@/lib/interfaces/organisations/organisation"

interface OrganisationsClientProps {
    organisations: Organisation[];
    categories: Category[];
}

const DEFAULT_ALL_CATEGORY = "All"; // id + name for default category that shows all organisations

export function OrganisationsClient({ organisations, categories }: OrganisationsClientProps) {
    // const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState(DEFAULT_ALL_CATEGORY);

    return (
        <main className="pt-8 px-6 sm:px-16">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
                    className="w-full md:flex-1"
                >
                    <Tabs defaultValue={DEFAULT_ALL_CATEGORY} onValueChange={setSelectedCategoryId}>
                        <TabsList variant="line" className="w-full md:w-fit">
                            <TabsTrigger key={DEFAULT_ALL_CATEGORY} value={DEFAULT_ALL_CATEGORY}>All</TabsTrigger>
                            {/* Load all other categories from API in tabs */}
                            {categories.map((category: Category) => (
                                <TabsTrigger key={category.id} value={category.id.toString()}>{category.name}</TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                    {/* Show selected category description if a category is selected */}
                    {selectedCategoryId !== DEFAULT_ALL_CATEGORY && (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedCategoryId} 
                                layout
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="mt-3 px-4 py-2 rounded-lg bg-primary/5 dark:bg-primary/10 border border-primary/20 dark:border-primary/20"
                            >
                                <p className="text-sm text-primary dark:text-primary/100">
                                    {categories.find(category => category.id.toString() === selectedCategoryId)?.description}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    )}

                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
                    className="w-full md:w-auto"
                >
                    <div className="relative w-full md:w-64">
                       {/* <Input
                            type="search"
                            placeholder="Search organisations..."
                            autoComplete="off"
                            className="w-full px-4 py-2 pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M21 21l-4.35-4.35"/>
                            </svg>
                        </span> */}
                    </div>
                </motion.div>
            </div>
            <div className="w-full">
                <motion.div 
                    className="pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                    layout
                >
                    <AnimatePresence mode="popLayout">
                        {organisations.length > 0 ? (
                           organisations
                            .filter(org => selectedCategoryId === DEFAULT_ALL_CATEGORY || org.category?.id.toString() === selectedCategoryId)
                            .map((org, index) => (
                                <motion.div
                                    key={org.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: index * 0.05,
                                        ease: "easeOut",
                                        layout: { duration: 0.3, ease: "easeOut" }
                                    }}
                                >
                                    <OrganisationCard organisation={org} />
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                key="no-results"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="col-span-full text-center text-gray-500"
                            >
                                No organisations found
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </main>
    );
}