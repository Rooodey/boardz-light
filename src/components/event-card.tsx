import Image from "next/image";
import { Typography } from "~/components/typography";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { type EventByDistance } from "~/lib/distance-service";

type EventCardProps = Omit<EventByDistance, "id"> & { isLast: boolean };

export default function EventCard({
  image,
  distance,
  title,
  category,
  avatar,
  username,
  isLast,
}: EventCardProps) {
  return (
    <div className="relative flex w-full flex-row items-center justify-start gap-4 py-2">
      <Image
        src={image ?? "/default-table.png"}
        alt="Table Image"
        width={120}
        height={120}
        className="rounded-sm"
      />
      <div className="flex w-full flex-col items-start justify-between gap-1 self-stretch py-1">
        <div className="flex w-full flex-col">
          <Typography className="text-[0.75rem] text-muted-foreground">
            {Math.ceil(distance / 1000)}km entfernt
          </Typography>
          <div className="flex flex-row items-center justify-between self-stretch">
            <Typography variant={"h3"} className="text-primary">
              {title}
            </Typography>
          </div>
          <Typography className="text-[0.75rem] text-muted-foreground">
            {category}
          </Typography>
        </div>
        <div className="flex flex-row items-center justify-start gap-2">
          <Avatar className="h-5 w-5">
            <AvatarImage
              src={avatar ?? "/default-avatar.png"}
              alt="User avatar"
              onError={(e) => (e.currentTarget.src = "/default-avatar.png")}
            />
            <AvatarFallback>{"U"}</AvatarFallback>
          </Avatar>
          <Typography className="text-[0.75rem] text-muted-foreground">
            {username}
          </Typography>
        </div>
      </div>
      <span className="absolute -left-4 -right-4 top-0 h-[1px] bg-border md:-left-6 md:-right-6"></span>
      {isLast && (
        <span className="absolute -left-4 -right-4 bottom-0 h-[1px] bg-border md:-left-6 md:-right-6"></span>
      )}
    </div>
  );
}
