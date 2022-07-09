import { randAvatar, randFullName, randParagraph, randPhrase } from "@ngneat/falso"
import { PrismaClient, type User, type Comment, type Post } from "@prisma/client"

const TOTAL_USERS = 1_000_000
const TOTAL_POSTS = 10_000
const TOTAL_COMMENTS = 100_000

function* chunks<T>(arr: T[], n: number) {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n)
  }
}

const prisma = new PrismaClient()

const existingUsers = await prisma.user.count()
const existingPosts = await prisma.post.count()
const existingComments = await prisma.comment.count()

const newUsers: Pick<User, "name" | "avatar">[] = []

const usersToMake = TOTAL_USERS - existingUsers

for (let i = 0; i < usersToMake; i++) {
  process.stdout.write(`\rGenerating users... ${i}/${usersToMake}`)

  newUsers.push({
    name: randFullName(),
    avatar: randAvatar()
  })
}

process.stdout.write("\n")

let userCount = 0

for (const chunk of chunks(newUsers, 100)) {
  process.stdout.write(`\rInserting users... ${userCount} - ${Math.min(userCount + 100, usersToMake)}/${usersToMake}`)
  const status = await prisma.user.createMany({ data: chunk })
  userCount += status.count
}

process.stdout.write("\n")

console.log("CREATED USERS:", userCount)

const newPosts: Pick<Post, "title" | "content" | "published" | "authorId">[] = []

const users = await prisma.user.findMany()

const postsToMake = TOTAL_POSTS - existingPosts

for (let i = 0; i < postsToMake; i++) {
  process.stdout.write(`\rGenerating posts... ${i}/${postsToMake}`)

  newPosts.push({
    title: randPhrase(),
    content: randParagraph({ length: 10 }).join("\n"),
    published: Math.random() > 0.2,
    authorId: users[Math.floor(Math.random() * users.length)].id,
  })
}

let postCount = 0

for (const chunk of chunks(newPosts, 100)) {
  process.stdout.write(`\rInserting posts... ${postCount} - ${Math.min(postCount + 100, postsToMake)}/${postsToMake}`)
  const status = await prisma.post.createMany({ data: chunk })
  postCount += status.count
}

process.stdout.write("\n")

console.log("CREATED POSTS:", postCount)

const posts = await prisma.post.findMany()

const newComments: Pick<Comment, "text" | "authorId" | "postId">[] = []

for (let i = 0; i < TOTAL_COMMENTS - existingComments; i++) {
  process.stdout.write(`\rGenerating comments... ${i}/${TOTAL_COMMENTS - existingComments}`)

  newComments.push({
    text: randParagraph(),
    authorId: users[Math.floor(Math.random() * users.length)].id,
    postId: posts[Math.floor(Math.random() * posts.length)].id,
  })
}

let commentCount = 0

for (const chunk of chunks(newComments, 100)) {
  process.stdout.write(`\rInserting comments... ${commentCount} - ${Math.min(commentCount + 100, TOTAL_COMMENTS)}/${TOTAL_COMMENTS}`)
  const status = await prisma.comment.createMany({ data: chunk })
  commentCount += status.count
}

process.stdout.write("\n")

console.log("CREATED COMMENTS:", commentCount)
