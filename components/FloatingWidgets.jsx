'use client';

import { useState, useEffect } from 'react';

export default function FloatingWidgets({ onOpenConsultModal }) {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTop(true);
      } else {
        setShowTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  return (
    <>
      <div className="floating-widgets">
        <a href="https://zalo.me/0939369489" target="_blank" rel="noopener noreferrer" className="float-btn zalo-float" aria-label="Tư vấn qua Zalo">
          <i className="fa-solid fa-comment-dots"></i>
          <span className="float-tooltip">Zalo 0939 369 489</span>
        </a>
        <a href="tel:0939369489" className="float-btn call-float" aria-label="Gọi ngay cho Luật sư">
          <i className="fa-solid fa-phone-volume"></i>
          <span className="float-tooltip">Gọi 0939 369 489</span>
        </a>
        <button className={`float-btn back-to-top ${showTop ? 'show' : ''}`} onClick={scrollToTop} title="Về đầu trang">
          <i className="fa-solid fa-arrow-up"></i>
        </button>
      </div>

      <div className="mobile-action-dock">
        <div className="dock-grid">
          <a href="tel:0939369489" className="dock-item call-dock">
            <i className="fa-solid fa-phone-volume"></i>
            <span>Gọi Điện thoại</span>
          </a>
          <a href="https://zalo.me/0939369489" target="_blank" rel="noopener noreferrer" className="dock-item primary-dock">
            <i className="fa-solid fa-comment-dots"></i>
            <span>Chat Zalo</span>
          </a>
          <button className="dock-item" onClick={() => onOpenConsultModal && onOpenConsultModal('Đặt Lịch Tư Vấn qua Mobile Dock')}>
            <i className="fa-solid fa-calendar-check"></i>
            <span>Đặt Lịch</span>
          </button>
          <a href="https://maps.app.goo.gl/sRYWsP2hmoNTCVvw8?g_st=ic" target="_blank" rel="noopener noreferrer" className="dock-item">
            <i className="fa-solid fa-location-dot"></i>
            <span>Chỉ Đường</span>
          </a>
        </div>
      </div>
    </>
  );
}
