import './globals.css';
import './refined.css';
import './premium.css';

export const metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'https://luattrana.vn'),
  title: 'Công ty Luật Trần Á | Luật Sư Tham Dự Toà Án & Dịch Vụ Đất Đai Uy Tín',
  description: 'Công ty Luật Trần Á chuyên cung cấp dịch vụ luật sư tranh tụng, tham dự toà án, tư vấn & giải quyết tranh chấp đất đai, nhà ở, dân sự, hình sự, hôn nhân & gia đình. Trách nhiệm – Niềm tin.',
  keywords: 'luật trần á, công ty luật trần á, luật sư tranh tụng, luật sư đất đai, tham dự toà án, giải quyết tranh chấp đất đai, tư vấn ly hôn, luật sư hình sự',
  authors: [{ name: 'Công ty Luật Trần Á' }],
  openGraph: {
    title: 'Công ty Luật Trần Á | Luật Sư Tham Dự Toà Án & Dịch Vụ Đất Đai',
    description: 'Chuyên nghiệp trong tham dự toà án, tranh tụng và giải quyết các dịch vụ pháp lý về đất đai, dân sự, hình sự.',
    images: ['/logo.svg'],
  },
  twitter: { card: 'summary_large_image', title: 'Công ty Luật Trần Á', description: 'Trách nhiệm – Niềm tin', images: ['/hero-bg.png'] },
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
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context':'https://schema.org', '@type':['LegalService','Organization'], name:'Công ty Luật Trần Á', url:process.env.SITE_URL || 'https://luattrana.vn', telephone:'+84939369489', sameAs:['https://www.facebook.com/Luattrana020726/'] }).replace(/</g, '\\u003c') }} />
      </body>
    </html>
  );
}
