"use client";

import { Typography } from "~/components/typography";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { ImageUploadDialog } from "~/components/image-upload-dialoag";

import { useUserProfile } from "~/contexts/UserProfileContext";
import { getFriends } from "~/lib/user-service";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useUserResourceQuery } from "~/hooks/useUserResourceQuery";

export default function ProfileSummary() {
  const { data: session } = useSession();
  const { profile } = useUserProfile();
  const [friendCount, setFriendCount] = useState<number>(0);
  console.log(profile);

  const { data: friends = [], isError } = useUserResourceQuery<any>({
    key: "friends",
    fetcherAction: getFriends,
    userId: profile.userId,
  });

  useEffect(() => {
    setFriendCount(friends.length ?? 0);
  }, [friends]);

  return (
    <>
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="relative">
          <Avatar className="h-[80px] w-[80px] md:h-[120px] md:w-[120px]">
            <AvatarImage src={profile?.image ?? "/default-avatar.png"} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          {session?.user?.id === profile?.userId && (
            <div className="absolute bottom-0 right-0">
              <ImageUploadDialog />
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col space-y-2 px-4 md:px-8">
          <Typography variant={"p"} className="text-lg">
            {profile?.realName}
          </Typography>
          <div className="flex flex-row justify-between text-center">
            <div>
              <Typography variant={"h4"} className="md:text-2xl">
                {profile?.points}
              </Typography>
              <Typography variant={"p"} className="md:text-lg">
                {profile?.points === 1 ? "Point" : "Points"}
              </Typography>
            </div>
            <div>
              <Typography variant={"h4"} className="md:text-2xl">
                {profile?.awards}
              </Typography>
              <Typography variant={"p"} className="md:text-lg">
                {profile?.awards === 1 ? "Award" : "Awards"}
              </Typography>
            </div>
            <div>
              <Typography variant={"h4"} className="md:text-2xl">
                {friendCount}
              </Typography>
              <Typography variant={"p"} className="md:text-lg">
                {friendCount === 1 ? "Friend" : "Friends"}
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <Typography>{profile?.bio}</Typography>
    </>
  );
}
