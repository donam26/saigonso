'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import api from '@/services/api';

interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
}

interface MenuItem {
  icon: string;
  label: string;
  href: string;
  color?: string;
}

const staticMenuItems: MenuItem[] = [
  {
    icon: 'fas fa-bolt',
    label: 'FLASH SALE',
    href: '/flash-sale',
    color: 'text-[--primary-color]'
  },
 
];

export function Sidebar() {
  const pathname = usePathname();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const menuItems: MenuItem[] = [
    staticMenuItems[0], // Flash Sale luôn ở đầu
    ...categories?.map(category => ({
      icon: category.icon || 'fas fa-wrench',
      label: category.name,
      href: `/categories/${category.slug}`,
    } as MenuItem)),
    ...staticMenuItems.slice(1) // Các mục tĩnh khác ở cuối
  ];

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-10 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4">
        <h2 className="font-bold text-gray-800 mb-4">Danh mục dịch vụ</h2>
        <div className="flex flex-col gap-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                pathname === item.href
                  ? 'bg-[--primary-color]/10 text-[--primary-color]'
                  : 'hover:bg-gray-50'
              }`}
            >
              <i className={`${item.icon} w-5 ${item.color || 'text-gray-600'}`}></i>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 