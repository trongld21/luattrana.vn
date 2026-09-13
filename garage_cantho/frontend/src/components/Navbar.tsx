'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, Calendar, Wrench, Car, ShoppingBag, Newspaper, MapPin, Menu, X, ShieldAlert } from 'lucide-react';
import BookingModal from './BookingModal';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-slate-950 border-b border-slate-800 text-slate-300 text-xs py-2 px-4 sm:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <MapPin className="w-3.5 h-3.5 text-red-500" />
            <span>41-46 Nguyễn Đệ, P. An Thới, Q. Bình Thủy, TP. Cần Thơ</span>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Mở cửa: 08:00 - 21:00 (Cả CN & Ngày lễ)</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <a
            href="tel:0936007840"
            className="flex items-center space-x-1 text-red-500 font-bold hover:text-red-400 transition"
          >
            <ShieldAlert className="w-4 h-4 animate-bounce" />
            <span>CỨU HỘ 24/7: 0936.007.840</span>
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-40 glass-panel border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center shadow-lg shadow-red-950/50 group-hover:scale-105 transition">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-white block leading-tight">
                GARAGE <span className="text-red-500">TÂY NAM BỘ</span>
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-medium">
                Cần Thơ • Chuyên Nghiệp • Uy Tín
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-semibold text-slate-200">
            <Link href="/" className="hover:text-red-500 transition">Trang chủ</Link>
            <Link href="/services" className="hover:text-red-500 transition">Dịch vụ Garage</Link>
            <Link href="/store" className="hover:text-red-500 transition">Phụ tùng & Đồ chơi</Link>
            <Link href="/cars" className="hover:text-red-500 transition">Mua bán & Cho thuê xe</Link>
            <Link href="/news" className="hover:text-red-500 transition">Tin tức</Link>
            <Link href="/contact" className="hover:text-red-500 transition">Liên hệ</Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={() => setIsBookingOpen(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-red-950/60 transition flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Đặt Lịch Bảo Dưỡng</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-slate-300 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 py-6 space-y-4">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="block text-slate-200 hover:text-red-500 font-semibold text-base"
            >
              Trang chủ
            </Link>
            <Link
              href="/services"
              onClick={() => setIsMenuOpen(false)}
              className="block text-slate-200 hover:text-red-500 font-semibold text-base"
            >
              Dịch vụ Garage
            </Link>
            <Link
              href="/store"
              onClick={() => setIsMenuOpen(false)}
              className="block text-slate-200 hover:text-red-500 font-semibold text-base"
            >
              Phụ tùng & Đồ chơi xe
            </Link>
            <Link
              href="/cars"
              onClick={() => setIsMenuOpen(false)}
              className="block text-slate-200 hover:text-red-500 font-semibold text-base"
            >
              Mua bán & Cho thuê xe
            </Link>
            <Link
              href="/news"
              onClick={() => setIsMenuOpen(false)}
              className="block text-slate-200 hover:text-red-500 font-semibold text-base"
            >
              Tin tức xe
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="block text-slate-200 hover:text-red-500 font-semibold text-base"
            >
              Liên hệ
            </Link>

            <button
              onClick={() => {
                setIsMenuOpen(false);
                setIsBookingOpen(true);
              }}
              className="w-full mt-4 py-3 bg-red-600 text-white font-bold rounded-xl flex items-center justify-center space-x-2"
            >
              <Calendar className="w-5 h-5" />
              <span>Đặt Lịch Bảo Dưỡng Ngay</span>
            </button>
          </div>
        )}
      </header>

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
}
