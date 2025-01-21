'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatCurrency } from '@/utils/format';
import api from '@/services/api';
import { ENV_CONFIG } from '@/config/env.config';

const DEFAULT_THUMBNAIL = '/images/default-thumbnail.jpg';

const getImageUrl = (path: string | null) => {
  if (!path) return DEFAULT_THUMBNAIL;
  if (path.startsWith('http')) return path;
  return `${ENV_CONFIG.API_STORAGE_URL}/${path}`;
};

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
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
}

export function HomeContent() {
  const [flashSaleServices, setFlashSaleServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryServices, setCategoryServices] = useState<Record<number, Service[]>>({});
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState({
    hours: 12,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        const totalSeconds = prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;
        if (totalSeconds <= 0) {
          // Reset về 12 giờ khi hết giờ
          return { hours: 12, minutes: 0, seconds: 0 };
        }
        return {
          hours: Math.floor(totalSeconds / 3600),
          minutes: Math.floor((totalSeconds % 3600) / 60),
          seconds: totalSeconds % 60
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch flash sale services
        const flashSaleRes = await api.get('/services/flash-sale');
        const flashSaleData = flashSaleRes.data;
        setFlashSaleServices(flashSaleData.data);

        // Fetch categories
        const categoriesRes = await api.get('/categories');
        const categoriesData = categoriesRes.data;
        setCategories(categoriesData.data);

        // Fetch services for each category
        const servicesData: Record<number, Service[]> = {};
        for (const category of categoriesData.data) {
          const servicesRes = await api.get('/services', {
            params: {
              category_id: category.id,
              limit: 8
            }
          });
          servicesData[category.id] = servicesRes.data.data;
        }
        setCategoryServices(servicesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[--primary-color]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Banner */}
      <div className="relative aspect-[16/9] md:aspect-[21/9] lg:aspect-[3/1] rounded-lg overflow-hidden">
        <Image
          src="/banner.webp"
          alt="Tết Sale"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Flash Sale */}
      {flashSaleServices.length > 0 && (
        <div className="bg-gradient-to-r from-[--primary-color] to-[--primary-dark-color] rounded-2xl p-4 lg:p-6">
          <div className="flex flex-wrap items-center gap-3 text-white mb-4">
            <div className="flex items-center gap-2">
              <i className="fas fa-bolt text-2xl"></i>
              <h2 className="text-xl font-bold">Flash Sale</h2>
            </div>
            <div className="flex gap-2 ml-auto">
              <div className="flash-sale-countdown">
                {String(countdown.hours).padStart(2, '0')}
              </div>
              <div className="flash-sale-countdown">
                {String(countdown.minutes).padStart(2, '0')}
              </div>
              <div className="flash-sale-countdown">
                {String(countdown.seconds).padStart(2, '0')}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
            {flashSaleServices.map((service) => (
              <Link 
                key={service.id} 
                href={`/services/${service.slug}`}
                className="flash-sale-item"
              >
                <div className="relative aspect-square">
                  <Image
                    src={getImageUrl(service.thumbnail)}
                    alt={service.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover"
                  />
                  <div className="flash-sale-badge">
                    -{service.discount_percent}%
                  </div>
                </div>
                <div className="p-4 bg-white/10 backdrop-blur-sm">
                  <h3 className="font-medium text-white line-clamp-2 mb-2 group-hover:text-white/90 transition-colors">
                    {service.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold">
                      {formatCurrency(service.sale_price || 0)}
                    </span>
                    <span className="text-white/70 text-sm line-through">
                      {formatCurrency(service.price)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Categories and their services */}
      {categories.map((category) => (
        <div key={category.id}>
          <div className="flex items-center gap-3 mb-4">
            <i className={`fas fa-${category.id === 1 ? 'mobile-alt' : 'laptop'} text-xl text-[--primary-color]`}></i>
            <h2 className="text-lg font-bold">{category.name}</h2>
            <Link 
              href={`/categories/${category.slug}`} 
              className="ml-auto text-[--primary-color] hover:text-[--primary-dark-color] text-sm font-medium flex items-center gap-1"
            >
              Xem tất cả
              <i className="fas fa-chevron-right text-xs"></i>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
            {categoryServices[category.id]?.map((service) => (
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
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover"
                  />
                  {service.discount_percent > 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-sm px-2 py-1 rounded">
                      -{service.discount_percent}%
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-medium line-clamp-2 mb-2 group-hover:text-[--primary-color] transition-colors">
                    {service.name}
                  </h3>
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
        </div>
      ))}
    </div>
  );
} 