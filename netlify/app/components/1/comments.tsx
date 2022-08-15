export default function Comments({ comments }: { comments: {
  id: string;
  text: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  }
}[]
}) {
  if (comments.length < 1)
    return null;

  return (
    <div className="space-y-4 p-4">
      <h3 className="font-black text-black text-lg text-center">Peoples thoughts</h3>
      {comments.map((comment, index) => (
        <div key={comment.id} className="flex items-center space-x-4 max-w-3xl mx-auto">
          <div>
            <span className="inline-block relative">
              <img
                className="h-16 w-16 rounded-full"
                src={comment.author.avatar}
                alt={comment.author.name}
              />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-400" />
            </span>
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-black text-md">{comment.author.name}</h4>
            <p className="text-gray-500 text-sm">{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}