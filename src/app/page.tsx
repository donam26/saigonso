'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RepairCategory } from '@/types/service';
import { repairService } from '@/services/api';
import { Sidebar } from '@/components/layout/Sidebar';

export default function HomePage() {
  const [categories, setCategories] = useState<RepairCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await repairService.getCategories();
      setCategories(response.data);
    } catch (err) {
      setError('Không thể tải danh sách dịch vụ');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="col-span-12 lg:col-span-3">
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="col-span-12 lg:col-span-9">
          {/* Banner */}
          <div className="mb-8">
            <Image
              src="/images/banner.jpg"
              alt="Khuyến mãi"
              width={1200}
              height={400}
              className="rounded-lg w-full"
            />
          </div>

          {/* Brand list */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Sửa chữa theo dòng máy</h2>
            <div className="grid grid-cols-6 gap-4">
              {['iPhone', 'Samsung', 'Oppo', 'Xiaomi', 'Vivo', 'Huawei'].map((brand) => (
                <Link
                  key={brand}
                  href={`/dich-vu/sua-${brand.toLowerCase()}`}
                  className="flex flex-col items-center gap-2 p-4 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Image
                    src={`/brands/${brand.toLowerCase()}.png`}
                    alt={brand}
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                  <span className="text-sm font-medium">{brand}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Flash sale */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center gap-4 text-white mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h2 className="text-xl font-bold">Flash Sale</h2>
              <div className="flex gap-2">
                <div className="bg-white text-orange-600 px-2 py-1 rounded">
                  <span className="font-bold">12</span>
                </div>
                <div className="bg-white text-orange-600 px-2 py-1 rounded">
                  <span className="font-bold">45</span>
                </div>
                <div className="bg-white text-orange-600 px-2 py-1 rounded">
                  <span className="font-bold">30</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-white rounded-lg p-4">
                  <div className="relative mb-2">
                    <Image
                      src="/products/battery.jpg"
                      alt="Pin iPhone"
                      width={200}
                      height={200}
                      className="w-full rounded-lg"
                    />
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      -40%
                    </span>
                  </div>
                  <h3 className="font-medium mb-1">Pin iPhone 12 Pro Max</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-red-500 font-bold">790.000đ</span>
                    <span className="text-gray-400 text-sm line-through">1.290.000đ</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Service categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/dich-vu/${category.slug}`}
                className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                    <Image
                      src={category.icon || '/icons/default.png'}
                      alt={category.name}
                      width={32}
                      height={32}
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-orange-500">
                    {category.name}
                  </h3>
                  <p className="text-gray-600">
                    {category.description || 'Dịch vụ sửa chữa chuyên nghiệp, uy tín'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
