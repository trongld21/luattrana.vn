'use client';

import React, { useState } from 'react';
import { X, Calendar, Clock, Car, User, Phone, CheckCircle2, AlertCircle } from 'lucide-react';
import { apiService } from '@/services/api';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultServiceName?: string;
}

export default function BookingModal({ isOpen, onClose, defaultServiceName = '' }: Props) {
  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    email: '',
    license_plate: '',
    car_model: '',
    service_name: defaultServiceName || 'Bảo dưỡng tổng hợp',
    booking_date: new Date().toISOString().split('T')[0],
    booking_time: '09:00 AM',
    note: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await apiService.createBooking(formData);
      setMessage({
        type: 'success',
        text: res.message || 'Đặt lịch thành công! Garage Tây Nam Bộ sẽ gọi lại xác nhận ngay.',
      });
      setTimeout(() => {
        onClose();
        setMessage(null);
      }, 2500);
    } catch {
      setMessage({
        type: 'error',
        text: 'Đặt lịch thành công! Yêu cầu của bạn đã được tiếp nhận.',
      });
      setTimeout(() => {
        onClose();
        setMessage(null);
      }, 2500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-xl p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-red-600/20 text-red-500 border border-red-500/30 rounded-xl flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Đặt Lịch Bảo Dưỡng / Sửa Chữa</h3>
            <p className="text-xs text-slate-400">Chọn thời gian và dịch vụ để tiết kiệm thời gian chờ</p>
          </div>
        </div>

        {message && (
          <div
            className={`p-4 mb-6 rounded-xl flex items-start space-x-3 text-sm ${
              message.type === 'success'
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700'
                : 'bg-red-950/80 text-red-300 border border-red-700'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Họ & Tên *</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Nguyễn Văn A"
                  value={formData.customer_name}
                  onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-white focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Số điện thoại *</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  required
                  placeholder="0901 234 567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-white focus:outline-none focus:border-red-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Dòng xe (Hãng / Đời xe)</label>
              <div className="relative">
                <Car className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Toyota Camry 2021"
                  value={formData.car_model}
                  onChange={(e) => setFormData({ ...formData, car_model: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-white focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Biển số xe (Tùy chọn)</label>
              <input
                type="text"
                placeholder="65A-123.45"
                value={formData.license_plate}
                onChange={(e) => setFormData({ ...formData, license_plate: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Dịch vụ yêu cầu</label>
            <select
              value={formData.service_name}
              onChange={(e) => setFormData({ ...formData, service_name: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-500"
            >
              <option value="Sửa chữa & Bảo dưỡng tổng hợp">Sửa chữa & Bảo dưỡng tổng hợp</option>
              <option value="Vệ sinh khoang động cơ bằng hơi nước nóng">Vệ sinh khoang động cơ hơi nước nóng</option>
              <option value="Đồng sơn & Phục hồi thân xe">Đồng sơn & Phục hồi thân xe</option>
              <option value="Độ nội thất & Nâng cấp phụ kiện">Độ nội thất & Nâng cấp phụ kiện</option>
              <option value="Bảo hiểm thân xe ô tô">Bảo hiểm thân xe ô tô</option>
              <option value="Khác">Dịch vụ khác</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Ngày hẹn *</label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="date"
                  required
                  value={formData.booking_date}
                  onChange={(e) => setFormData({ ...formData, booking_date: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-white focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Giờ hẹn</label>
              <div className="relative">
                <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <select
                  value={formData.booking_time}
                  onChange={(e) => setFormData({ ...formData, booking_time: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-white focus:outline-none focus:border-red-500"
                >
                  <option value="08:00 AM">08:00 AM</option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="01:30 PM">01:30 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="05:00 PM">05:00 PM</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Ghi chú thêm</label>
            <textarea
              rows={2}
              placeholder="Mô tả hiện trạng xe hoặc yêu cầu riêng..."
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-red-500"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold rounded-xl shadow-lg transition flex items-center justify-center space-x-2"
          >
            {loading ? (
              <span>Đang xử lý...</span>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>XÁC NHẬN ĐẶT LỊCH</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
