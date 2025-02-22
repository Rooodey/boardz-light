import { Button } from "~/components/ui/button";
import { signIn } from "~/server/auth/auth";

export function SignInDiscord() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("discord");
      }}
    >
      <Button type="submit">Continue to Discord</Button>
    </form>
  );
}
