import axios from 'axios';
import { ServiceItem, ProductItem, CarItem, PostItem, BookingPayload, RescuePayload } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 5000,
});

export const apiService = {
  async getServices(category?: string, featured?: boolean): Promise<ServiceItem[]> {
    try {
      const res = await client.get('/services', { params: { category, featured } });
      return res.data.data;
    } catch {
      // Fallback data
      return [
        {
          id: 1,
          name: 'Sửa chữa & Bảo dưỡng tổng hợp',
          slug: 'sua-chua-bao-duong-tong-hop',
          category: 'sửa chữa',
          summary: 'Kiểm tra gầm, máy, hệ thống điện, thay dầu nhớt định kỳ và khắc phục mọi sự cố ô tô.',
          description: 'Garage Ô Tô Tây Nam Bộ cung cấp dịch vụ bảo dưỡng tổng hợp chuẩn 30 hạng mục...',
          price_range: 'Từ 500.000đ',
          image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
          is_featured: true,
        },
        {
          id: 2,
          name: 'Vệ sinh khoang động cơ bằng hơi nước nóng',
          slug: 've-sinh-khoang-dong-co',
          category: 'bảo dưỡng',
          summary: 'Rửa động cơ ô tô chuyên sâu, loại bỏ dầu mỡ, tản nhiệt tốt hơn.',
          description: 'Sử dụng máy phun hơi nước nóng cao áp...',
          price_range: '600.000đ - 1.200.000đ',
          image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
          is_featured: true,
        },
        {
          id: 3,
          name: 'Đồng sơn & Phục hồi thân xe bị móp mập',
          slug: 'dong-son-phuc-hoi-than-xe',
          category: 'đồng sơn',
          summary: 'Sơn sấy trong phòng sơn hấp hiện đại, pha màu vi tính chính xác 100%.',
          description: 'Chuyên phục hồi xe tai nạn...',
          price_range: 'Báo giá theo vết xước',
          image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
          is_featured: true,
        },
        {
          id: 4,
          name: 'Cứu hộ ô tô khẩn cấp 24/7 Cần Thơ',
          slug: 'cuu-ho-o-to-khan-cap-247',
          category: 'cứu hộ',
          summary: 'Đội xe cứu hộ sẵn sàng 24/7 phục vụ kéo xe tai nạn, hết bình ắc quy, thủng lốp.',
          description: 'Đội ngũ kỹ thuật viên cứu hộ di động có mặt trong 15-30 phút.',
          price_range: 'Phụ thuộc khoảng cách',
          image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
          is_featured: true,
        },
      ];
    }
  },

  async getProducts(category?: string, search?: string): Promise<ProductItem[]> {
    try {
      const res = await client.get('/products', { params: { category, search } });
      return res.data.data;
    } catch {
      return [
        {
          id: 1,
          name: 'Màn Hình Android OLEDPro A5 HD 9-10 Inch',
          slug: 'man-hinh-android-oledpro-a5',
          category: 'Đồ chơi xe',
          brand: 'OLEDPro',
          price: 4800000,
          sale_price: 4200000,
          stock: 15,
          summary: 'Màn hình ô tô thông minh tích hợp Vietmap S1, SIM 4G, điều khiển giọng nói Kiki.',
          description: 'RAM 2GB, ROM 32GB...',
          image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
          is_featured: true,
        },
        {
          id: 2,
          name: 'Dầu Nhớt Động Cơ Mobil 1 Gold 5W-30 (4 Lít)',
          slug: 'dau-nhot-mobil-1-gold-5w30',
          category: 'Phụ tùng',
          brand: 'Mobil 1',
          price: 1350000,
          sale_price: 1200000,
          stock: 50,
          summary: 'Dầu nhớt tổng hợp toàn phần giúp bảo vệ động cơ chạy mượt mà lên tới 15.000 KM.',
          description: 'Nhập khẩu từ Mỹ...',
          image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
          is_featured: true,
        },
        {
          id: 3,
          name: 'Cảm Biến Áp Suất Lốp Steelmate TP-MT11',
          slug: 'cam-bien-ap-suat-lop-steelmate-tp-mt11',
          category: 'Đồ chơi xe',
          brand: 'Steelmate',
          price: 2800000,
          sale_price: 2450000,
          stock: 20,
          summary: 'Cảm biến van trong chính xác cao, cảnh báo lỗ thủng lốp ngay lập tức.',
          description: 'Pin dùng 5 năm...',
          image: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=800&q=80',
          is_featured: true,
        }
      ];
    }
  },

  async getCars(type?: 'sale' | 'rent'): Promise<CarItem[]> {
    try {
      const res = await client.get('/cars', { params: { type } });
      return res.data.data;
    } catch {
      return [
        {
          id: 1,
          title: 'Toyota Fortuner Legender 2.8L 4x4 AT 2022',
          slug: 'toyota-fortuner-legender-2022',
          listing_type: 'sale',
          price: 1180000000,
          year: 2022,
          transmission: 'Tự động 6 cấp',
          fuel_type: 'Dầu (Diesel)',
          mileage: '32.000 km',
          color: 'Trắng ngọc trai',
          location: 'Cần Thơ',
          image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
          summary: 'Xe gầm cao 7 chỗ siêu đẹp, bảo hành garage 1 năm.',
          description: 'Đầy đủ lịch sử...',
          status: 'available',
        },
        {
          id: 2,
          title: 'Ford Everest Titanium+ 2.0L 4WD 2023',
          slug: 'ford-everest-titanium-2023',
          listing_type: 'sale',
          price: 1350000000,
          year: 2023,
          transmission: 'Tự động 10 cấp',
          fuel_type: 'Dầu Bi-Turbo',
          mileage: '18.000 km',
          color: 'Đen Titanium',
          location: 'Cần Thơ',
          image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
          summary: 'SUV Mỹ đẳng cấp, cửa sổ trời Panorama.',
          description: 'Chưa đâm đụng...',
          status: 'available',
        },
        {
          id: 3,
          title: 'Cho Thuê Xe Du Lịch Toyota Innova Cross 7 Chỗ Tự Lái',
          slug: 'cho-thue-xe-toyota-innova-cross',
          listing_type: 'rent',
          price: 1200000,
          year: 2024,
          transmission: 'Tự động CVT',
          fuel_type: 'Xăng Hybrid',
          mileage: 'Xe mới 100%',
          color: 'Đồng Ánh Kim',
          location: 'Cần Thơ',
          image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
          summary: 'Dịch vụ cho thuê xe du lịch tự lái / có tài.',
          description: 'Thuê 1.2M/ngày...',
          status: 'available',
        }
      ];
    }
  },

  async getPosts(): Promise<PostItem[]> {
    try {
      const res = await client.get('/posts');
      return res.data.data;
    } catch {
      return [
        {
          id: 1,
          title: 'Xe Cứu Hộ Ô Tô Cần Thơ 24/7 - Có Mặt Trong 15 Phút',
          slug: 'xe-cuu-ho-can-tho-247',
          category: 'Dịch vụ',
          summary: 'Dịch vụ xe cứu hộ giao thông chuyên nghiệp Cần Thơ kéo xe hỏng, cẩu xe tai nạn an toàn 24/24.',
          content: 'Khi di chuyển trên các quốc lộ Miền Tây...',
          image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
          published_at: new Date().toISOString(),
        },
        {
          id: 2,
          title: 'Rửa Động Cơ Ô Tô Bằng Hơi Nước Nóng Có Cần Thiết Không?',
          slug: 'rua-dong-co-o-to-co-can-thiet-khong',
          category: 'Kinh nghiệm xe',
          summary: 'Giải đáp thắc mắc của chủ xe về việc vệ sinh khoang máy định kỳ.',
          content: 'Khoang động cơ sau một thời gian vận hành...',
          image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
          published_at: new Date().toISOString(),
        }
      ];
    }
  },

  async createBooking(payload: BookingPayload) {
    const res = await client.post('/bookings', payload);
    return res.data;
  },

  async createRescueRequest(payload: RescuePayload) {
    const res = await client.post('/rescue', payload);
    return res.data;
  },
};
