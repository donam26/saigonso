'use client';

import Link from 'next/link';
import { useState } from 'react';

const menuItems = [
  {
    icon: '📱',
    label: 'Sửa Điện Thoại',
    subItems: [
      { label: 'iPhone', href: '/dich-vu/sua-iphone' },
      { label: 'Samsung', href: '/dich-vu/sua-samsung' },
      { label: 'Khác', href: '/dich-vu/sua-dien-thoai-khac' },
    ],
  },
  {
    icon: '💻',
    label: 'Sửa Laptop',
    href: '/dich-vu/sua-laptop',
  },
  {
    icon: '📱',
    label: 'Sửa Tablet',
    href: '/dich-vu/sua-tablet',
  },
  {
    icon: '⌚',
    label: 'Sửa Apple Watch',
    href: '/dich-vu/sua-apple-watch',
  },
  {
    icon: '🎧',
    label: 'Sửa Airpods',
    href: '/dich-vu/sua-airpods',
  },
  {
    icon: '🔧',
    label: 'Phụ Kiện',
    href: '/phu-kien',
  },
  {
    icon: '📝',
    label: 'Blog Thủ Thuật',
    href: '/blog',
  },
];

export function Sidebar() {
  const [openItem, setOpenItem] = useState<number | null>(null);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-bold mb-4">Danh mục dịch vụ</h2>
      <ul className="space-y-2">
        {menuItems.map((item, index) => (
          <li key={index}>
            {item.subItems ? (
              <div>
                <button
                  className="w-full flex items-center justify-between p-2 hover:bg-orange-50 rounded-lg transition-colors"
                  onClick={() => setOpenItem(openItem === index ? null : index)}
                >
                  <span className="flex items-center gap-2">
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      openItem === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openItem === index && (
                  <ul className="ml-8 mt-2 space-y-1">
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          href={subItem.href}
                          className="block p-2 hover:text-orange-500 transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <Link
                href={item.href || '#'}
                className="flex items-center gap-2 p-2 hover:bg-orange-50 rounded-lg transition-colors"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
} 