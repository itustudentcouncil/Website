import { Project } from "@/lib/interfaces/projects/project";
import ProjectsTimeline from "./components/projects-timeline";

async function getProjects(): Promise<Project[]> {
    try {
        // Fetch directly from the external API
        const response = await fetch("https://api.studentcouncil.dk/query/v1/projects", {
            next: { revalidate: 3 } // Cache for 1 hour
        });
        
        if (!response.ok) {
            console.error(`API returned ${response.status}`);
            return [];
        }
        
        const data = await response.json();
        console.log('API response:', data);
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Failed to fetch projects:", error);
        return [];
    }
}

function groupProjectsByHalfYear(projects: Project[]) {
    console.log('All projects:', projects);
    // Log first project to see structure
    if (projects.length > 0) {
        console.log('First project details:', {
            title: projects[0].title,
            isOngoing: projects[0].isOngoing,
            endDate: projects[0].endDate,
            endDate_type: typeof projects[0].endDate
        });
    }
    const ongoingProjects = projects.filter(project => project.isOngoing);
    // Filter out ongoing projects or those with null endDate
    const completedProjects = projects.filter(
        project => !project.isOngoing && project.endDate
    );

    // Group by half-year periods
    const grouped = new Map<string, Project[]>();
    
    completedProjects.forEach(project => {
        const endDate = new Date(project.endDate!);
        const year = endDate.getFullYear();
        const month = endDate.getMonth() + 1;
        const half = month <= 6 ? 'Spring' : 'Fall';
        const key = `${half} ${year}`;
        
        if (!grouped.has(key)) {
            grouped.set(key, []);
        }
        grouped.get(key)!.push(project);
    });

    // Sort each group by end date (most recent first)
    grouped.forEach(projectList => {
        projectList.sort((a, b) => {
            const dateA = new Date(a.endDate!).getTime();
            const dateB = new Date(b.endDate!).getTime();
            return dateB - dateA; // Newest first
        });
    });

    // Convert to array and alternate sides
    const timelineGroups = Array.from(grouped.entries()).map(([period, projects], index) => ({
        period,
        projects,
        side: (index % 2 === 1 ? 'left' : 'right') as 'left' | 'right'
    }));

    if (ongoingProjects.length > 0) {
        timelineGroups.unshift({
            period: 'Ongoing',
            projects: ongoingProjects,
            side: 'left'
        });
    }

    return timelineGroups;
}

export default async function ProjectsPage() {
	const projects = await getProjects();
    const timelineGroups = groupProjectsByHalfYear(projects);

	return (
        <div>
            <ProjectsTimeline groups={timelineGroups} />
        </div>
    );
}
