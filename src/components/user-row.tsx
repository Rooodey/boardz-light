import Link from "next/link";
import { Typography } from "~/components/typography";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

interface UserRowProps {
  userName: string;
  image?: string;
  href: string;
}

export default function UserRow({ userName, image, href }: UserRowProps) {
  return (
    <Link href={href} className="cursor-pointer hover:underline">
      <div className="flex flex-row items-center space-x-3">
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={image ?? "/default-avatar.png"}
            alt="User avatar"
            onError={(e) => (e.currentTarget.src = "/default-avatar.png")}
          />
          <AvatarFallback>{"U"}</AvatarFallback>
        </Avatar>
        <Typography>{userName}</Typography>
      </div>
    </Link>
  );
}
