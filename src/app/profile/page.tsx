import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Typography } from "~/components/typography";
import { Menu } from "lucide-react";
import AppContainer from "~/components/app-container";
import Link from "next/link";
import { auth } from "~/server/auth/auth";
import getUser from "~/lib/user-service";

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

  return (
    <AppContainer>
      <div className="flex flex-row items-center justify-between">
        <Typography variant="h3">{profile?.userName}</Typography>
        <Link href="/profile/settings">
          <Menu size={24} />
        </Link>
      </div>
      <Avatar className="h-[80px] w-[80px]">
        <AvatarImage src={session?.user?.image ?? "/default-avatar.png"} />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <Typography variant={"h4"}>{profile?.realName}</Typography>
      <Typography>{profile?.bio}</Typography>
    </AppContainer>
  );
}
