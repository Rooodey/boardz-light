import { Menu } from "lucide-react";
import Link from "next/link";
import { Typography } from "~/components/typography";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import type { ExtendedUserProfile } from "~/server/db/schemas/user-profiles";
import type { DefaultSession } from "next-auth";
import { Button } from "~/components/ui/button";
import { getFriends } from "~/lib/user-service";

interface ProfileProps {
  profile: ExtendedUserProfile;
  session?: DefaultSession;
}

export async function Profile({ profile, session }: ProfileProps) {
  const friends = await getFriends(profile.userId);
  const friend_count = friends?.length ?? 0;

  return (
    <>
      <ProfileHeader profile={profile} session={session} />
      <ProfileSummary profile={profile} friend_count={friend_count} />
      <Typography>{profile?.bio}</Typography>
      <div className="flex flex-row space-x-4">
        <Button variant="outline" size={"sm"} className="flex-1">
          Friend Request
        </Button>
        <Button variant="outline" size={"sm"} className="flex-1">
          Message
        </Button>
      </div>
    </>
  );
}

export function ProfileHeader({ profile, session }: ProfileProps) {
  return (
    <div className="flex flex-row items-center justify-between">
      <Typography variant="h3">{profile?.userName}</Typography>
      {session?.user?.id === profile?.userId && (
        <Link href="/settings">
          <Menu size={24} />
        </Link>
      )}
    </div>
  );
}

export function ProfileSummary({
  profile,
  friend_count,
}: {
  profile: ExtendedUserProfile;
  friend_count: number;
}) {
  return (
    <div className="flex flex-row items-center justify-between gap-4">
      <Avatar className="h-[80px] w-[80px]">
        <AvatarImage src={profile?.image ?? "/default-avatar.png"} />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <div className="flex flex-1 flex-col space-y-2 px-4">
        <Typography variant={"p"}>{profile?.realName}</Typography>
        <div className="flex flex-row justify-between text-center">
          <div>
            <Typography variant={"h4"}>{profile?.points}</Typography>
            <Typography variant={"p"}>
              {profile?.points === 1 ? "Point" : "Points"}
            </Typography>
          </div>
          <div>
            <Typography variant={"h4"}>{profile?.awards}</Typography>
            <Typography variant={"p"}>
              {profile?.awards === 1 ? "Award" : "Awards"}
            </Typography>
          </div>
          <div>
            <Typography variant={"h4"}>{friend_count}</Typography>
            <Typography variant={"p"}>
              {friend_count === 1 ? "Friend" : "Friends"}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
