import { Link } from "@remix-run/react";

const Posts = ({ posts }: { posts: { id: string, title: string, content: string, published: boolean, author: { id: string, name: string, avatar: string }, commentCount: number }[] }) => {
  return (
    <div className="max-w-5xl mx-auto space-y-6 py-6">
      {posts.map(p => {
        const content = p.content.split("\n")[0].slice(0, 150) + "...";

        return (
          <div key={p.id} className="flex flex-col space-x-4 space-y-2 border rounded-2xl border-neutral-400 overflow-hidden shadow-md mx-4 sm:flex-row">
            <img src="https://images.unsplash.com/photo-1597589827317-4c6d6e0a90bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80" alt="" />
            <div className="space-y-3 flex-1 flex flex-col justify-center">
              <h3 className="font-bold text-lg px-4">
                <Link to="/1">{p.title}</Link>
              </h3>
              <div className="flex flex-row items-center space-x-2 ml-3">
                <span className="inline-block relative">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={p.author.avatar}
                    alt={p.author.name}
                  />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-400" />
                </span>
                <h4 className="text-md text-neutral-700">{p.author.name}</h4>
              </div>
              <p className="px-3">{content}</p>
              <p className="text-xs text-neutral-500 text-right px-6 pb-3">Comments: {p.commentCount}</p>
            </div>
          </div>
        )
      })}

    </div>
  )
}

export default Posts