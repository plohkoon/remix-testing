/* This example requires Tailwind CSS v2.0+ */
// const faqs = [
//   {
//     id: 1,
//     question: "What's the best thing about Switzerland?",
//     answer:
//       "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
//   },
//   // More questions...
// ]

const faqs = [
  {
    id: 1,
    question: 'Lorem Ipsum',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  },
  {
    id: 2,
    question: 'Hipster Ispum',
    answer: 'Lorem ipsum dolor amet mustache knausgaard +1',
  },
  {
    id: 3,
    question: 'Zombie Ipsum',
    answer: 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro',
  },
  {
    id: 4,
    question: 'Cupcake Ipsum',
    answer: 'Cupcake ipsum dolor. Sit amet marshmallow topping cheesecake muffin',
  },
  {
    id: 5,
    question: 'Space Ipsum',
    answer: 'Space, the final frontier. These are the voyages of the Starship Enterprise',
  },
  {
    id: 6,
    question: 'Cat Ipsum',
    answer: 'Chase ball of string eat plants, meow, and throw up because I ate plants going to catch the red dot today going to catch the red dot today',
  },
]

export default function FAQ() {
  return (
    <div className="bg-gray-900">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="lg:max-w-2xl lg:mx-auto lg:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl sm:tracking-tight">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-gray-400">
            Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla nec.
            Urna, sed a lectus elementum blandit et.
          </p>
        </div>
        <div className="mt-20">
          <dl className="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-10">
            {faqs.map((faq) => (
              <div key={faq.id}>
                <dt className="font-semibold text-white">{faq.question}</dt>
                <dd className="mt-3 text-gray-400">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
