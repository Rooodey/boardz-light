import { redirect } from "next/navigation";

interface UserPageParams {
  params: { userName: string };
}

export default async function UserIndexPage({ params }: UserPageParams) {
  const { userName } = params;
  redirect(`/user/${userName}/about`);
}
