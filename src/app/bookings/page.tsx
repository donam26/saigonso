'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { bookingService } from '@/services/booking.service';
import { toast } from 'react-hot-toast';

interface BookingForm {
    service_id: number;
    customer_name: string;
    phone_number: string;
    device_type: string;
    device_model: string;
    problem_description: string;
    booking_date: string;
    booking_time: string;
    note?: string;
}

const DEVICE_TYPES = [
    { id: 'phone', name: 'Điện thoại' },
    { id: 'laptop', name: 'Laptop' },
    { id: 'tablet', name: 'Máy tính bảng' },
    { id: 'watch', name: 'Đồng hồ thông minh' },
];

const TIME_SLOTS = {
    'SÁNG': ['08:00', '09:00', '10:00', '11:00', '12:00'],
    'CHIỀU': ['13:00', '14:00', '15:00', '16:00', '17:00'],
    'TỐI': ['18:00', '19:00', '20:00', '21:00']
};

export default function BookingPage() {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [form, setForm] = useState<BookingForm>({
        service_id: 0, // Sẽ được set khi chọn dịch vụ
        customer_name: '',
        phone_number: '',
        device_type: '',
        device_model: '',
        problem_description: '',
        booking_date: '',
        booking_time: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [timeSlots, setTimeSlots] = useState<Record<string, string[]>>(TIME_SLOTS);

    // Tạo mảng ngày trong 2 tuần tới
    const dates = Array.from({ length: 14 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return {
            date: date.toISOString().split('T')[0],
            dayName: new Intl.DateTimeFormat('vi-VN', { weekday: 'short' }).format(date),
            dayNumber: date.getDate(),
            month: (date.getMonth() + 1).toString().padStart(2, '0')
        };
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDateSelect = (date: string) => {
        setSelectedDate(date);
        setForm(prev => ({ ...prev, booking_date: date }));
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
        setForm(prev => ({ ...prev, booking_time: time }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setIsSubmitting(true);
            const booking = await bookingService.createBooking(form);
            toast.success('Đặt lịch thành công!');
            router.push('/booking/success');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi đặt lịch');
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (selectedDate) {
            bookingService.getAvailableTimeSlots(selectedDate)
                .then(data => {
                    setTimeSlots(data);
                })
                .catch(error => {
                    console.error('Error fetching time slots:', error);
                    toast.error('Không thể tải danh sách khung giờ');
                });
        }
    }, [selectedDate]);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Đặt Lịch Sửa Chữa</h1>
                        <p className="text-gray-600">Chúng tôi sẽ liên hệ với bạn trong vòng 15 phút sau khi nhận được yêu cầu</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Thông tin khách hàng */}
                            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Thông Tin Khách Hàng</h2>
                                <div className="space-y-6">
                                    <Input
                                        label="Họ và tên"
                                        name="customer_name"
                                        value={form.customer_name}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="VD: Nguyễn Văn A"
                                    />
                                    <Input
                                        label="Số điện thoại"
                                        name="phone_number"
                                        value={form.phone_number}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="VD: 0912345678"
                                    />
                                </div>
                            </div>

                            {/* Thông tin thiết bị */}
                            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Thông Tin Thiết Bị</h2>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Loại thiết bị
                                        </label>
                                        <select
                                            name="device_type"
                                            value={form.device_type}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                            required
                                        >
                                            <option value="">Chọn loại thiết bị</option>
                                            {DEVICE_TYPES.map(type => (
                                                <option key={type.id} value={type.id}>
                                                    {type.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <Input
                                        label="Tên dòng máy"
                                        name="device_model"
                                        value={form.device_model}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="VD: iPhone 14 Pro Max"
                                    />
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Mô tả lỗi
                                        </label>
                                        <textarea
                                            name="problem_description"
                                            value={form.problem_description}
                                            onChange={handleInputChange}
                                            rows={3}
                                            className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                            placeholder="VD: Màn hình bị vỡ góc phải"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Chọn ngày và giờ */}
                        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Thời Gian Sửa Chữa</h2>
                            
                            {/* Chọn ngày */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Chọn ngày</h3>
                                <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                                    {dates.map(({ date, dayName, dayNumber, month }) => (
                                        <button
                                            key={date}
                                            type="button"
                                            onClick={() => handleDateSelect(date)}
                                            className={`flex-shrink-0 w-24 p-3 rounded-xl border-2 transition-all hover:shadow-md ${
                                                selectedDate === date
                                                    ? 'border-[--primary-color] bg-orange-50 text-[--primary-color] shadow-md'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            <div className="text-sm font-medium">{dayName}</div>
                                            <div className="text-xl font-bold">{dayNumber}</div>
                                            <div className="text-sm">Tháng {month}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Chọn giờ */}
                            {selectedDate && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Chọn giờ</h3>
                                    <div className="space-y-6">
                                        {Object.entries(TIME_SLOTS).map(([period, times]) => (
                                            <div key={period}>
                                                <h4 className="text-sm font-medium text-gray-500 mb-3">{period}</h4>
                                                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                                                    {times.map(time => (
                                                        <button
                                                            key={time}
                                                            type="button"
                                                            onClick={() => handleTimeSelect(time)}
                                                            className={`p-3 rounded-xl border-2 text-center transition-all hover:shadow-md ${
                                                                selectedTime === time
                                                                    ? 'border-[--primary-color] bg-orange-50 text-[--primary-color] shadow-md'
                                                                    : 'border-gray-200 hover:border-gray-300'
                                                            }`}
                                                        >
                                                            {time}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 px-6 text-white text-lg font-medium bg-[--primary-color] rounded-xl hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!selectedDate || !selectedTime}
                        >
                            Xác Nhận Đặt Lịch
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
} 