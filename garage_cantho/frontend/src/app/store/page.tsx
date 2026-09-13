'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ShoppingBag, Search, Tag, PhoneCall, CheckCircle2 } from 'lucide-react';
import { apiService } from '@/services/api';
import { ProductItem } from '@/types';
import BookingModal from '@/components/BookingModal';

export default function StorePage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedProd, setSelectedProd] = useState('');

  useEffect(() => {
    async function loadProducts() {
      const data = await apiService.getProducts(category, search);
      setProducts(data);
    }
    loadProducts();
  }, [category, search]);

  const handleBuy = (prodName: string) => {
    setSelectedProd(`Đặt mua phụ tùng: ${prodName}`);
    setIsBookingOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-red-500 bg-red-950/60 px-3 py-1 rounded-full border border-red-500/20">
          CỬA HÀNG PHỤ TÙNG & ĐỒ CHƠI XE HƠI
        </span>
        <h1 className="text-4xl font-extrabold text-white">Linh Kiện Chính Hãng & Phụ Kiện Cao Cấp</h1>
        <p className="text-slate-400 text-sm">
          Dầu nhớt nhập khẩu, màn hình Android, cảm biến áp suất lốp, camera hành trình chính hãng bảo hành 2 năm.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Tìm kiếm phụ tùng, dầu nhớt, đồ chơi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-500"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {['all', 'Phụ tùng', 'Đồ chơi xe'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                category === cat
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              {cat === 'all' ? 'Tất cả' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((item) => (
          <div key={item.id} className="glass-card rounded-2xl overflow-hidden p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="relative h-48 w-full rounded-xl overflow-hidden bg-slate-950">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
                <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-md">
                  {item.brand}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-bold text-red-400 uppercase">{item.category}</span>
                <h3 className="text-base font-bold text-white line-clamp-1 mt-1">{item.name}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">{item.description || item.summary}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-extrabold text-red-500">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.sale_price || item.price)}
                  </span>
                  {item.sale_price && (
                    <span className="text-xs text-slate-500 line-through ml-2">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                    </span>
                  )}
                </div>
                <span className="text-xs text-emerald-400 font-medium">Còn hàng</span>
              </div>

              <button
                onClick={() => handleBuy(item.name)}
                className="w-full py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-bold rounded-xl shadow-lg transition flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ĐẶT MUA / TƯ VẤN LẮP ĐẶT</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultServiceName={selectedProd}
      />
    </div>
  );
}
