import Image from "next/image";
import { SystemFlow } from "@/components/sections/system-flow";
import {
  isPublishableTeamPhoto,
  publishedTeamMembers,
  teamHeroPhoto,
} from "@/data/team";

export function HeroTeam() {
  if (!isPublishableTeamPhoto(teamHeroPhoto)) return <SystemFlow />;
  const portraits =
    teamHeroPhoto.kind === "real" ? publishedTeamMembers.slice(0, 2) : [];
  return (
    <div className="hero-team">
      <figure className="hero-team-main">
        <Image
          src={teamHeroPhoto.src}
          alt={teamHeroPhoto.alt}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1100px) 80vw, 50vw"
          priority
        />
        <figcaption>{teamHeroPhoto.caption}</figcaption>
      </figure>
      {portraits.length > 0 && (
        <div className="hero-team-portraits">
          {portraits.map((member) => (
            <figure key={`${member.name}-${member.role}`}>
              <div className="hero-team-portrait-photo">
                <Image
                  src={member.photo}
                  alt={`Portrait de ${member.name}`}
                  fill
                  sizes="(max-width: 767px) 35vw, 160px"
                />
              </div>
              <figcaption>
                <strong>{member.name}</strong>
                <span>{member.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
