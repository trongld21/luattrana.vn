'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Wrench,
  ShieldCheck,
  Zap,
  PhoneCall,
  Calendar,
  ChevronRight,
  Sparkles,
  Award,
  Users,
  Car,
  ShoppingBag,
  ArrowRight,
  ShieldAlert,
  Clock,
  MapPin,
  CheckCircle2
} from 'lucide-react';

import { apiService } from '@/services/api';
import { ServiceItem, ProductItem, CarItem, PostItem } from '@/types';
import BookingModal from '@/components/BookingModal';

export default function HomePage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [cars, setCars] = useState<CarItem[]>([]);
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceName, setSelectedServiceName] = useState('');

  useEffect(() => {
    async function fetchData() {
      const [sData, pData, cData, postData] = await Promise.all([
        apiService.getServices(undefined, true),
        apiService.getProducts(),
        apiService.getCars(),
        apiService.getPosts(),
      ]);
      setServices(sData);
      setProducts(pData);
      setCars(cData);
      setPosts(postData);
    }
    fetchData();
  }, []);

  const openBookingForService = (serviceName: string) => {
    setSelectedServiceName(serviceName);
    setIsBookingOpen(true);
  };

  return (
    <div className="space-y-20 pb-16">
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-12 pb-20">
        {/* Dark Automotive Overlay Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/60 z-10"></div>
          <Image
            src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1920&q=80"
            alt="Garage Ô Tô Tây Nam Bộ"
            fill
            className="object-cover object-center opacity-40 scale-105 animate-pulse duration-10000"
            priority
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-red-950/80 border border-red-600/50 text-red-400 text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-red-400" />
              <span>GARAGE Ô TÔ HÀNG ĐẦU CẦN THƠ & MIỀN TÂY</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Sửa Chữa Chuyên Nghiệp <br />
              <span className="text-gradient">Độ Xe & Cứu Hộ 24/7</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Dịch vụ sửa chữa động cơ, bảo dưỡng định kỳ 30 hạng mục, rửa khoang máy hơi nước nóng, đồng sơn phòng sấy 3M và cung cấp phụ tùng ô tô cao cấp chính hãng.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-extrabold rounded-xl shadow-xl shadow-red-950/70 hover:scale-105 transition flex items-center space-x-3 text-base"
              >
                <Calendar className="w-5 h-5" />
                <span>ĐẶT LỊCH SỬA CHỮA NGAY</span>
              </button>

              <a
                href="tel:0936007840"
                className="px-8 py-4 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-100 font-bold rounded-xl hover:scale-105 transition flex items-center space-x-3 text-base"
              >
                <PhoneCall className="w-5 h-5 text-red-500" />
                <span>CỨU HỘ: 0936.007.840</span>
              </a>
            </div>

            {/* Quick Badges */}
            <div className="pt-8 grid grid-cols-3 gap-4 border-t border-slate-800/80 text-slate-300">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Bảo Hành 12 Tháng</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Kỹ Thuật 15 Năm EXP</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Phụ Tùng Chính Hãng</span>
              </div>
            </div>
          </div>

          {/* Emergency Rescue Card */}
          <div className="lg:col-span-5">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border-l-4 border-l-red-600 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 animate-bounce" />
                  CỨU HỘ TÂY NAM BỘ 24/7
                </span>
                <span className="text-xs text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full">Có mặt trong 15m</span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white">Bạn gặp sự cố trên đường?</h3>
                <p className="text-slate-300 text-xs mt-1">Xe hỏng máy, nổ lốp, hết ắc quy hoặc va chạm? Đội cứu hộ Tây Nam Bộ sẵn sàng xuất phát ngay.</p>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3 text-sm">
                <div className="flex items-center space-x-3">
                  <PhoneCall className="w-5 h-5 text-red-500" />
                  <span className="font-extrabold text-white text-lg">0936.007.840</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-300 text-xs">
                  <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>Phục vụ Cần Thơ, Bình Thủy, Cai Lậy, Vĩnh Long, Hậu Giang</span>
                </div>
              </div>

              <a
                href="tel:0936007840"
                className="w-full py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-center block transition shadow-lg"
              >
                GỌI XE CỨU HỘ TỨC THÌ
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CORE SERVICES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-red-500">DỊCH VỤ CHUYÊN NGHIỆP</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Giải Pháp Toàn Diện Cho Ô Tô</h3>
          <p className="text-slate-400 text-sm">Trang thiết bị máy chẩn đoán hiện đại cùng đội ngũ kỹ thuật viên giàu kinh nghiệm.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item) => (
            <div key={item.id} className="glass-card rounded-2xl overflow-hidden flex flex-col group">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />
                <span className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md text-red-400 text-xs font-bold px-3 py-1 rounded-full border border-red-500/30">
                  {item.category.toUpperCase()}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h4 className="text-lg font-bold text-white group-hover:text-red-400 transition">{item.name}</h4>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">{item.summary}</p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-bold text-red-500">{item.price_range}</span>
                  <button
                    onClick={() => openBookingForService(item.name)}
                    className="text-xs font-semibold text-white hover:text-red-400 flex items-center space-x-1"
                  >
                    <span>Đặt dịch vụ</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED SPARE PARTS & ACCESSORIES STORE */}
      <section className="bg-slate-900/50 py-16 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-red-500">PHỤ TÙNG & ĐỒ CHƠI XE</h2>
              <h3 className="text-3xl font-extrabold text-white">Sản Phẩm Cao Cấp Nhập Khẩu</h3>
            </div>
            <Link
              href="/store"
              className="inline-flex items-center space-x-2 text-sm font-bold text-red-500 hover:text-red-400"
            >
              <span>Xem tất cả phụ tùng</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((prod) => (
              <div key={prod.id} className="glass-card rounded-2xl overflow-hidden p-5 flex flex-col space-y-4">
                <div className="relative h-44 w-full rounded-xl overflow-hidden bg-slate-950">
                  <Image src={prod.image} alt={prod.name} fill className="object-cover" />
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-md">
                    {prod.brand}
                  </span>
                </div>

                <div className="flex-1 space-y-2">
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider">{prod.category}</span>
                  <h4 className="text-base font-bold text-white line-clamp-1">{prod.name}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2">{prod.summary}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                  <div>
                    <span className="text-base font-extrabold text-red-500">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(prod.sale_price || prod.price)}
                    </span>
                    {prod.sale_price && (
                      <span className="text-xs text-slate-500 line-through ml-2">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(prod.price)}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setIsBookingOpen(true)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-red-600 text-white text-xs font-bold rounded-lg transition"
                  >
                    Tư vấn mua
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAR MARKETPLACE & RENTAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-red-500">MUA BÁN & CHO THUÊ XE</h2>
            <h3 className="text-3xl font-extrabold text-white">Xe Ô Tô Chọn Lọc & Dịch Vụ Cho Thuê</h3>
          </div>
          <Link
            href="/cars"
            className="inline-flex items-center space-x-2 text-sm font-bold text-red-500 hover:text-red-400"
          >
            <span>Xem tất cả xe</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cars.map((car) => (
            <div key={car.id} className="glass-card rounded-2xl overflow-hidden flex flex-col">
              <div className="relative h-48 w-full">
                <Image src={car.image} alt={car.title} fill className="object-cover" />
                <span
                  className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white ${
                    car.listing_type === 'sale' ? 'bg-emerald-600' : 'bg-blue-600'
                  }`}
                >
                  {car.listing_type === 'sale' ? 'XE BÁN' : 'CHO THUÊ'}
                </span>
              </div>

              <div className="p-6 flex-1 space-y-4">
                <h4 className="text-lg font-bold text-white line-clamp-1">{car.title}</h4>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  <div>Năm SX: <strong className="text-slate-200">{car.year}</strong></div>
                  <div>Hộp số: <strong className="text-slate-200">{car.transmission}</strong></div>
                  <div>Nhiên liệu: <strong className="text-slate-200">{car.fuel_type}</strong></div>
                  <div>Odo: <strong className="text-slate-200">{car.mileage}</strong></div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-lg font-extrabold text-red-500">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(car.price)}
                    {car.listing_type === 'rent' && <span className="text-xs text-slate-400">/ngày</span>}
                  </span>
                  <a
                    href="tel:0936007840"
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl"
                  >
                    Liên hệ ngay
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LATEST NEWS & TIPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 pt-16">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-red-500">TIN TỨC & BÀI VIẾT</h2>
            <h3 className="text-3xl font-extrabold text-white">Kinh Nghiệm Chăm Sóc Xe</h3>
          </div>
          <Link href="/news" className="text-sm font-bold text-red-500 hover:text-red-400 flex items-center space-x-1">
            <span>Xem tất cả tin tức</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.id} href="/news" className="glass-card rounded-2xl overflow-hidden group">
              <div className="relative h-44 w-full">
                <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition" />
              </div>
              <div className="p-6 space-y-3">
                <span className="text-[10px] font-bold text-red-400 uppercase bg-red-950/60 px-2.5 py-1 rounded-md border border-red-500/20">
                  {post.category}
                </span>
                <h4 className="text-base font-bold text-white group-hover:text-red-400 transition line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">{post.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* MAP & LOCATION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-2xl font-bold text-white">Ghé Thăm Garage Tây Nam Bộ</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Trạm dịch vụ tọa lạc tại trung tâm vị trí đắc địa Nguyễn Đệ, Bình Thủy, TP. Cần Thơ với diện tích xưởng 1.500m², trang bị đầy đủ cầu nâng, phòng sơn hấp và máy chẩn đoán chuyên sâu.
            </p>
            <div className="space-y-2 text-xs text-slate-300 pt-2">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>41-46 Nguyễn Đệ, P. An Thới, Q. Bình Thủy, TP. Cần Thơ</span>
              </div>
              <div className="flex items-center space-x-2">
                <PhoneCall className="w-4 h-4 text-red-500" />
                <span>Hotline: 0936 007 840 (Sửa chữa & Cứu hộ 24/7)</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 h-64 rounded-2xl overflow-hidden border border-slate-800 relative bg-slate-900">
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
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultServiceName={selectedServiceName}
      />
    </div>
  );
}
