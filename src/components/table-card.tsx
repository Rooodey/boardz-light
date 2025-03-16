import Image from "next/image";
import { Typography } from "~/components/typography";

interface TableCardProps {
  image: string | null;
  name: string;
  description: string | null;
}

export default function TableCard({
  image,
  name,
  description,
}: TableCardProps) {
  return (
    <div className="flex w-full flex-row items-center justify-start gap-2 rounded-lg border-2 border-gray-200 shadow-sm">
      <Image
        src={image ?? "/default-table.png"}
        alt="Table Image"
        width={100}
        height={100}
        className="rounded-lg"
      />
      <div className="flex h-full flex-col items-start justify-start gap-2 p-2">
        <Typography variant={"h4"}>{name}</Typography>
        <Typography>{description}</Typography>
      </div>
    </div>
  );
}
