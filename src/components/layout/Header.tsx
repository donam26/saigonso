'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LOGO_PATH = '/logo.jpg';

export function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="bg-white shadow-sm">
      {/* Top banner */}
      <div className="bg-gradient-to-r from-[--primary-color] to-[--primary-dark-color] text-white text-center py-2 text-sm">
        <span className="font-medium">Tết Sale lớn - Giảm đến 40% 🎉</span>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-10 h-10">
              <Image
                src={LOGO_PATH}
                alt="FastCare"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-2xl font-bold text-[--primary-color]">FastCare</span>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm dịch vụ..."
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:border-[--primary-color] focus:ring-1 focus:ring-[--primary-color] focus:outline-none"
              />
              <button type="submit" className="absolute inset-y-0 left-0 pl-4 flex items-center">
                <i className="fas fa-search text-gray-400 hover:text-[--primary-color]"></i>
              </button>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
                </button>
              )}
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-6">
            <Link 
              href="/bookings" 
              className="flex flex-col items-center text-gray-700 hover:text-[--primary-color] transition-colors"
            >
              <i className="fas fa-calendar-alt text-xl mb-1"></i>
              <span className="text-xs">Đặt lịch</span>
            </Link>
            <Link 
              href="/cart" 
              className="flex flex-col items-center text-gray-700 hover:text-[--primary-color] transition-colors"
            >
              <div className="relative">
                <i className="fas fa-shopping-cart text-xl mb-1"></i>
                <span className="absolute -top-2 -right-2 bg-[--primary-color] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  0
                </span>
              </div>
              <span className="text-xs">Giỏ hàng</span>
            </Link>
            <Link 
              href="/policy" 
              className="flex flex-col items-center text-gray-700 hover:text-[--primary-color] transition-colors"
            >
              <i className="fas fa-headset text-xl mb-1"></i>
              <span className="text-xs">Chính sách</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 