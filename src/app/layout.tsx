import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Samas Trail',
  description: 'Nascido no asfalto e criados na trilha',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ToastContainer theme="dark" />
      </body>
    </html>
  );
}
