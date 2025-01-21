'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BookingForm from '@/components/booking/BookingForm';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-toastify';

interface ServiceDetails {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
}

export default function BookingPage({ params }: { params: { serviceId: string } }) {
    const router = useRouter();
    const { user } = useAuth();
    const [service, setService] = useState<ServiceDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            toast.error('Vui lòng đăng nhập để đặt lịch');
            router.push('/dang-nhap');
            return;
        }

        const fetchService = async () => {
            try {
                const response = await fetch(`/api/services/${params.serviceId}`);
                const data = await response.json();
                if (data.status === 'success') {
                    setService(data.data);
                }
            } catch (error) {
                toast.error('Không thể tải thông tin dịch vụ');
            } finally {
                setIsLoading(false);
            }
        };

        fetchService();
    }, [params.serviceId, user, router]);

    const handleBookingSuccess = () => {
        router.push('/lich-hen');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF6B00]"></div>
            </div>
        );
    }

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Không tìm thấy dịch vụ</h1>
                    <p className="text-gray-600 mb-4">Dịch vụ bạn tìm kiếm không tồn tại hoặc đã bị xóa</p>
                    <button
                        onClick={() => router.back()}
                        className="text-[#FF6B00] hover:underline"
                    >
                        Quay lại
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                        <h1 className="text-2xl font-bold text-gray-800 mb-6">
                            Đặt lịch dịch vụ
                        </h1>

                        <div className="mb-8 p-4 bg-orange-50 rounded-lg">
                            <h2 className="font-medium text-gray-800 mb-2">
                                {service.name}
                            </h2>
                            <p className="text-gray-600 mb-2">
                                {service.description}
                            </p>
                            <p className="text-[#FF6B00] font-medium">
                                Giá: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(service.price)}
                            </p>
                        </div>

                        <BookingForm
                            customerId={user?.id}
                            serviceId={service.id}
                            onSuccess={handleBookingSuccess}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
} 