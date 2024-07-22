import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <header data-animate className="drawer z-50 ">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col my-2 px-2">
        {/* Navbar */}
        <div className="w-full navbar px-6 border-gray-400 shadow-xl rounded-full">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2">
            <Link href="/" className="text-xl font-bold flex items-center">
              <Image
                width={60}
                height={60}
                alt="site logo"
                src="/logo.svg"
                className="mr-2"
              />
              <p>Image compressor</p>
            </Link>
          </div>
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal">
              {/* Navbar menu content here */}
              <li>
                <Link
                  href="/compress"
                  className="btn btn-link no-underline btn-accent border-none"
                >
                  Compress
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200">
          <li>
            <a>Compress</a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
