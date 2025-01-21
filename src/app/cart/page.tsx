'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RepairService } from '@/types/service';

interface CartItem {
    service: RepairService;
    deviceType: string;
    deviceModel: string;
    problemDescription: string;
}

export default function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        // Lấy dữ liệu giỏ hàng từ localStorage
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    const removeFromCart = (serviceId: number) => {
        const newCartItems = cartItems.filter(item => item.service.id !== serviceId);
        setCartItems(newCartItems);
        localStorage.setItem('cart', JSON.stringify(newCartItems));
    };

    const totalAmount = cartItems.reduce((total, item) => {
        return total + (item.service.sale_price || item.service.price);
    }, 0);

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900">Giỏ hàng trống</h2>
                    <p className="mt-2 text-gray-600">Bạn chưa thêm dịch vụ nào vào giỏ hàng.</p>
                    <Link href="/" className="mt-4 inline-block text-[--primary-color] hover:underline">
                        Quay lại trang chủ
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Giỏ hàng</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map((item) => (
                        <div key={item.service.id} className="bg-white rounded-lg shadow-sm p-4">
                            <div className="flex gap-4">
                                <div className="relative w-24 h-24">
                                    <Image
                                        src={item.service.thumbnail || '/images/thumbnail.jpg'}
                                        alt={item.service.name}
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900">{item.service.name}</h3>
                                    <div className="mt-1 text-[--primary-color] font-bold">
                                        {(item.service.sale_price || item.service.price).toLocaleString()}đ
                                    </div>
                                    <div className="mt-2 text-sm text-gray-600">
                                        <p><span className="font-medium">Thiết bị:</span> {item.deviceType} - {item.deviceModel}</p>
                                        <p><span className="font-medium">Mô tả lỗi:</span> {item.problemDescription}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.service.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 h-fit">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Tổng cộng</h2>
                    <div className="space-y-2">
                        <div className="flex justify-between text-lg">
                            <span>Tạm tính:</span>
                            <span className="font-bold">{totalAmount.toLocaleString()}đ</span>
                        </div>
                    </div>
                    <Link
                        href="/checkout"
                        className="mt-6 w-full block py-3 px-6 text-center text-white font-medium bg-[--primary-color] rounded-lg hover:bg-orange-600 transition-colors"
                    >
                        Tiến hành đặt lịch
                    </Link>
                </div>
            </div>
        </div>
    );
} 