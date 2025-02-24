import { LoginForm } from "~/components/login-form";
import SignInDiscord from "~/components/signin-button";

export default async function Page() {
  return (
    <div className="flex flex-grow flex-col items-center justify-center">
      <LoginForm />
    </div>
  );
}
