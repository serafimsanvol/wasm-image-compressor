import {
  CurrencyEuroIcon,
  LockClosedIcon,
  WifiIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Free forever',
    description:
      'This is a free service and will always be free for offline functionality. There are no hidden costs or limits on the number of images you can compress locally.',
    icon: CurrencyEuroIcon,
  },
  {
    name: 'Privacy first',
    description:
      'This is a privacy-first service. All the compression is done on your device, and the images are never uploaded to any server',
    icon: LockClosedIcon,
  },
  {
    name: 'Open source',
    description:
      'The source code for this service is open-source and available on GitHub. You can contribute to the project or host your own instance.',
    icon: BookOpenIcon,
  },
  {
    name: 'Offline friendly',
    description:
      'This service works offline. You can compress your images without an internet connection. Just open the website and start compressing.',
    icon: WifiIcon,
  },
];

export default function Features() {
  return (
    <div data-animate className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Compress instantly
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to compress your images
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
