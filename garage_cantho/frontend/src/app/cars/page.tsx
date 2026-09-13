'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Car, PhoneCall, Filter, ShieldCheck, MapPin } from 'lucide-react';
import { apiService } from '@/services/api';
import { CarItem } from '@/types';
import BookingModal from '@/components/BookingModal';

export default function CarsPage() {
  const [cars, setCars] = useState<CarItem[]>([]);
  const [typeFilter, setTypeFilter] = useState<'all' | 'sale' | 'rent'>('all');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState('');

  useEffect(() => {
    async function loadCars() {
      const typeParam = typeFilter === 'all' ? undefined : typeFilter;
      const data = await apiService.getCars(typeParam);
      setCars(data);
    }
    loadCars();
  }, [typeFilter]);

  const handleInquire = (title: string) => {
    setSelectedCar(`Tư vấn xe: ${title}`);
    setIsBookingOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-red-500 bg-red-950/60 px-3 py-1 rounded-full border border-red-500/20">
          MUA BÁN & CHO THUÊ XE Ô TÔ
        </span>
        <h1 className="text-4xl font-extrabold text-white">Sàn Xe Ô Tô Lựa Chọn Chất Lượng</h1>
        <p className="text-slate-400 text-sm">
          Tất cả xe ô tô bán lẻ đều trải qua 142 hạng mục kiểm định chất lượng, cam kết không đâm đụng, thủy kích. Cung cấp dịch vụ cho thuê xe du lịch 4-7 chỗ tự lái hoặc có tài xế.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center space-x-3">
        {[
          { id: 'all', label: 'Tất cả niêm yết' },
          { id: 'sale', label: 'Xe ô tô bán' },
          { id: 'rent', label: 'Cho thuê xe du lịch' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setTypeFilter(tab.id as 'all' | 'sale' | 'rent')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition ${
              typeFilter === tab.id
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars.map((car) => (
          <div key={car.id} className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="relative h-52 w-full">
                <Image src={car.image} alt={car.title} fill className="object-cover" />
                <span
                  className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg ${
                    car.listing_type === 'sale' ? 'bg-emerald-600' : 'bg-blue-600'
                  }`}
                >
                  {car.listing_type === 'sale' ? 'XE CẦN BÁN' : 'CHO THUÊ XE'}
                </span>
              </div>

              <div className="px-6 space-y-3">
                <h3 className="text-lg font-bold text-white line-clamp-1">{car.title}</h3>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  <div>Đời xe: <strong className="text-white">{car.year}</strong></div>
                  <div>Hộp số: <strong className="text-white">{car.transmission}</strong></div>
                  <div>Nhiên liệu: <strong className="text-white">{car.fuel_type}</strong></div>
                  <div>Odo: <strong className="text-white">{car.mileage}</strong></div>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2">{car.description || car.summary}</p>
              </div>
            </div>

            <div className="p-6 pt-4 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Giá niêm yết</span>
                  <span className="text-xl font-black text-red-500">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(car.price)}
                    {car.listing_type === 'rent' && <span className="text-xs text-slate-400">/ngày</span>}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-xs text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-red-500" />
                  <span>{car.location}</span>
                </div>
              </div>

              <button
                onClick={() => handleInquire(car.title)}
                className="w-full py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow-lg transition flex items-center justify-center space-x-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>LIÊN HỆ TƯ VẤN NGAY</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultServiceName={selectedCar}
      />
    </div>
  );
}
