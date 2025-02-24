import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Typography } from "~/components/typography";
import { Menu } from "lucide-react";
import AppContainer from "~/components/app-container";
import Link from "next/link";

export default async function Page() {
  return (
    <AppContainer>
      {(session) => (
        <>
          <div className="flex flex-row items-center justify-between">
            <Typography variant="h3">{session.user?.name}</Typography>
            <Link href="/profile/settings">
              <Menu size={24} />
            </Link>
          </div>
          <Avatar className="h-[80px] w-[80px]">
            <AvatarImage src={session?.user?.image ?? "/default-avatar.png"} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </>
      )}
    </AppContainer>
  );
}
