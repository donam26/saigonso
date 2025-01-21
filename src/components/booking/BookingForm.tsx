'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { BookingFormData, bookingService } from '@/services/booking.service';

interface BookingFormProps {
    customerId: number;
    serviceId: number;
    onSuccess?: (booking: any) => void;
}

export default function BookingForm({ customerId, serviceId, onSuccess }: BookingFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<BookingFormData>();

    const onSubmit = async (data: BookingFormData) => {
        try {
            setIsSubmitting(true);
            const booking = await bookingService.createBooking({
                ...data,
                customer_id: customerId,
                service_id: serviceId
            });
            toast.success('Đặt lịch thành công!');
            onSuccess?.(booking);
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi đặt lịch');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ngày đặt lịch
                </label>
                <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    min={new Date().toISOString().split('T')[0]}
                    {...register('booking_date', { required: 'Vui lòng chọn ngày đặt lịch' })}
                />
                {errors.booking_date && (
                    <p className="mt-1 text-sm text-red-600">{errors.booking_date.message}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Giờ đặt lịch
                </label>
                <input
                    type="time"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    {...register('booking_time', { required: 'Vui lòng chọn giờ đặt lịch' })}
                />
                {errors.booking_time && (
                    <p className="mt-1 text-sm text-red-600">{errors.booking_time.message}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Loại thiết bị
                </label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="VD: Laptop, Điện thoại..."
                    {...register('device_type', { required: 'Vui lòng nhập loại thiết bị' })}
                />
                {errors.device_type && (
                    <p className="mt-1 text-sm text-red-600">{errors.device_type.message}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Model thiết bị
                </label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="VD: iPhone 13, Macbook Pro 2021..."
                    {...register('device_model', { required: 'Vui lòng nhập model thiết bị' })}
                />
                {errors.device_model && (
                    <p className="mt-1 text-sm text-red-600">{errors.device_model.message}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mô tả vấn đề
                </label>
                <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    rows={3}
                    placeholder="Mô tả chi tiết vấn đề của thiết bị..."
                    {...register('problem_description', { required: 'Vui lòng mô tả vấn đề' })}
                />
                {errors.problem_description && (
                    <p className="mt-1 text-sm text-red-600">{errors.problem_description.message}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ghi chú thêm
                </label>
                <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    rows={2}
                    placeholder="Ghi chú thêm (nếu có)..."
                    {...register('note')}
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FF6B00] text-white py-3 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
            >
                {isSubmitting ? 'Đang xử lý...' : 'Đặt lịch ngay'}
            </button>
        </form>
    );
} 