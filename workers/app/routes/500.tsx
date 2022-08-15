import { json, type LoaderArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import Posts from "~/components/many/posts";
import { prismaClient } from "~/utils/prisma.server";

const take = 500;

export const loader = async (args: LoaderArgs) => {
  const count = await prismaClient.post.count();

  const posts = await prismaClient.post.findMany({
    take,
    skip: Math.floor(Math.random() * (count - take)),
    include: {
      author: true,
      comments: true
    }
  })

  const postsWithCount = posts.map(p => ({
    id: p.id,
    title: p.title,
    content: p.content,
    published: p.published,
    author: p.author,
    commentCount: p.comments.length
  }))

  return json({ posts: postsWithCount });
}

const Ten = () => {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <Posts posts={posts} />
  )
}

export default Ten