'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatCurrency } from '@/utils/format';
import serviceService, { Service } from '@/services/service.service';
import { motion } from 'framer-motion';
import { ENV_CONFIG } from '@/config/env.config';

const DEFAULT_THUMBNAIL = '/images/default-thumbnail.jpg';

const getImageUrl = (path: string | null) => {
  if (!path) return DEFAULT_THUMBNAIL;
  if (path.startsWith('http')) return path;
  return `${ENV_CONFIG.API_STORAGE_URL}/${path}`;
};

interface Props {
  slug: string;
}

export function ServiceDetail({ slug }: Props) {
  const [service, setService] = useState<Service | null>(null);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const serviceData = await serviceService.getService(slug);
        setService(serviceData);

        // Fetch related services
        if (serviceData.category_id) {
          const relatedData = await serviceService.getRelatedServices(
            serviceData.category_id,
            serviceData.id
          );
          setRelatedServices(relatedData);
        }
      } catch (err) {
        setError('Không thể tải thông tin dịch vụ');
        console.error('Error fetching service:', err);
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

  if (error || !service) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {error || 'Không tìm thấy dịch vụ'}
        </h1>
        <Link href="/" className="text-primary hover:text-[--primary-dark-color]">
          Về trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 lg:p-8">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-square rounded-xl overflow-hidden group"
          >
            <Image
              src={getImageUrl(service.thumbnail) || DEFAULT_THUMBNAIL}
              alt={service.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority
            />
            {service.discount_percent > 0 && (
              <div className="absolute top-4 right-4 bg-[--primary-color] text-white px-3 py-1.5 rounded-full text-sm font-medium">
                Giảm {service.discount_percent}%
              </div>
            )}
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <Link href="/" className="hover-text-primary">
                Trang chủ
              </Link>
              <i className="fas fa-chevron-right text-xs"></i>
              {service.category && (
                <>
                  <Link
                    href={`/categories/${service.category.slug}`}
                    className="hover-text-primary"
                  >
                    {service.category.name}
                  </Link>
                  <i className="fas fa-chevron-right text-xs"></i>
                </>
              )}
              <span className="text-gray-900">{service.name}</span>
            </nav>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {service.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              {service.sale_price ? (
                <>
                  <span className="text-3xl font-bold text-[--primary-color]">
                    {formatCurrency(service.sale_price)}
                  </span>
                  <span className="text-xl text-gray-400 line-through">
                    {formatCurrency(service.price)}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-gray-900">
                  {formatCurrency(service.price)}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="prose prose-sm max-w-none mb-6">
              <p className="text-gray-600">{service.description}</p>
            </div>

            {/* Additional Info */}
            {service.estimated_time && (
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <i className="far fa-clock"></i>
                <span>Thời gian ước tính: {service.estimated_time}</span>
              </div>
            )}

            {/* Book Button */}
            <Link
              href={`/booking?service_id=${service.id}`}
              className="btn-primary inline-flex items-center justify-center px-8 py-4 rounded-xl"
            >
              <i className="fas fa-calendar-alt mr-2"></i>
              Đặt lịch ngay
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Dịch vụ liên quan
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedServices.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="relative aspect-square rounded-t-xl overflow-hidden">
                  <Image
                    src={getImageUrl(service.thumbnail) || DEFAULT_THUMBNAIL}
                    alt={service.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {service.discount_percent > 0 && (
                    <div className="absolute top-2 right-2 bg-[--primary-color] text-white text-sm px-2 py-1 rounded-full">
                      -{service.discount_percent}%
                    </div>
                  )}
                </div>
                <div className="p-4">
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
        </motion.div>
      )}
    </div>
  );
} 