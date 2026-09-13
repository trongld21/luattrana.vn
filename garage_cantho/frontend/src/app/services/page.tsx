'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Wrench, CheckCircle2, ChevronRight, Calendar, ShieldCheck, Sparkles } from 'lucide-react';
import { apiService } from '@/services/api';
import { ServiceItem } from '@/types';
import BookingModal from '@/components/BookingModal';

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  useEffect(() => {
    async function loadServices() {
      const data = await apiService.getServices(activeCategory);
      setServices(data);
    }
    loadServices();
  }, [activeCategory]);

  const handleBooking = (name: string) => {
    setSelectedService(name);
    setIsBookingOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-red-500 bg-red-950/60 px-3 py-1 rounded-full border border-red-500/20">
          DỊCH VỤ GARAGE TÂY NAM BỘ
        </span>
        <h1 className="text-4xl font-extrabold text-white">Bảo Dưỡng & Sửa Chữa Ô Tô Chuẩn Hãng</h1>
        <p className="text-slate-400 text-sm">
          Trang thiết bị máy chẩn đoán ECU cao cấp, phòng sơn hấp sấy đạt chuẩn Châu Âu và đội ngũ kỹ thuật viên giàu kinh nghiệm.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center flex-wrap gap-3">
        {[
          { id: 'all', label: 'Tất cả dịch vụ' },
          { id: 'sửa chữa', label: 'Sửa chữa & Bảo dưỡng' },
          { id: 'bảo dưỡng', label: 'Vệ sinh khoang máy' },
          { id: 'đồng sơn', label: 'Đồng sơn & Thân xe' },
          { id: 'độ xe', label: 'Độ xe & Nội thất' },
          { id: 'cứu hộ', label: 'Cứu hộ 24/7' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition ${
              activeCategory === tab.id
                ? 'bg-red-600 text-white shadow-lg shadow-red-950/80'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((item) => (
          <div key={item.id} className="glass-card rounded-2xl overflow-hidden flex flex-col group">
            <div className="relative h-52 w-full">
              <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition duration-500" />
              <span className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md text-red-400 text-xs font-bold px-3 py-1 rounded-full border border-red-500/30">
                {item.category.toUpperCase()}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition">{item.name}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{item.description || item.summary}</p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Chi phí ước tính</span>
                  <span className="text-sm font-extrabold text-red-500">{item.price_range}</span>
                </div>

                <button
                  onClick={() => handleBooking(item.name)}
                  className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-bold rounded-xl flex items-center space-x-1.5 shadow-md"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Đặt lịch ngay</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultServiceName={selectedService}
      />
    </div>
  );
}
