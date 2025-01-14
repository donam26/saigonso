import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FastCare - Dịch vụ sửa chữa điện thoại, máy tính chuyên nghiệp',
  description: 'Hệ thống sửa chữa điện thoại, máy tính, tablet uy tín tại TPHCM',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
        {/* Floating buttons */}
        <div className="fixed bottom-4 right-4 flex flex-col gap-2">
          <a
            href="tel:18002057"
            className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>1800 2057</span>
          </a>
          <a
            href="https://zalo.me/1800205"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.49 10.272v-.45h1.347v6.322h-.77a.576.576 0 01-.577-.573v.001a3.273 3.273 0 01-1.938.632 3.284 3.284 0 01-3.284-3.282 3.284 3.284 0 013.284-3.282c.7 0 1.347.205 1.938.632zm-1.939-.367a2.377 2.377 0 00-2.379 2.374 2.377 2.377 0 002.379 2.374 2.377 2.377 0 002.379-2.374 2.377 2.377 0 00-2.379-2.374zm7.94-.368c.342 0 .672.041.99.116v1.278a2.525 2.525 0 00-.99-.2 2.262 2.262 0 00-2.264 2.256 2.262 2.262 0 002.264 2.256c.342 0 .672-.041.99-.199v1.278a3.94 3.94 0 01-.99.116 3.284 3.284 0 01-3.284-3.282 3.284 3.284 0 013.284-3.282V9.537zM4.55 9.854h1.938v6.322H4.55V9.854z"/>
            </svg>
            <span>Zalo</span>
          </a>
          <a
            href="https://m.me/fastcare"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#0084ff] text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.145 2 11.259c0 2.913 1.454 5.512 3.726 7.21V22l3.405-1.869c.909.252 1.871.388 2.869.388 5.523 0 10-4.145 10-9.259S17.523 2 12 2zm.994 12.469l-2.546-2.716-4.97 2.716 5.467-5.803 2.609 2.716 4.906-2.716-5.466 5.803z"/>
            </svg>
            <span>Messenger</span>
          </a>
        </div>
      </body>
    </html>
  );
}
