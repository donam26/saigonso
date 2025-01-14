'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { RepairService } from '@/types/service';
import { repairService } from '@/services/api';
import { Input } from '@/components/ui/Input';

export default function ServiceDetailPage() {
  const params = useParams();
  const [service, setService] = useState<RepairService | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadService();
  }, [params.slug]);

  const loadService = async () => {
    try {
      // Trong thực tế, bạn cần API endpoint để lấy service by slug
      const response = await repairService.getCategories();
      const category = response.data.find(cat => 
        cat.services?.some(service => service.slug === params.slug)
      );
      const foundService = category?.services?.find(s => s.slug === params.slug);
      if (foundService) {
        setService(foundService);
      } else {
        setError('Không tìm thấy dịch vụ');
      }
    } catch (err) {
      setError('Không thể tải thông tin dịch vụ');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!service) return;

    setSubmitting(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const bookingData = {
      customer_name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      service_id: service.id,
      device_type: formData.get('device_type') as string,
      device_model: formData.get('device_model') as string,
      problem_description: formData.get('problem') as string,
      preferred_time: formData.get('preferred_time') as string,
      address: formData.get('address') as string,
    };

    try {
      await repairService.createBooking(bookingData);
      setBookingSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError('Có lỗi xảy ra khi đặt lịch. Vui lòng thử lại.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {error || 'Không tìm thấy dịch vụ'}
          </h1>
          <a
            href="/"
            className="text-orange-500 hover:text-orange-600"
          >
            Quay lại trang chủ
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {bookingSuccess ? (
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Đặt Lịch Thành Công!
            </h2>
            <p className="text-gray-600 mb-6">
              Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất để xác nhận lịch hẹn.
            </p>
            <a
              href="/"
              className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Quay Lại Trang Chủ
            </a>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <Image
                    src={service.image || '/images/default-service.jpg'}
                    alt={service.name}
                    width={400}
                    height={300}
                    className="h-full w-full object-cover md:w-96"
                  />
                </div>
                <div className="p-8">
                  <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    {service.name}
                  </h1>
                  <div className="text-gray-600 mb-4">
                    {service.description}
                  </div>
                  <div className="mb-4">
                    <span className="text-lg font-semibold text-gray-800">
                      Giá từ: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(service.base_price)}
                    </span>
                    {service.price_note && (
                      <span className="text-sm text-gray-500 ml-2">
                        ({service.price_note})
                      </span>
                    )}
                  </div>
                  {service.service_details && (
                    <div className="prose prose-orange">
                      <h3 className="text-xl font-semibold mb-2">Chi tiết dịch vụ:</h3>
                      <div dangerouslySetInnerHTML={{ __html: service.service_details }} />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Đặt Lịch Sửa Chữa</h2>
              
              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Họ và tên"
                  name="name"
                  type="text"
                  required
                  placeholder="Nhập họ và tên của bạn"
                />

                <Input
                  label="Số điện thoại"
                  name="phone"
                  type="tel"
                  required
                  placeholder="Nhập số điện thoại"
                />

                <Input
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Nhập email của bạn (không bắt buộc)"
                />

                <Input
                  label="Loại thiết bị"
                  name="device_type"
                  type="text"
                  required
                  placeholder="VD: iPhone, Samsung, Macbook..."
                />

                <Input
                  label="Model thiết bị"
                  name="device_model"
                  type="text"
                  required
                  placeholder="VD: iPhone 12 Pro Max, Galaxy S21..."
                />

                <Input
                  label="Thời gian mong muốn"
                  name="preferred_time"
                  type="datetime-local"
                  className="w-full"
                />

                <div className="md:col-span-2">
                  <Input
                    label="Địa chỉ"
                    name="address"
                    type="text"
                    placeholder="Nhập địa chỉ của bạn (nếu cần sửa chữa tại nhà)"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mô tả vấn đề
                  </label>
                  <textarea
                    name="problem"
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Mô tả chi tiết vấn đề bạn đang gặp phải"
                  ></textarea>
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Đang xử lý...' : 'Đặt Lịch Ngay'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 