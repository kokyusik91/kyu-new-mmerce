import './globals.css';
import type { Metadata } from 'next';

import { Urbanist } from 'next/font/google';

import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import ModalProvider from '@/providers/ModalProvider';
import ToasterProvider from '@/providers/ToastProvider';

const font = Urbanist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Store',
  description: 'Store',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={font.className}>
        <ModalProvider />
        <ToasterProvider />
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
