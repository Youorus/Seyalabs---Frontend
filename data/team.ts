export type TeamMember = {
  name: string;
  role: string;
  description: string;
  photo: string;
  approvedForPublication: boolean;
};

export type TeamHeroPhoto = {
  src: string;
  alt: string;
  caption: string;
  kind: "real" | "illustration";
  approvedForPublication: boolean;
};
export const teamHeroPhoto: TeamHeroPhoto | null = {
  src: "/team/collaboration-seya-illustration.webp",
  alt: "Illustration d’une équipe de trois professionnels qui échangent autour d’un ordinateur.",
  caption: "Visuel d’ambiance généré · travail en équipe",
  kind: "illustration",
  approvedForPublication: true,
};
export function isPublishableTeamPhoto(
  photo: TeamHeroPhoto | null,
): photo is TeamHeroPhoto {
  return Boolean(
    photo?.approvedForPublication &&
      photo.alt.trim() &&
      photo.caption.trim() &&
      /^\/team\/[a-zA-Z0-9][a-zA-Z0-9._-]*\.(webp|avif|png|jpe?g)$/.test(
        photo.src,
      ),
  );
}

// Add real portraits in public/team/ and only publish an approved identity/photo.
// No generated portrait or stock model should be presented as a team member.
export const teamMembers: TeamMember[] = [];

export const publishedTeamMembers = teamMembers.filter(
  (member) =>
    member.approvedForPublication &&
    member.name.trim() &&
    member.role.trim() &&
    member.description.trim() &&
    /^\/team\/[a-zA-Z0-9][a-zA-Z0-9._-]*\.(webp|avif|png|jpe?g)$/.test(
      member.photo,
    ),
);
