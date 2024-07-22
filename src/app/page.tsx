import Link from 'next/link';
import Features from './components/Features/Features';
import ObserverWrapper from './components/ObserverWrapper/ObserverWrapper';
import Image from 'next/image';

const Page = () => {
  return (
    <main className="bg-white">
      <div
        data-animate
        className="relative isolate px-6 lg:px-8 flex min-h-screen"
      >
        <div className="py-16 flex md:flex-row items-center flex-col">
          <Image
            width={400}
            height={400}
            alt="site logo"
            src="/logo.svg"
            className="mr-2"
          />
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Compress your images with ease on your device
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Free, secure, open-source and easy-to-use image compressor that
              allows you to compress your images on your device, without
              uploading them to any server.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/compress"
                className="btn btn-lg rounded-md bg-primary font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Features />
      <ObserverWrapper />
    </main>
  );
};

export default Page;
