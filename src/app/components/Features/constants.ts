import {
  CurrencyEuroIcon,
  LockClosedIcon,
  WifiIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';

export const features = [
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
    link: 'https://github.com/serafimsanvol/wasm-image-compressor',
  },
  {
    name: 'Offline friendly',
    description:
      'This service works offline. You can compress your images without an internet connection. Just open the website and start compressing.',
    icon: WifiIcon,
  },
];
