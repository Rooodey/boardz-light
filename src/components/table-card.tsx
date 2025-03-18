import { Heart, Pin, Star, Trophy, UsersRound } from "lucide-react";
import Image from "next/image";
import { Typography } from "~/components/typography";

interface TableCardProps {
  image: string | null;
  name: string;
  description: string | null;
  isLast?: boolean;
}

export default function TableCard({
  image,
  name,
  description,
  isLast,
}: TableCardProps) {
  return (
    <div className="relative flex w-full flex-row items-center justify-start gap-4 py-2">
      <Image
        src={image ?? "/default-table.png"}
        alt="Table Image"
        width={100}
        height={100}
        className="rounded-sm"
      />
      <div className="flex w-full flex-col items-start justify-between gap-1 self-stretch py-1">
        <div className="flex w-full flex-col">
          <div className="flex flex-row items-center justify-between self-stretch">
            <Typography variant={"h5"} className="text-primary">
              {name.toUpperCase()}
            </Typography>
            <Pin size="18" />
          </div>
          <Typography variant={"small"}>{description}</Typography>
        </div>
        <div className="flex flex-row items-center justify-between self-stretch">
          <div>
            <Typography variant={"p"} className="inline-flex items-center">
              120
              <span className="pl-2">
                <Star size="16" />
              </span>
            </Typography>
          </div>
          <div>
            <Typography variant={"p"} className="inline-flex items-center">
              3
              <span className="pl-2">
                <Trophy size="16" />
              </span>
            </Typography>
          </div>
          <div>
            <Typography variant={"p"} className="inline-flex items-center">
              32
              <span className="pl-2">
                <UsersRound size="16" />
              </span>
            </Typography>
          </div>
          <div>
            <Typography variant={"p"} className="inline-flex items-center">
              10
              <span className="pl-2">
                <Heart size="16" />
              </span>
            </Typography>
          </div>
        </div>
      </div>
      <span className="absolute -left-4 -right-4 top-0 h-[1px] bg-border md:-left-6 md:-right-6"></span>
      {isLast && (
        <span className="absolute -left-4 -right-4 bottom-0 h-[1px] bg-border md:-left-6 md:-right-6"></span>
      )}
    </div>
  );
}
