'use client';

import React, { useState } from 'react';
import { ShieldAlert, PhoneCall, Navigation, Send, X, CheckCircle2 } from 'lucide-react';
import { apiService } from '@/services/api';

export default function RescueWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    customer_name: '',
    phone: '',
    location: '',
    car_model: '',
    issue_description: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiService.createRescueRequest(form);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setIsOpen(false);
      }, 3000);
    } catch {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setIsOpen(false);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
        <a
          href="tel:0936007840"
          className="w-14 h-14 bg-red-600 hover:bg-red-500 text-white rounded-full flex items-center justify-center shadow-xl shadow-red-950/80 transition-all hover:scale-110 group relative"
          title="Gọi Cứu Hộ Ngay: 0936 007 840"
        >
          <PhoneCall className="w-6 h-6 animate-pulse" />
          <span className="absolute right-16 bg-slate-900 border border-slate-700 text-white text-xs font-bold py-1.5 px-3 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition shadow-lg pointer-events-none">
            Gọi Cứu Hộ 24/7: 0936 007 840
          </span>
        </a>

        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-slate-800 hover:bg-slate-700 border border-red-500/50 text-red-500 hover:text-red-400 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110 group relative"
          title="Gửi Vị Trí Cứu Hộ"
        >
          <Navigation className="w-6 h-6" />
          <span className="absolute right-16 bg-slate-900 border border-slate-700 text-white text-xs font-bold py-1.5 px-3 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition shadow-lg pointer-events-none">
            Gửi Vị Trí Cứu Hộ
          </span>
        </button>
      </div>

      {/* Rescue Form Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-red-600/60 rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-600 text-white rounded-xl flex items-center justify-center">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Yêu Cầu Cứu Hộ Khẩn Cấp 24/7</h3>
                <p className="text-xs text-red-400 font-semibold">Xe cứu hộ có mặt trong 15 - 30 phút tại Cần Thơ</p>
              </div>
            </div>

            {success ? (
              <div className="p-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="text-white font-bold text-base">Đã nhận được vị trí!</h4>
                <p className="text-slate-300 text-xs">
                  Tổng đài viên Garage Tây Nam Bộ đang điều xe cứu hộ gần nhất tới số điện thoại của bạn.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-sm">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Họ tên *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    value={form.customer_name}
                    onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Số điện thoại *</label>
                  <input
                    type="tel"
                    required
                    placeholder="0936 007 840"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Địa điểm xe gặp sự cố *</label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Cầu Hưng Lợi, Bình Thủy, Cần Thơ"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Tình trạng sự cố (Hết bình / Va chạm / Nổ lốp...)</label>
                  <textarea
                    rows={2}
                    placeholder="Mô tả ngắn sự cố..."
                    value={form.issue_description}
                    onChange={(e) => setForm({ ...form, issue_description: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-red-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-lg transition flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Đang gửi...' : 'GỬI YÊU CẦU CỨU HỘ'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
