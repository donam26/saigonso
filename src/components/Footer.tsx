'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="bg-white border-t">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo và thông tin liên hệ */}
                    <div className="space-y-4">
                        <Link href="/" className="inline-block">
                            <Image
                                src="/logo.jpg"
                                alt="FastCare"
                                width={200}
                                height={50}
                                className="h-auto"
                            />
                        </Link>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="font-medium">Tổng đài miễn phí:</span>
                                <a href="tel:18002057" className="text-[--primary-color] hover:underline">1800 2057</a>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-medium">Phản ánh dịch vụ:</span>
                                <a href="tel:18002018" className="text-[--primary-color] hover:underline">1800 2018</a>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-medium">Giờ làm việc:</span>
                                <span>Thứ 2 - CN, 8:00 - 21:00</span>
                            </div>
                        </div>
                        <Link 
                            href="/he-thong-cua-hang" 
                            className="inline-flex items-center px-4 py-2 border-2 border-[--primary-color] text-[--primary-color] rounded-lg hover:bg-orange-50 transition-colors"
                        >
                            <i className="fas fa-map-marker-alt mr-2"></i>
                            Hệ thống cửa hàng Fastcare
                        </Link>
                    </div>

                    {/* Thông tin hỗ trợ */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">THÔNG TIN HỖ TRỢ</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/chinh-sach-bao-hanh" className="hover:text-[--primary-color]">
                                    Chính sách bảo hành/ Đổi trả/ Vận chuyển
                                </Link>
                            </li>
                            <li>
                                <Link href="/chinh-sach-bao-mat" className="hover:text-[--primary-color]">
                                    Chính sách bảo mật
                                </Link>
                            </li>
                            <li>
                                <Link href="/hinh-thuc-thanh-toan" className="hover:text-[--primary-color]">
                                    Hình thức thanh toán
                                </Link>
                            </li>
                            <li>
                                <Link href="/chinh-sach-luu-tru" className="hover:text-[--primary-color]">
                                    Chính sách lưu trữ thiết bị
                                </Link>
                            </li>
                            <li>
                                <Link href="/thong-tin-chu-so-huu" className="hover:text-[--primary-color]">
                                    Thông tin chủ sở hữu Website
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Về FastCare */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">VỀ FASTCARE</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/tuyen-dung" className="hover:text-[--primary-color]">
                                    Tuyển dụng
                                </Link>
                            </li>
                            <li>
                                <Link href="/gioi-thieu" className="hover:text-[--primary-color]">
                                    Giới thiệu
                                </Link>
                            </li>
                            <li>
                                <Link href="/tin-tuc" className="hover:text-[--primary-color]">
                                    Tin tức
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Kết nối với FastCare */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">KẾT NỐI VỚI FASTCARE</h3>
                        <div className="flex gap-4 mb-6">
                            <a href="https://www.youtube.com/@FastCare" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:opacity-80">
                                <i className="fab fa-youtube text-2xl"></i>
                            </a>
                            <a href="https://www.facebook.com/fastcare.vn" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:opacity-80">
                                <i className="fab fa-facebook text-2xl"></i>
                            </a>
                            <a href="https://www.pinterest.com/fastcarevn" target="_blank" rel="noopener noreferrer" className="text-red-700 hover:opacity-80">
                                <i className="fab fa-pinterest text-2xl"></i>
                            </a>
                            <a href="https://www.tiktok.com/@fastcare.vn" target="_blank" rel="noopener noreferrer" className="text-black hover:opacity-80">
                                <i className="fab fa-tiktok text-2xl"></i>
                            </a>
                            <a href="https://www.instagram.com/fastcare.vn" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:opacity-80">
                                <i className="fab fa-instagram text-2xl"></i>
                            </a>
                        </div>
                        <div className="flex gap-4">
                            <Image
                                src="/bo-cong-thuong.png"
                                alt="Đã thông báo Bộ Công Thương"
                                width={100}
                                height={40}
                                className="h-auto"
                            />
                            <Image
                                src="/dmca-badge.png"
                                alt="DMCA.com Protection Status"
                                width={100}
                                height={40}
                                className="h-auto"
                            />
                        </div>
                    </div>
                </div>

                {/* Thông tin công ty */}
                <div className="mt-8 pt-8 border-t text-sm text-gray-600">
                    <p className="mb-2">Công ty Cổ Phần thương mại dịch vụ NHT</p>
                    <p className="mb-2">GPĐKKD số 0314366277 do Sở Kế hoạch và Đầu tư TP. Hồ Chí Minh cấp ngày 21/04/2017</p>
                    <p className="mb-2">Địa chỉ: 587 Lê Hồng Phong, P.10, Q.10, TP.HCM</p>
                    <p>Email: admin@fastcare.vn</p>
                    <p className="mt-4 text-xs">v2.0.1</p>
                </div>
            </div>
        </footer>
    );
} 