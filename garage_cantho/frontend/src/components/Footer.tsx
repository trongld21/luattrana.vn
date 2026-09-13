import React from 'react';
import Link from 'next/link';
import { Wrench, Phone, Mail, MapPin, Clock, ShieldCheck, Globe, Share2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Col 1: About */}
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              GARAGE <span className="text-red-500">TÂY NAM BỘ</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed mb-6">
            Trung tâm bảo dưỡng, sửa chữa ô tô chuyên nghiệp, độ xe và xe cứu hộ 24/7 hàng đầu tại Cần Thơ & khu vực Miền Tây Nam Bộ.
          </p>
          <div className="flex space-x-3">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-red-600 flex items-center justify-center text-slate-300 hover:text-white transition">
              <Globe className="w-4 h-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-red-600 flex items-center justify-center text-slate-300 hover:text-white transition">
              <Share2 className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Col 2: Services */}
        <div>
          <h4 className="text-white font-bold text-base mb-6 uppercase tracking-wider border-l-2 border-red-500 pl-3">
            Dịch vụ nổi bật
          </h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/services" className="hover:text-red-500 transition">Sửa chữa & Bảo dưỡng máy gầm</Link></li>
            <li><Link href="/services" className="hover:text-red-500 transition">Vệ sinh khoang máy hơi nước nóng</Link></li>
            <li><Link href="/services" className="hover:text-red-500 transition">Đồng sơn phòng sơn hấp 3M</Link></li>
            <li><Link href="/services" className="hover:text-red-500 transition">Độ đèn Matrix & Nội thất da Nappa</Link></li>
            <li><Link href="/services" className="hover:text-red-500 transition">Giám định & Làm bảo hiểm thân xe</Link></li>
            <li><Link href="/services" className="hover:text-red-500 transition">Cứu hộ ô tô khẩn cấp 24/7</Link></li>
          </ul>
        </div>

        {/* Col 3: Quick Links & Store */}
        <div>
          <h4 className="text-white font-bold text-base mb-6 uppercase tracking-wider border-l-2 border-red-500 pl-3">
            Sản phẩm & Xe
          </h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/store" className="hover:text-red-500 transition">Màn hình Android OLEDPro / Vietmap</Link></li>
            <li><Link href="/store" className="hover:text-red-500 transition">Dầu nhớt Mobil 1 / Castrol chính hãng</Link></li>
            <li><Link href="/store" className="hover:text-red-500 transition">Cảm biến áp suất lốp Steelmate</Link></li>
            <li><Link href="/cars" className="hover:text-red-500 transition">Mua bán ô tô đã qua sử dụng</Link></li>
            <li><Link href="/cars" className="hover:text-red-500 transition">Cho thuê xe tự lái 4-7 chỗ</Link></li>
            <li><Link href="/news" className="hover:text-red-500 transition">Kinh nghiệm bảo dưỡng xe mùa mưa</Link></li>
          </ul>
        </div>

        {/* Col 4: Contact Info */}
        <div>
          <h4 className="text-white font-bold text-base mb-6 uppercase tracking-wider border-l-2 border-red-500 pl-3">
            Thông tin liên hệ
          </h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <span>41-46 Nguyễn Đệ, P. An Thới, Q. Bình Thủy, TP. Cần Thơ</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-red-500 flex-shrink-0" />
              <div>
                <p className="font-bold text-white">0936.007.840 (Hotline 24/7)</p>
                <p className="text-xs text-slate-500">0292.3894.362 (Bàn)</p>
              </div>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-red-500 flex-shrink-0" />
              <span>ototnbcantho@gmail.com</span>
            </li>
            <li className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-red-500 flex-shrink-0" />
              <span>08:00 - 21:00 hàng ngày (Cả lễ & CN)</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
        <p>© 2026 Garage Ô Tô Tây Nam Bộ Cần Thơ. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <span>Hệ thốngNext.js Frontend & Laravel Backend MySQL</span>
        </div>
      </div>
    </footer>
  );
}
