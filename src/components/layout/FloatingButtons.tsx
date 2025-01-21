'use client';

export function FloatingButtons() {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-3 z-50">
      <a
        href="tel:18002057"
        className="flex items-center gap-3 bg-[--primary-color] text-white px-6 py-3 rounded-full hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-1"
      >
        <i className="fas fa-phone text-lg"></i>
        <span className="font-medium">1800 2057</span>
      </a>
      <a
        href="https://zalo.me/1800205"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-1"
      >
        <i className="fas fa-comment text-lg"></i>
        <span className="font-medium">Zalo</span>
      </a>
      <a
        href="https://m.me/fastcare"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 bg-[#0084ff] text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-1"
      >
        <i className="fab fa-facebook-messenger text-lg"></i>
        <span className="font-medium">Messenger</span>
      </a>
    </div>
  );
} 