import { Link } from "@remix-run/react"
import { BeakerIcon } from "@heroicons/react/solid"

/* This example requires Tailwind CSS v2.0+ */
const navigation = [
  { name: 'One', href: '/1' },
  { name: 'Ten', href: '/10' },
  { name: 'Fifty', href: '/50' },
  { name: 'One Hundred', href: '/100' },
  { name: 'Five Hundred', href: '/500' },
  { name: 'One Thousand', href: '/1000' },
]

export default function Header({
  name,
  profileUrl
}: {
  name: string;
  profileUrl: string;
}) {
  return (
    <header className="bg-sky-600 z-[1000] sticky t-0">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-sky-500 lg:border-none">
          <div className="flex items-center">
            <Link to="/">
              <span className="sr-only">Remix Testing</span>
              <BeakerIcon className="h-10 w-10 text-white" />
            </Link>
            <div className="hidden ml-10 space-x-8 lg:block">
              {navigation.map((link) => (
                <Link key={link.name} to={link.href} className="text-base font-medium text-white hover:text-sky-50">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="ml-10 space-x-4 flex items-center group cursor-pointer">
            <div className="ml-3">
              <p className="text-md font-medium text-white group-hover:text-gray-300">{name}</p>
              <p className="text-xs font-medium text-white group-hover:text-gray-200">View profile</p>
            </div>
            <span className="inline-block relative">
              <img
                className="h-14 w-14 rounded-full"
                src={profileUrl}
                alt={name}
              />
              <span className="absolute top-0 right-0 block h-3.5 w-3.5 rounded-full ring-2 ring-white bg-red-400" />
            </span>
          </div>
        </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          {navigation.map((link) => (
            <Link key={link.name} to={link.href} className="text-base font-medium text-white hover:text-sky-50">
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
