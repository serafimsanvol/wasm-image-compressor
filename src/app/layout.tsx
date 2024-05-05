import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

const lato = Lato({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: 'Free image compressor',
  description: 'Free, secure, open-source and easy-to-use image compressor',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${lato.className} mx-auto max-w-7xl`}>
        <Header />
        {children}
        <Footer />
      </body>
      {/* some incredible bug https://github.com/microsoft/clarity/issues/247#issuecomment-1259421430 */}
      <Script id="ms-clarity">
        {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "lqvong8em9");`}
      </Script>
    </html>
  );
}
