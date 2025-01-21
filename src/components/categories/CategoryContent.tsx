'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatCurrency } from '@/utils/format';
import api from '@/services/api';

const DEFAULT_THUMBNAIL = '/images/default-thumbnail.jpg';

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  sale_price: number | null;
  discount_percent: number;
  thumbnail: string;
  category_id: number;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
}

interface CategoryData {
  category: Category;
  services: Service[];
}

interface Props {
  slug: string;
}

export function CategoryContent({ slug }: Props) {
  const [data, setData] = useState<CategoryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/categories/${slug}`);
        setData(res.data.data);
      } catch (error) {
        console.error('Error fetching category:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[--primary-color]"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Không tìm thấy danh mục</h1>
        <Link href="/" className="text-blue-500 hover:text-blue-600">
          Về trang chủ
        </Link>
      </div>
    );
  }

  const { category, services } = data;

  return (
    <div className="space-y-6">
      {/* Category Header */}
      <div className="relative aspect-[3/1] rounded-lg overflow-hidden">
        <Image
          src={category.thumbnail || DEFAULT_THUMBNAIL}
          alt={category.name}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
          <p className="text-white/90">{category.description}</p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {services.map((service) => (
          <Link
            key={service.id}
            href={`/booking?service=${service.id}`}
            className="bg-white rounded-lg shadow-sm hover:shadow transition-shadow group"
          >
            <div className="relative aspect-square rounded-t-lg overflow-hidden">
              <Image
                src={service.thumbnail || DEFAULT_THUMBNAIL}
                alt={service.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover"
              />
              {service.discount_percent > 0 && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-sm px-2 py-1 rounded">
                  -{service.discount_percent}%
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-medium line-clamp-2 mb-2 group-hover:text-orange-500 transition-colors">
                {service.name}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                {service.description}
              </p>
              <div className="flex items-center gap-2">
                {service.sale_price ? (
                  <>
                    <span className="text-red-500 font-bold">
                      {formatCurrency(service.sale_price)}
                    </span>
                    <span className="text-gray-400 text-sm line-through">
                      {formatCurrency(service.price)}
                    </span>
                  </>
                ) : (
                  <span className="text-gray-900 font-bold">
                    {formatCurrency(service.price)}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {services.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Chưa có dịch vụ nào trong danh mục này
        </div>
      )}
    </div>
  );
} 