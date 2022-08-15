/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/typography'),
    ],
  }
  ```
*/
export default function Content({ imageID, title, content, author }: { imageID: string; title: string; content: string; author: { name: string; avatar: string; } }) {
  const contentList = content.split("\n");
  if (contentList.length < 1) 
    return null;

  let leadingContent = contentList.slice(0, 1);
  let trailingContent = contentList.slice(1);

  return (
    <div className="relative bg-white">
      <div className="lg:absolute lg:inset-0">
        <div className="lg:absolute lg:inset-y-0 lg:left-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover lg:absolute lg:h-full"
            src={`https://images.unsplash.com/${imageID}?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80`}
            alt=""
          />
        </div>
      </div>
      <div className="relative pt-12 pb-16 px-4 sm:pt-16 sm:px-6 lg:px-8 lg:max-w-7xl lg:mx-auto lg:grid lg:grid-cols-2">
        <div className="lg:col-start-2 lg:pl-8">
          <div className="text-base max-w-prose mx-auto lg:max-w-lg lg:ml-auto lg:mr-0">
            <h2 className="leading-6 text-sky-600 font-semibold">Just say anything</h2>
            <h3 className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl sm:tracking-tight">
              {title}
            </h3>
            <div className="mt-8 space-x-4 flex items-center cursor-pointer">
              <span className="inline-block relative">
                <img
                  className="h-8 w-8 rounded-full"
                  src={author.avatar}
                  alt={author.name}
                />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-400" />
              </span>
              <div className="ml-3">
                <p className="text-md font-medium text-gray-700">{author.name}</p>
              </div>
            </div>
            <p className="mt-8 text-lg text-gray-500">{leadingContent}</p>
            <div className="mt-5 prose prose-sky text-gray-500">
              {trailingContent.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
