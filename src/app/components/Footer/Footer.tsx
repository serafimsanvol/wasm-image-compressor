import Link from 'next/link';

export default function Footer() {
  return (
    <footer data-animate className="mt-4 footer footer-center gap-4">
      <nav className="grid grid-flow-col">
        <Link className="link link-hover" href={'/terms-of-service'}>
          Terms of Service
        </Link>
        <Link className="link link-hover" href={'/privacy'}>
          Privacy policy
        </Link>
      </nav>
      <p className="flex mb-4">
        A project by{' '}
        <a
          className="font-semibold underline-offset-4 transition-colors hover:underline text-primary"
          href="https://yusyp.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          yusyp.dev
        </a>
      </p>
    </footer>
  );
}
