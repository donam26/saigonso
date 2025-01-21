'use client';

export default function Policy() {
    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4">
                {/* Chính sách đổi trả */}
                <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                    <h1 className="text-[#FF6B00] text-2xl font-bold mb-6">
                        Chính sách đổi trả và bảo hành phụ kiện
                    </h1>
                    
                    <div className="mb-8">
                        <h2 className="text-lg font-bold text-green-600 mb-4">1. Chính sách đổi trả phụ kiện</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="border border-gray-200 p-4 text-left w-1/5">Thời gian</th>
                                        <th className="border border-gray-200 p-4 text-left w-2/5">Điều kiện</th>
                                        <th className="border border-gray-200 p-4 text-left w-2/5">Chính sách</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-200 p-4 align-top">7 ngày đầu tiên</td>
                                        <td className="border border-gray-200 p-4">
                                            <p className="mb-2">• Sản phẩm đổi trả phải giữ nguyên 100% hình dạng ban đầu và đủ điều kiện bảo hành.</p>
                                            <p>• Sản phẩm và hộp sản phẩm không trầy xước, méo mó́p, không có hiện tượng hư hỏng.</p>
                                        </td>
                                        <td className="border border-gray-200 p-4">
                                            <p className="mb-2">• FASTCARE sẽ tiến hành hoàn tiền 100% hoặc đổi sản phẩm mới theo hình thức 1:1</p>
                                            <p>• Trường hợp khách hàng muốn mua sản phẩm mới có mệnh giá cao hơn sản phẩm đổi trả thì khách sẽ trả khoản tiền chênh lệch</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-200 p-4 align-top">Từ 7 đến 30 ngày</td>
                                        <td className="border border-gray-200 p-4">
                                            <p className="mb-2">• Sản phẩm đổi trả phải giữ nguyên 100% hình dạng ban đầu và đủ điều kiện bảo hành.</p>
                                            <p>• Sản phẩm và hộp sản phẩm không trầy xước, méo mó́p, không có hiện tượng hư hỏng.</p>
                                        </td>
                                        <td className="border border-gray-200 p-4">
                                            <p>FASTCARE sẽ tiến hành thu hồi lại 80% giá trị sản phẩm</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-lg font-bold text-green-600 mb-4">2. Chính sách bảo hành phụ kiện</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="border border-gray-200 p-4 text-left">Phụ kiện (cáp sạc, dock sạc, tai nghe...)</th>
                                        <th className="border border-gray-200 p-4 text-left">Thương Hiệu</th>
                                        <th className="border border-gray-200 p-4 text-left">Chế Độ Bảo Hành</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-200 p-4" rowSpan={2}>Phụ kiện (cáp sạc, dock sạc, tai nghe...)</td>
                                        <td className="border border-gray-200 p-4">Aukey, Anker, Ugreen.</td>
                                        <td className="border border-gray-200 p-4">Bảo hành 01 đổi 01 trong 18 tháng.</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-200 p-4">Pisen, Baseus và các thương hiệu khác.</td>
                                        <td className="border border-gray-200 p-4">Bảo hành 01 đổi 01 trong 12 tháng.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold text-green-600 mb-4">3. Chính sách bảo hành dịch vụ sửa chữa Laptop</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="border border-gray-200 p-4 text-left">Linh Kiện Thay Thế</th>
                                        <th className="border border-gray-200 p-4 text-left">Thời Gian Bảo Hành</th>
                                        <th className="border border-gray-200 p-4 text-left">Chế Độ Bảo Hành</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-200 p-4">Màn laptop linh kiện thường</td>
                                        <td className="border border-gray-200 p-4">6 tháng</td>
                                        <td className="border border-gray-200 p-4" rowSpan={3}>
                                            Bảo hành 01 đổi 01 trường hợp sọc màn 01 lần chỉ móng,không hiển thị,màn có trên 5 điểm chết,màn bị ố vàng.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-200 p-4">Màn Macbook</td>
                                        <td className="border border-gray-200 p-4">6 tháng</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-200 p-4">Màn laptop linh kiện tốt</td>
                                        <td className="border border-gray-200 p-4">12 tháng</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Thông tin liên hệ */}
                <div className="bg-white rounded-xl shadow-sm p-8">
                    <h2 className="text-xl font-bold mb-6">Thông tin liên hệ</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
                                <i className="fas fa-phone text-[#FF6B00]"></i>
                            </div>
                            <div>
                                <p className="text-gray-600">Tổng đài miễn phí</p>
                                <a href="tel:18002057" className="text-[#FF6B00] font-bold hover:underline">
                                    1800 2057
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
                                <i className="fas fa-headset text-[#FF6B00]"></i>
                            </div>
                            <div>
                                <p className="text-gray-600">Phản ánh dịch vụ</p>
                                <a href="tel:18002018" className="text-[#FF6B00] font-bold hover:underline">
                                    1800 2018
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
                                <i className="fas fa-clock text-[#FF6B00]"></i>
                            </div>
                            <div>
                                <p className="text-gray-600">Giờ làm việc</p>
                                <p className="font-medium">Thứ 2 - CN, 8:00 - 21:00</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
                                <i className="fas fa-map-marker-alt text-[#FF6B00]"></i>
                            </div>
                            <div>
                                <p className="text-gray-600">Hệ thống cửa hàng</p>
                                <a href="/he-thong-cua-hang" className="text-[#FF6B00] font-medium hover:underline">
                                    Xem địa chỉ
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 