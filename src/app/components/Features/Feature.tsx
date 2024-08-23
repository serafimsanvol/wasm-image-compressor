import Link from 'next/link';

import { WifiIcon } from '@heroicons/react/24/outline';

const Feature = ({
  name,
  icon: Icon,
  description,
  link,
}: {
  name: string;
  // it can be any icon
  icon: typeof WifiIcon;
  description: string;
  link?: string;
}) => {
  const children = (
    <div className="relative pl-16">
      <dt className="text-base font-semibold leading-7 text-gray-900">
        <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
          <Icon className="h-6 w-6 text-white" aria-hidden="true" />
        </div>
        {name}
      </dt>
      <dd className="mt-2 text-base leading-7 text-gray-600">{description}</dd>
    </div>
  );

  if (!link) return children;

  return (
    <Link target="_blank" href={link}>
      {children}
    </Link>
  );
};

export default Feature;
