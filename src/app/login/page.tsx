import SignInDiscord from "~/components/signin-discord";

export default async function Page() {
  return (
    <div className="flex flex-grow flex-col items-center justify-center">
      <h1>Login</h1>
      <SignInDiscord />
    </div>
  );
}
