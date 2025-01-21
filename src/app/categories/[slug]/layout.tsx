'use client';

import { Sidebar } from '@/components/layout/Sidebar';

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-72 shrink-0">
            <div className="lg:sticky lg:top-4">
              <Sidebar />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
} 