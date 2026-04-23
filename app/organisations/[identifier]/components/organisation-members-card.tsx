import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { OrganisationMember } from "@/lib/interfaces/organisations/organisation-member";

interface OrganisationMembersCardProps {
	members: OrganisationMember[];
}

export function OrganisationMembersCard({ members }: OrganisationMembersCardProps) {
	if (members.length === 0) return null;

	return (
		<section>
			<h2 className="mb-4 text-2xl font-bold">Members</h2>
			<div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-[rgba(185,114,114,0.35)] dark:bg-[rgba(40,23,25,0.9)]">
				<div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-6">
					{members.map((member, index) => {
						const profileImageSrc = member.profilePath
							? `https://cdn.studentcouncil.dk/${member.profilePath}`
							: undefined;
						const memberName = (member.name ?? "").trim() || "Member";
						const profileInitial = memberName.charAt(0).toUpperCase();

						return (
							<div key={member.accountId || `member-${index}`} className="flex flex-col items-center gap-3">
								<Avatar className="h-20 w-20">
									<AvatarImage src={profileImageSrc} alt={memberName} />
									<AvatarFallback className="bg-primary/10 text-primary text-lg">
										{profileInitial}
									</AvatarFallback>
								</Avatar>
								<p className="line-clamp-1 text-center text-sm font-semibold text-neutral-800 dark:text-neutral-200">
									{memberName}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
