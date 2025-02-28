import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Typography } from "~/components/typography";
import { Menu } from "lucide-react";
import AppContainer from "~/components/app-container";
import Link from "next/link";
import { auth } from "~/server/auth/auth";
import { getFriends, getUser } from "~/lib/user-service";
import { Button } from "~/components/ui/button";

export default async function Page() {
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <AppContainer>
        <Typography>Kein Benutzer gefunden.</Typography>;
      </AppContainer>
    );
  }

  const profile = await getUser(session.user.id);
  const friends = await getFriends(session.user.id);
  const friend_count = friends.length;

  return (
    <AppContainer>
      <div className="flex flex-row items-center justify-between">
        <Typography variant="h3">{profile?.userName}</Typography>
        <Link href="/profile/settings">
          <Menu size={24} />
        </Link>
      </div>
      <div className="flex flex-row items-center justify-between gap-4">
        <Avatar className="h-[80px] w-[80px]">
          <AvatarImage src={session?.user?.image ?? "/default-avatar.png"} />
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
      <Typography>{profile?.bio}</Typography>
      <div className="flex flex-row space-x-4">
        <Button variant="outline" size={"sm"} className="flex-1">
          Friend Request
        </Button>
        <Button variant="outline" size={"sm"} className="flex-1">
          Message
        </Button>
      </div>
    </AppContainer>
  );
}
