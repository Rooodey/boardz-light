import Link from "next/link";
import { db } from "~/server/db/index";

export default async function HomePage() {
  const posts = await db.query.posts.findMany();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      Hello
      <div>
        {posts.map((post) => (
          <div key={post.id}>{post.name}</div>
        ))}
      </div>
    </main>
  );
}
