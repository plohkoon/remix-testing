import { useLoaderData } from "@remix-run/react";
import { PrismaClient } from "@prisma/client/edge";
import { json, type LoaderFunction } from "@remix-run/cloudflare";


export const loader: LoaderFunction = async () => {
  const client = new PrismaClient();
  const posts = await client.post.findMany({take: 1000 });

  return json({ posts });
}

export default function Index() {
  const { posts } = useLoaderData();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix Testing :)</h1>
      <p>There are {posts.length} posts</p>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
