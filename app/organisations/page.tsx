import * as motion from "motion/react-client"
import { OrganisationForms } from "@/app/organisations/components/organisation-forms";
import { OrganisationsClient } from "./components/organisations-client";
import { Organisation } from "@/lib/interfaces/organisations/organisation";
import { Category } from "@/lib/interfaces/organisations/category";

const headerText = "Student Organisations";
const descText = "Explore the various student organisations at ITU. Get involved and make a difference!";

async function getOrganisations(): Promise<Organisation[]> {
    try {
        // Fetch directly from the external API
        const response = await fetch("https://api.studentcouncil.dk/query/v1/organisations", {
            next: { revalidate: 3600 } // Cache for 1 hour
        });
        
        if (!response.ok) {
            console.error(`API returned ${response.status}`);
            return [];
        }
        
        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Failed to fetch organisations:", error);
        return [];
    }
}

async function getOrganisationCategories(): Promise<Category[]> {
    try {
        // Fetch directly from the external API
        const response = await fetch("https://api.studentcouncil.dk/query/v1/organisations/categories", {
            next: { revalidate: 3600 } // Cache for 1 hour
        });
        
        if (!response.ok) {
            console.error(`API returned ${response.status}`);
            return [];
        }
        
        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Failed to fetch organisation categories:", error);
        return [];
    }
}

export default async function OrganisationsPage() {
    const organisations = await getOrganisations();
    const categories = await getOrganisationCategories();

    return (
        <div className="pb-8 sm:pb-16">
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
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}>
                        <OrganisationForms />
                    </motion.div>
                </div>
            </header>
            <OrganisationsClient organisations={organisations} categories={categories}/>
        </div>
    );
}
