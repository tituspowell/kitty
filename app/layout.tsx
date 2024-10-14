// The root layout that Next.js uses, with the body tag. The Navbar component is here,
// meaning it is shared across all pages of the website.

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Navbar from './components/Navbar';
import { ThemeProvider } from './contexts/ThemeContext';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Kitty',
  description:
    'React and Next.js demo app by Titus Powell featuring a ridiculously cute kitten',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {/* At the moment the theme context provider is only used in the ThemeSwitch component in the navbar, so we don't need to wrap the whole app like this */}
          <div className='flex flex-col min-h-screen'>
            <Navbar />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
