import { Link } from "@remix-run/react"

/* This example requires Tailwind CSS v2.0+ */
const navigation = [
  { name: '1', href: '/1' },
  { name: '10', href: '/10' },
  { name: '50', href: '/50' },
  { name: '100', href: '/100' },
  { name: '500', href: '/500' },
  { name: '1000', href: '/1000' },
]

export default function Header({
  name,
  profileUrl
}: {
  name: string;
  profileUrl: string;
}) {
  return (
    <header className="bg-sky-600">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-sky-500 lg:border-none">
          <div className="flex items-center">
            <Link to="/">
              <span className="sr-only">Remix Testing</span>
              <img
                className="h-10 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                alt=""
              />
            </Link>
            <div className="hidden ml-10 space-x-8 lg:block">
              {navigation.map((link) => (
                <a key={link.name} href={link.href} className="text-base font-medium text-white hover:text-sky-50">
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          <div className="ml-10 space-x-4">
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
