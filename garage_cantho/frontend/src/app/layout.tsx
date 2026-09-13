import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RescueWidget from '@/components/RescueWidget';

export const metadata: Metadata = {
  title: 'Garage Ô Tô Tây Nam Bộ Cần Thơ | Sửa Chữa • Bảo Dưỡng • Cứu Hộ 24/7',
  description:
    'Trung tâm sửa chữa ô tô chuyên nghiệp, rửa khoang máy hơi nước nóng, đồng sơn 3M, bọc da nội thất, phụ tùng ô tô chính hãng và xe cứu hộ 24/7 tại Cần Thơ.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="dark">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <RescueWidget />
      </body>
    </html>
  );
}
