import React from 'react';
import Image from 'next/image';

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const AuthCard = ({ children, title, subtitle }: AuthCardProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md">
        <div className="bg-white px-8 py-10 rounded-2xl shadow-xl">
          <div className="text-center mb-8">
            <Image
              src="/logo.jpg"
              alt="Logo"
              width={60}
              height={60}
              className="mx-auto mb-4"
            />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
            {subtitle && (
              <p className="text-gray-600">{subtitle}</p>
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}; 