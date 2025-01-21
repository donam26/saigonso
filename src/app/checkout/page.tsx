'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Input } from '@/components/ui/Input';
import { RepairService } from '@/types/service';

interface CartItem {
    service: RepairService;
    deviceType: string;
    deviceModel: string;
    problemDescription: string;
}

interface BookingForm {
    customerName: string;
    phoneNumber: string;
    deviceType: string;
    problemDescription: string;
    storeId: string;
    bookingDate: string;
    bookingTime: string;
}

const STORES = [
    { id: '1', name: 'FastCare Đà Nẵng', address: '123 Nguyễn Văn Linh, Hải Châu, Đà Nẵng' },
    { id: '2', name: 'FastCare Hà Nội', address: '456 Cầu Giấy, Hà Nội' },
    { id: '3', name: 'FastCare Hồ Chí Minh', address: '789 Lê Lợi, Quận 1, TP.HCM' },
];

const TIME_SLOTS = {
    'SÁNG': ['08:00', '09:00', '10:00', '11:00', '12:00'],
    'CHIỀU': ['13:00', '14:00', '15:00', '16:00', '17:00'],
    'TỐI': ['18:00', '19:00', '20:00', '21:00']
};

export default function CheckoutPage() {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [form, setForm] = useState<BookingForm>({
        customerName: '',
        phoneNumber: '',
        deviceType: '',
        problemDescription: '',
        storeId: '',
        bookingDate: '',
        bookingTime: ''
    });

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

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        } else {
            router.push('/cart');
        }
    }, [router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDateSelect = (date: string) => {
        setSelectedDate(date);
        setForm(prev => ({ ...prev, bookingDate: date }));
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
        setForm(prev => ({ ...prev, bookingTime: time }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // TODO: Gọi API đặt lịch
            console.log('Form data:', form);
            console.log('Cart items:', cartItems);
            
            localStorage.removeItem('cart');
            router.push('/checkout/success');
        } catch (error) {
            console.error('Error submitting booking:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Đặt lịch sửa chữa</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Thông tin khách hàng */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Thông tin khách hàng</h2>
                            <div className="space-y-4">
                                <Input
                                    label="Họ và tên"
                                    name="customerName"
                                    value={form.customerName}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="VD: Nguyễn Văn A"
                                />
                                <Input
                                    label="Số điện thoại"
                                    name="phoneNumber"
                                    value={form.phoneNumber}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="VD: 0912345678"
                                />
                            </div>
                        </div>

                        {/* Thông tin thiết bị */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Thông tin thiết bị</h2>
                            <div className="space-y-4">
                                <Input
                                    label="Tên dòng máy"
                                    name="deviceType"
                                    value={form.deviceType}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="VD: iPhone 14 Pro Max"
                                />
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Lý do hư máy
                                    </label>
                                    <textarea
                                        name="problemDescription"
                                        value={form.problemDescription}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        placeholder="VD: Màn hình bị vỡ góc phải"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Chọn cửa hàng */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Chọn cửa hàng</h2>
                            <select
                                name="storeId"
                                value={form.storeId}
                                onChange={handleInputChange}
                                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                required
                            >
                                <option value="">Vui lòng lựa chọn cửa hàng đến nhận sản phẩm</option>
                                {STORES.map(store => (
                                    <option key={store.id} value={store.id}>
                                        {store.name} - {store.address}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Chọn ngày */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Chọn ngày</h2>
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {dates.map(({ date, dayName, dayNumber, month }) => (
                                    <button
                                        key={date}
                                        type="button"
                                        onClick={() => handleDateSelect(date)}
                                        className={`flex-shrink-0 w-20 p-2 rounded-lg border-2 transition-colors ${
                                            selectedDate === date
                                                ? 'border-[--primary-color] bg-orange-50 text-[--primary-color]'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <div className="text-sm font-medium">{dayName}</div>
                                        <div className="text-lg font-bold">{dayNumber}</div>
                                        <div className="text-sm">{month}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Chọn giờ */}
                        {selectedDate && (
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Chọn thời gian</h2>
                                <div className="space-y-4">
                                    {Object.entries(TIME_SLOTS).map(([period, times]) => (
                                        <div key={period}>
                                            <h3 className="text-sm font-medium text-gray-500 mb-2">{period}</h3>
                                            <div className="grid grid-cols-5 gap-2">
                                                {times.map(time => (
                                                    <button
                                                        key={time}
                                                        type="button"
                                                        onClick={() => handleTimeSelect(time)}
                                                        className={`p-2 rounded-lg border text-center transition-colors ${
                                                            selectedTime === time
                                                                ? 'border-[--primary-color] bg-orange-50 text-[--primary-color]'
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

                        <button
                            type="submit"
                            className="w-full py-3 px-6 text-white font-medium bg-[--primary-color] rounded-lg hover:bg-orange-600 transition-colors"
                            disabled={!selectedDate || !selectedTime}
                        >
                            Xác nhận đặt lịch
                        </button>
                    </form>
                </div>

                {/* Tóm tắt đơn hàng */}
                <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Tóm tắt đơn hàng</h2>
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.service.id} className="flex justify-between">
                                    <div>
                                        <h3 className="font-medium">{item.service.name}</h3>
                                        <p className="text-sm text-gray-600">{item.deviceType} - {item.deviceModel}</p>
                                    </div>
                                    <span className="font-bold">
                                        {(item.service.sale_price || item.service.price).toLocaleString()}đ
                                    </span>
                                </div>
                            ))}
                            <div className="border-t pt-4">
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Tổng cộng:</span>
                                    <span className="text-[--primary-color]">
                                        {cartItems.reduce((total, item) => total + (item.service.sale_price || item.service.price), 0).toLocaleString()}đ
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 