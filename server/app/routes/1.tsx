import { json, redirect, type LoaderArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import Comments from "~/components/1/comments"
import Content from "~/components/1/content"
import { prismaClient } from "~/utils/prisma.server"

export const loader = async (args: LoaderArgs) => {
  const count = await prismaClient.post.count()
  const post = await prismaClient.post.findFirst({
    take: 1,
    skip: Math.floor(Math.random() * count),
    include: {
      author: true,
      comments: {
        include: {
          author: true
        }
      }
    }
  })

  if (!post) {
    throw redirect("/")
  }

  return json({ post });
}

const One = () => {
  const { post } = useLoaderData<typeof loader>();

  return (
    <>
      <Content
        imageID={"photo-1660337158319-e484db53cf11"}
        title={post.title}
        content={post.content}
        author={post.author}
        />
      <Comments comments={post.comments} />
    </>
  )
}

export default One