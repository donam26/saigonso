'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import api from '@/services/api';
import { formatCurrency } from '@/utils/format';

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  sale_price: number | null;
  discount_percent: number;
  thumbnail: string;
  category_id: number;
  slug: string;
  category?: {
    id: number;
    name: string;
    slug: string;
  };
}

const DEFAULT_THUMBNAIL = '/images/default-thumbnail.jpg';

const getImageUrl = (path: string | null) => {
  if (!path) return DEFAULT_THUMBNAIL;
  if (path.startsWith('http')) return path;
  return `${process.env.NEXT_PUBLIC_API_URL}/storage/${path}`;
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await api.get('/services/search', {
          params: { q: query }
        });
        setServices(response.data.data);
      } catch (error) {
        console.error('Error searching services:', error);
        setError('Có lỗi xảy ra khi tìm kiếm');
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchServices();
    }
  }, [query]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm">
                <div className="aspect-square bg-gray-100 rounded-t-lg"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="text-red-500 mb-4">{error}</div>
        <Link href="/" className="text-[--primary-color] hover:underline">
          Về trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Kết quả tìm kiếm cho "{query}"
        </h1>
        <p className="text-gray-600 mt-2">
          Tìm thấy {services.length} dịch vụ
        </p>
      </div>

      {services.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            Không tìm thấy dịch vụ nào phù hợp với từ khóa "{query}"
          </div>
          <Link href="/" className="text-[--primary-color] hover:underline">
            Về trang chủ
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="bg-white rounded-lg shadow-sm hover:shadow transition-shadow group"
            >
              <div className="relative aspect-square rounded-t-lg overflow-hidden">
                <Image
                  src={getImageUrl(service.thumbnail)}
                  alt={service.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {service.discount_percent > 0 && (
                  <div className="absolute top-2 right-2 bg-[--primary-color] text-white text-sm px-2 py-1 rounded-full">
                    -{service.discount_percent}%
                  </div>
                )}
              </div>
              <div className="p-4">
                {service.category && (
                  <div className="text-sm text-gray-500 mb-2">
                    {service.category.name}
                  </div>
                )}
                <h3 className="font-medium line-clamp-2 mb-2 group-hover:text-[--primary-color] transition-colors">
                  {service.name}
                </h3>
                <div className="flex items-center gap-2">
                  {service.sale_price ? (
                    <>
                      <span className="text-[--primary-color] font-bold">
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
      )}
    </div>
  );
} 