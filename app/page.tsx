import { Banner } from "@/components/banner";
import * as motion from "motion/react-client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { CalendarIcon, FileTextIcon } from "@radix-ui/react-icons";
import EmailLink from "@/components/glowui/Link/types/EmailLink";
import { ReadMoreArrow } from "@/components/read-more-arrow";
import { Highlighter } from "@/components/ui/highlighter";
import { LayoutDashboard, Users2Icon, Banknote, Plus } from "lucide-react";
import { News } from "@/lib/interfaces/news/news";
import { Calendar } from "@/components/ui/calendar";
import { IconCloud } from "@/components/ui/icon-cloud";
import { WeeklyEvent } from "@/lib/interfaces/events/weekly-event";
import { Organisation } from "@/lib/interfaces/organisations/organisation";
import { Marquee } from "@/components/ui/marquee";
import { OrganisationCardCompact } from "./organisations/components/organisation-card-compact";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { OrganisationMember } from "@/lib/interfaces/organisations/organisation-member";

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

async function getLatestStudentCouncilNews(): Promise<News | null> {
    try {
        // Fetch directly from the external API
        const response = await fetch("https://api.studentcouncil.dk/query/v1/organisations/9/news", { // 9 = student council id
            next: { revalidate: 3 } // Cache for 1 hour
        });
        
        if (!response.ok) {
            console.error(`API returned ${response.status}`);
            return null;
        }
        
        const data = await response.json();
        console.log('API response:', data);
        return Array.isArray(data) ? data[0] : null;
    } catch (error) {
        console.error("Failed to fetch news:", error);
        return null;
    }
}

async function getWeeklyEvents(): Promise<WeeklyEvent[]> {
    try {
        const response = await fetch("https://api.studentcouncil.dk/query/v1/weekly-events", {
            next: { revalidate: 3600 }
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

async function getStudentCouncilMembers(): Promise<OrganisationMember[]> {
    try {
        const response = await fetch("https://api.studentcouncil.dk/query/v1/organisations/9/members", {
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

export default async function Home() {
  const [organisations, news, weeklyEvents, members] = await Promise.all([
    getOrganisations(),
    getLatestStudentCouncilNews(),
    getWeeklyEvents(),
    getStudentCouncilMembers()
  ]);

  // Randomly select up to 20 organisations for the icon cloud
  const shuffled = [...organisations].sort(() => Math.random() - 0.5);
  const selectedOrganisations = shuffled.slice(0, 25);
  const dashboardOrganisations = selectedOrganisations.slice(0, 2);
  const dashboardWeeklyEvents = weeklyEvents.slice(0, 2);
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const formatWeeklyTime = (time: string) => time.split(":").slice(0, 2).join(":");
  const PRESIDENT_ID = "63ccbdf9-e049-4665-918d-aad355d305bf";
  const TREASURER_ID = "97efd96d-925b-441c-a42a-56a58d5cda76";
  const SECRETARY_ID = "9f9e125e-b0b7-4127-8cde-6dda37af14a7";
  const getMemberLabel = (memberId: string) => {
    if (memberId === PRESIDENT_ID) {
      return "President";
    }

    if (memberId === TREASURER_ID) {
      return "Treasurer";
    }

    if (memberId === SECRETARY_ID) {
      return "Secretary";
    }

    return "Executive member";
  };
  const sortedMembers = [...members].sort((a, b) => {
    if (a.accountId === PRESIDENT_ID) {
      return -1;
    }

    if (b.accountId === PRESIDENT_ID) {
      return 1;
    }

    return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
  });

  return (
    <div className="font-sans flex flex-col overflow-x-hidden">
      {/* First Section - Initially Visible */}
      <section className="min-h-screen p-4 pb-20 sm:p-8 xl:p-20 flex flex-col">
        <main className="flex flex-col xl:flex-row flex-1 w-full gap-8 xl:gap-16">
          {/* Left side: Shows Student Council banner */}
          <div className="flex flex-col items-center w-full xl:w-1/3 xl:min-w-[300px]">
            <div className="flex flex-col items-center gap-4">
              <Banner />
              <motion.p 
                className="text-center text-gray-600 dark:text-gray-300 max-w-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                We are the{" "}
                <Highlighter action="underline" color="#F37272">
                  voice of the students
                </Highlighter>{" "}
                 at the <br/> IT University of Copenhagen
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <EmailLink href="mailto:board@studentcouncil.dk" color="#f37272">
                  <div style={{ transform: 'translateY(1px)' }}>
                    Contact Us
                  </div>
                </EmailLink>
              </motion.div>
              {/* Read More Arrow - placed directly under Contact Us */}
              <motion.div
                className="hidden xl:block mt-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <ReadMoreArrow targetId="second-section" />
              </motion.div>
            </div>
          </div>
          {/* Right side: Masonry (Pinterest) style layout */}
          <motion.div
            className="flex-1 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <BentoGrid>
              <BentoCard 
                name={news != null ? news.title : "News"}
                description={news != null ? news.description : "The latest news from the Student Council and your favourite student organisations"}
                href={news != null ? "/news/" + news.id : "/news"}
                cta="Read more" 
                className="col-span-1 md:col-span-2 xl:col-span-2"
                Icon={FileTextIcon}
                blur={true}
                background={
                  <img 
                    className="absolute inset-0 w-full h-full object-cover opacity-80" 
                    src={"https://cdn.studentcouncil.dk/" + news?.banner}
                    alt={news?.title || "News banner"}
                  />
                }
              />
              <BentoCard 
                name="Organisations" 
                description="Communities led by the Students" 
                href="/organisations" 
                cta="Browse Student Organisations" 
                className="col-span-1 md:col-span-1 xl:col-span-1"
                Icon={Users2Icon}
                background={
                  <div className="absolute inset-0 flex items-start justify-center opacity-60 -mt-12 sm:-mt-16">
                    <div className="scale-[0.85] sm:scale-95">
                      <IconCloud images={selectedOrganisations.map(
                        (organisation) => "https://cdn.studentcouncil.dk/" + organisation.icon
                      )} />
                    </div>
                  </div>
                }
              />
              <BentoCard 
                name="Events" 
                description="Explore events organised by the Students" 
                href="/events" 
                cta="See upcoming events" 
                className="col-span-1 md:col-span-1 xl:col-span-1"
                Icon={CalendarIcon}
                background={
                  <Calendar
                    mode="single"
                    selected={new Date(Date.now())}
                    className="absolute top-4 sm:top-10 right-0 origin-top scale-75 sm:scale-85 rounded-md border [mask-image:linear-gradient(to_top,transparent_20%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-90"
                  />
                }
              />
              <BentoCard 
                name="Dashboard" 
                description="Manage your Student Organisations, News posts and profile here" 
                href="/" 
                cta="Go to dashboard" 
                className="col-span-1 md:col-span-2 xl:col-span-2"
                Icon={LayoutDashboard}
                background={
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-100/40 via-sky-50/30 to-rose-200/40 dark:from-slate-900/15 dark:via-sky-900/10 dark:to-rose-700/20" />
                    <div className="absolute -top-10 -left-10 h-36 w-36 rounded-full bg-sky-400/25 blur-2xl dark:bg-sky-400/15" />
                    <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-rose-400/30 blur-2xl dark:bg-rose-500/20" />

                    <div className="absolute left-4 top-5 hidden sm:flex items-center gap-2 rounded-md border border-sky-300/50 bg-sky-50/60 px-3 py-1.5 backdrop-blur-sm dark:border-white/20 dark:bg-white/10">
                      <LayoutDashboard className="h-3.5 w-3.5 text-sky-600 dark:text-sky-100" />
                      <span className="text-xs text-sky-700 dark:text-sky-50">Control center</span>
                    </div>

                    <div className="absolute right-4 top-5 hidden sm:flex flex-col gap-2 opacity-90">
                      <div className="flex items-center gap-2 rounded-md border border-sky-300/50 bg-sky-50/60 px-3 py-1.5 backdrop-blur-sm dark:border-white/20 dark:bg-white/10">
                        <span className="h-2 w-2 rounded-full bg-sky-500 dark:bg-sky-300" />
                        <span className="text-xs text-sky-700 dark:text-sky-50">Org management</span>
                      </div>
                    </div>

                    <div className="absolute top-20 left-4 w-[40%] hidden sm:grid grid-cols-2 gap-2">
                      <div className="rounded-md border border-sky-200/70 bg-sky-50/70 px-3 py-2 backdrop-blur-sm dark:border-white/20 dark:bg-white/10">
                        <p className="text-[10px] uppercase tracking-wide text-sky-600 dark:text-sky-100/80">Organisation</p>
                        <p className="text-sm font-semibold text-sky-800 truncate dark:text-sky-50">
                          {dashboardOrganisations[0]?.name ?? "No organisation"}
                        </p>
                      </div>
                      <div className="rounded-md border border-rose-200/70 bg-rose-50/70 px-3 py-2 backdrop-blur-sm dark:border-white/20 dark:bg-white/10">
                        <p className="text-[10px] uppercase tracking-wide text-rose-600 dark:text-rose-100/90">Organisation</p>
                        <p className="text-sm font-semibold text-rose-800 truncate dark:text-rose-50">
                          {dashboardOrganisations[1]?.name ?? "No organisation"}
                        </p>
                      </div>
                    </div>

                    <div className="absolute top-20 right-4 hidden sm:flex w-[44%] flex-col gap-2">
                      <div className="rounded-md border border-sky-200/70 bg-sky-50/70 px-3 py-2 backdrop-blur-sm dark:border-white/20 dark:bg-black/20">
                        <p className="text-[10px] uppercase tracking-wide text-sky-600 dark:text-sky-100/80">Weekly event</p>
                        <p className="text-sm font-semibold text-sky-800 truncate dark:text-sky-50">
                          {dashboardWeeklyEvents[0]?.name ?? "No weekly event"}
                        </p>
                        <p className="text-[11px] text-sky-500 truncate dark:text-sky-100/80">
                          {dashboardWeeklyEvents[0]
                            ? `${dayNames[dashboardWeeklyEvents[0].dayOfWeek - 1] ?? "Day"} ${formatWeeklyTime(dashboardWeeklyEvents[0].time)}`
                            : "No schedule"}
                        </p>
                      </div>
                      <div className="rounded-md border border-rose-200/70 bg-rose-50/70 px-3 py-2 backdrop-blur-sm dark:border-white/20 dark:bg-black/20">
                        <p className="text-[10px] uppercase tracking-wide text-rose-600 dark:text-rose-100/90">Weekly event</p>
                        <p className="text-sm font-semibold text-rose-800 truncate dark:text-rose-50">
                          {dashboardWeeklyEvents[1]?.name ?? "No weekly event"}
                        </p>
                        <p className="text-[11px] text-rose-500 truncate dark:text-rose-100/80">
                          {dashboardWeeklyEvents[1]
                            ? `${dayNames[dashboardWeeklyEvents[1].dayOfWeek - 1] ?? "Day"} ${formatWeeklyTime(dashboardWeeklyEvents[1].time)}`
                            : "No schedule"}
                        </p>
                      </div>
                    </div>
                  </div>
                }
              />
            </BentoGrid>
          </motion.div>
          {/* Read More Arrow for mobile - shown after cards */}
          <motion.div
            className="flex xl:hidden justify-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <ReadMoreArrow targetId="second-section" />
          </motion.div>
        </main>
        <footer className="flex gap-[24px] flex-wrap items-center justify-center mt-8">
          {/* Footer content */}
        </footer>
      </section>

      {/* Second Section - Visible After Scrolling */}
      <section 
        id="second-section"
        className="p-4 pb-20 sm:p-8 xl:p-20 pt-20 sm:pt-32 flex flex-col items-center"
      >
        <div className="flex flex-col xl:flex-row w-full gap-8 xl:gap-16 max-w-7xl">
          {/* Left side: Our Mission */}
          <motion.div 
            className="flex-1 flex flex-col gap-4"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold text-neutral-800 dark:text-neutral-200 text-center">
              Our Mission
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Student Council works to make student life at ITU better, fairer, and more connected.
              We represent student voices in conversations with the university, advocate for positive
              academic and social change, and help make sure decisions reflect the needs of the
              students,
            </p>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              We also support and empower student organisations through collaboration, visibility,
              and funding opportunities. By creating spaces for a positive student life, we aim to
              ensure every student can help shape a welcoming and vibrant university experience.
            </p>
          </motion.div>

          {/* Right side: Members */}
          <motion.div 
            className="flex-1 flex flex-col gap-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold text-neutral-800 dark:text-neutral-200 text-center">
              Members
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-6">
              {sortedMembers.map((member, index) => {
                const profileImageSrc = member.profilePath
                  ? `https://cdn.studentcouncil.dk/${member.profilePath}`
                  : undefined;
                const profileInitial = member.name.charAt(0).toUpperCase();
                const memberLabel = getMemberLabel(member.accountId);
                return (
                  <div key={`${member.accountId}-${index}`} className="flex flex-col items-center gap-3">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={profileImageSrc} alt={member.name} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xl">
                        {profileInitial}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <p className="font-semibold text-neutral-800 dark:text-neutral-300 line-clamp-1">
                        {member.name}
                      </p>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                        {memberLabel}
                      </p>
                   </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Third Section - Student Organisations */}
      <section className="w-full px-4 pb-20 sm:px-8 xl:px-20 mt-16 sm:mt-24 flex flex-col items-center overflow-hidden">
        <motion.div
          className="flex flex-col items-center gap-4 w-full max-w-6xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold text-neutral-800 dark:text-neutral-200">
            Student Organisations
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
            Discover the vibrant community of student-led organisations at ITU. 
            <br/>From tech clubs to sport groups, there&apos;s something for everyone.
          </p>
          <div className="flex flex-row flex-wrap gap-4 justify-center items-center">
            <RainbowButton href="https://forms.studentcouncil.dk/forms/funding" target="_blank">
              <Banknote className="h-4 w-4" />
              Apply for funding
            </RainbowButton>
            <RainbowButton href="https://forms.studentcouncil.dk/forms/create" target="_blank">
              <Plus className="h-4 w-4" />
              Create organisation
            </RainbowButton>
          </div>
        </motion.div>
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden mt-8">
          <Marquee reverse pauseOnHover className="[--duration:150s]">
            {organisations.map((organisation) => (
              <OrganisationCardCompact key={organisation.id} organisation={organisation} />
            ))}
          </Marquee>
          <Marquee pauseOnHover className="[--duration:135s]">
            {selectedOrganisations.map((organisation) => (
              <OrganisationCardCompact key={organisation.id} organisation={organisation} />
            ))}
          </Marquee>
          <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
          <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
        </div>
      </section>
    </div>
  );
}
