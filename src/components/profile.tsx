import { Button } from "~/components/ui/button";
import ProfileHeader from "~/components/profile-header";
import ProfileSummary from "~/components/profile-summary";

export function Profile() {
  return (
    <>
      <ProfileHeader />
      <ProfileSummary />
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
