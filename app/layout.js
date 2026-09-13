import './globals.css';
import './refined.css';

export const metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'https://luattrana.vn'),
  title: 'Công ty Luật Trần Á | Luật Sư Tham Dự Toà Án & Dịch Vụ Đất Đai Uy Tín',
  description: 'Công ty Luật Trần Á chuyên cung cấp dịch vụ luật sư tranh tụng, tham dự toà án, tư vấn & giải quyết tranh chấp đất đai, nhà ở, dân sự, hình sự, hôn nhân & gia đình. Uy tín - Tận tâm - Hiệu quả.',
  keywords: 'luật trần á, công ty luật trần á, luật sư tranh tụng, luật sư đất đai, tham dự toà án, giải quyết tranh chấp đất đai, tư vấn ly hôn, luật sư hình sự',
  authors: [{ name: 'Công ty Luật Trần Á' }],
  openGraph: {
    title: 'Công ty Luật Trần Á | Luật Sư Tham Dự Toà Án & Dịch Vụ Đất Đai',
    description: 'Chuyên nghiệp trong tham dự toà án, tranh tụng và giải quyết các dịch vụ pháp lý về đất đai, dân sự, hình sự.',
    images: ['/logo.svg'],
  },
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,400&family=Nunito+Sans:ital,opsz,wght@0,6..12,300;0,6..12,400;0,6..12,600;0,6..12,700;0,6..12,800;1,6..12,400&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
