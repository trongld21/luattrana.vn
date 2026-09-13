'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, ShieldAlert, CheckCircle2 } from 'lucide-react';
import BookingModal from '@/components/BookingModal';

export default function ContactPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-red-500 bg-red-950/60 px-3 py-1 rounded-full border border-red-500/20">
          THÔNG TIN LIÊN HỆ
        </span>
        <h1 className="text-4xl font-extrabold text-white">Garage Ô Tô Tây Nam Bộ Cần Thơ</h1>
        <p className="text-slate-400 text-sm">
          Vui lòng liên hệ hotline cứu hộ 24/7 hoặc ghé trực tiếp trạm sửa chữa tại đường Nguyễn Đệ để được tư vấn & phục vụ nhanh nhất.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
            <h3 className="text-xl font-bold text-white border-l-4 border-red-600 pl-3">
              Thông Tin Garage
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Địa chỉ trụ sở:</strong>
                  <span className="text-slate-300">41-46 Nguyễn Đệ, P. An Thới, Q. Bình Thủy, TP. Cần Thơ</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Hotline Cứu Hộ & Sửa Chữa (24/7):</strong>
                  <a href="tel:0936007840" className="text-red-400 font-extrabold text-base hover:underline">
                    0936 007 840
                  </a>
                  <span className="text-xs text-slate-400 block">Điện thoại bàn: 02923.894.362</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Email hỗ trợ:</strong>
                  <span className="text-slate-300">ototnbcantho@gmail.com</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Giờ mở cửa:</strong>
                  <span className="text-slate-300">08:00 - 21:00 hàng ngày (Cả Thứ 7, Chủ Nhật & Ngày Lễ)</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsBookingOpen(true)}
              className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-lg transition"
            >
              ĐẶT LỊCH HẸN TRỰC TUYẾN
            </button>
          </div>
        </div>

        {/* Form & Map */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-xl font-bold text-white">Gửi Yêu Cầu Cho Chúng Tôi</h3>
            
            {submitted ? (
              <div className="p-4 bg-emerald-950/80 border border-emerald-700 text-emerald-300 rounded-xl flex items-center space-x-3 text-sm">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span>Cảm ơn bạn! Thông tin liên hệ đã được gửi thành công.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Họ tên của bạn *"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-red-500"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Số điện thoại *"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email (không bắt buộc)"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-red-500"
                />
                <textarea
                  rows={4}
                  required
                  placeholder="Nội dung cần tư vấn hoặc phản hồi..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-red-500"
                ></textarea>
                <button
                  type="submit"
                  className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-lg transition flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>GỬI PHẢN HỒI</span>
                </button>
              </form>
            )}
          </div>

          <div className="h-72 rounded-2xl overflow-hidden border border-slate-800 relative bg-slate-900">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.8475294589885!2d105.7600869!3d10.0459066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0883d64c1266f%3A0x6a0c0b396e952671!2sNguy%E1%BB%85n%20%C4%90%E1%BB%87%2C%20C%E1%BA%A7n%20Th%C6%A1!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}
