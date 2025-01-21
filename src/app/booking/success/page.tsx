'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaCheckCircle, FaCalendarAlt, FaArrowLeft } from 'react-icons/fa';

export default function BookingSuccess() {
  const router = useRouter();

  useEffect(() => {
    // Tự động chuyển về trang chủ sau 10 giây
    const timeout = setTimeout(() => {
      router.push('/');
    }, 10000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-6"
        >
          <FaCheckCircle className="mx-auto text-6xl text-green-500" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-bold text-gray-800 mb-4"
        >
          Đặt lịch thành công!
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-600 mb-8"
        >
          Chúng tôi đã nhận được yêu cầu đặt lịch của bạn. 
          Nhân viên sẽ liên hệ với bạn trong thời gian sớm nhất.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col gap-4"
        >
          <Link 
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaArrowLeft />
            Về trang chủ
          </Link>
          
          <Link
            href="/booking"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <FaCalendarAlt />
            Đặt lịch mới
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-sm text-gray-500"
        >
          Tự động chuyển về trang chủ sau 10 giây
        </motion.div>
      </motion.div>
    </div>
  );
} 