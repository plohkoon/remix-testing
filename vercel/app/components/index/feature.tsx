import { AcademicCapIcon, BriefcaseIcon, PaperAirplaneIcon, SparklesIcon, TruckIcon, FlagIcon } from '@heroicons/react/solid'

const features = [
  {
    name: 'Lorem Ipsum',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    icon: AcademicCapIcon,
  },
  {
    name: 'Hipster Ispum',
    description: 'Lorem ipsum dolor amet mustache knausgaard +1',
    icon: PaperAirplaneIcon,
  },
  {
    name: 'Zombie Ipsum',
    description: 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro',
    icon: BriefcaseIcon,
  },
  {
    name: 'Cupcake Ipsum',
    description: 'Cupcake ipsum dolor. Sit amet marshmallow topping cheesecake muffin',
    icon: TruckIcon,
  },
  {
    name: 'Space Ipsum',
    description: 'Space, the final frontier. These are the voyages of the Starship Enterprise',
    icon: SparklesIcon,
  },
  {
    name: 'Cat Ipsum',
    description: 'Chase ball of string eat plants, meow, and throw up because I ate plants going to catch the red dot today going to catch the red dot today',
    icon: FlagIcon,
  },
]

export default function Feature() {
  return (
    <div className="relative bg-white py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-lg font-semibold text-sky-600">Voluptate Velit </h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:tracking-tight">
          Duis aute irure dolor in reprehenderit
        </p>
        <p className="mx-auto mt-5 max-w-prose text-xl text-gray-500">
          Phasellus lorem quam molestie id quisque diam aenean nulla in. Accumsan in quis quis nunc, ullamcorper
          malesuada. Eleifend condimentum id viverra nulla.
        </p>
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center rounded-md bg-sky-500 p-3 shadow-lg">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900">{feature.name}</h3>
                    <p className="mt-5 text-base text-gray-500">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
