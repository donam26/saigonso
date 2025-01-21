import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import './globals.css';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FastCare - Dịch vụ sửa chữa điện thoại, máy tính',
  description: 'Dịch vụ sửa chữa điện thoại, máy tính, tablet chuyên nghiệp',
};

// Cấu hình cho next/image
export const images = {
  remotePatterns: [
    {
      protocol: 'http',
      hostname: '127.0.0.1',
      port: '8000',
      pathname: '/storage/**',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
