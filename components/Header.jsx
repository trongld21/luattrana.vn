'use client';

import { useState, useEffect, useRef } from 'react';

export default function Header({ onOpenConsultModal, variant = 'home' }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerRef = useRef(null);
  const toggleRef = useRef(null);
  const homeHref = anchor => variant === 'home' ? anchor : `/${anchor}`;

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const drawer = drawerRef.current;
    const focusable = () => [...drawer.querySelectorAll('a[href], button')];
    focusable()[0]?.focus();
    const onKey = (event) => {
      if (event.key === 'Escape') setMobileOpen(false);
      if (event.key !== 'Tab') return;
      const items = focusable();
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    const onResize = () => { if (window.innerWidth > 1080) setMobileOpen(false); };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      toggleRef.current?.focus();
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* TOP UTILITY BAR */}
      <div className={`top-bar ${variant === 'inner' ? 'inner-top-bar' : ''}`}>
        <div className="container top-bar-content">
          <div className="top-bar-left">
            <span className="top-item"><i className="fa-solid fa-clock"></i> Giờ làm việc: T2 - T7 (07:30 - 17:30)</span>
            <span className="top-item d-none-mobile"><i className="fa-solid fa-shield-halved"></i> Luật Sư Tranh Tụng & Đất Đai Uy Tín</span>
          </div>
          <div className="top-bar-right">
            <a href="tel:0918439995" className="top-link phone-link"><i className="fa-solid fa-phone"></i> <strong>0918.439.995</strong></a>
            <a href="https://zalo.me/0918439995" target="_blank" rel="noopener noreferrer" className="top-link zalo-link"><i className="fa-solid fa-comment-dots"></i> Tư vấn Zalo</a>
            <a href="https://maps.app.goo.gl/sRYWsP2hmoNTCVvw8?g_st=ic" target="_blank" rel="noopener noreferrer" className="top-link maps-link"><i className="fa-solid fa-location-dot"></i> Google Maps</a>
            <a href="https://www.facebook.com/Luattrana020726/" target="_blank" rel="noopener noreferrer" className="top-link fb-link"><i className="fa-brands fa-facebook-f"></i> Fanpage</a>
          </div>
        </div>
      </div>

      {/* MAIN HEADER / NAVIGATION */}
      <header className={`main-header ${variant === 'inner' ? 'inner-header' : ''} ${scrolled ? 'scrolled' : ''}`} id="mainHeader">
        <div className="container header-container">
          <a href="/" className="brand-logo">
            <img src="/logo.svg" alt="Công ty Luật Trần Á Logo" className="logo-img" />
            <div className="brand-text">
              <span className="brand-title">CÔNG TY LUẬT TRẦN Á</span>
              <span className="brand-subtitle">TRAN A LAW FIRM • UY TÍN - TẬN TÂM - HIỆU QUẢ</span>
            </div>
          </a>

          <nav className="main-nav">
            <ul>
              <li><a href={homeHref('#hero')} className={`nav-link ${variant === 'home' ? 'active' : ''}`}>Trang Chủ</a></li>
              <li><a href={homeHref('#about')} className="nav-link">Giới Thiệu</a></li>
              <li className="has-dropdown">
                <a href={homeHref('#services')} className="nav-link">Lĩnh Vực Dịch Vụ <i className="fa-solid fa-chevron-down dropdown-icon"></i></a>
                <ul className="dropdown-menu">
                  <li><a href="/linh-vuc/tranh-tung-toa-an"><span>01 — Tranh tụng & Tòa án</span></a></li>
                  <li><a href="/linh-vuc/dat-dai-bat-dong-san"><span>02 — Đất đai & Bất động sản</span></a></li>
                  <li><a href="/linh-vuc/bao-chua-hinh-su"><span>03 — Hình sự</span></a></li>
                  <li><a href="/linh-vuc/dan-su-thua-ke"><span>04 — Dân sự & Thừa kế</span></a></li>
                  <li><a href="/linh-vuc/hon-nhan-gia-dinh"><span>05 — Hôn nhân & Gia đình</span></a></li>
                  <li><a href="/linh-vuc/doanh-nghiep-thuong-mai"><span>06 — Doanh nghiệp & Thương mại</span></a></li>
                </ul>
              </li>
              <li><a href={homeHref('#calculator')} className="nav-link"><i className="fa-solid fa-calculator"></i> Tính Án Phí</a></li>
              <li><a href={homeHref('#legal-docs')} className="nav-link">Biểu Mẫu & Án Lệ</a></li>
              <li><a href="/bai-viet" className="nav-link">Bài Viết</a></li>
              <li><a href={homeHref('#contact')} className="nav-link">Liên Hệ</a></li>
            </ul>
          </nav>

          <div className="header-actions">
            <button className="btn btn-primary" onClick={() => onOpenConsultModal()}>
              <i className="fa-solid fa-calendar-check"></i> Đặt Lịch Tư Vấn
            </button>
            <button className="mobile-menu-toggle" ref={toggleRef} aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => setMobileOpen(true)} aria-label="Mở menu">
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <div className={`mobile-drawer ${mobileOpen ? 'active' : ''}`} aria-hidden={!mobileOpen} inert={mobileOpen ? undefined : ""}>
        <div className="drawer-overlay" onClick={() => setMobileOpen(false)}></div>
        <div className="drawer-content" ref={drawerRef} id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Điều hướng website">
          <div className="drawer-header">
            <div className="brand-logo">
              <img src="/logo.svg" alt="Logo" className="logo-img-sm" />
              <span>LUẬT TRẦN Á</span>
            </div>
            <button className="drawer-close" aria-label="Đóng menu" onClick={() => setMobileOpen(false)}><i className="fa-solid fa-xmark"></i></button>
          </div>
          <ul className="drawer-menu">
            <li><a href={homeHref('#hero')} className="mobile-nav-link" onClick={() => setMobileOpen(false)}><i className="fa-solid fa-house"></i> Trang Chủ</a></li>
            <li><a href={homeHref('#about')} className="mobile-nav-link" onClick={() => setMobileOpen(false)}><i className="fa-solid fa-building-user"></i> Giới Thiệu</a></li>
            <li><a href={homeHref('#services')} className="mobile-nav-link" onClick={() => setMobileOpen(false)}><i className="fa-solid fa-gavel"></i> Lĩnh Vực Dịch Vụ</a></li>
            <li><a href={homeHref('#calculator')} className="mobile-nav-link" onClick={() => setMobileOpen(false)}><i className="fa-solid fa-calculator"></i> Tính Án Phí Tố Tụng</a></li>
            <li><a href={homeHref('#legal-docs')} className="mobile-nav-link" onClick={() => setMobileOpen(false)}><i className="fa-solid fa-file-contract"></i> Tra Cứu Án Lệ & Biểu Mẫu</a></li>
            <li><a href="/bai-viet" className="mobile-nav-link">Kiến thức pháp lý & Bài viết</a></li>
            <li><a href={homeHref('#contact')} className="mobile-nav-link" onClick={() => setMobileOpen(false)}><i className="fa-solid fa-address-book"></i> Liên Hệ & Bản Đồ</a></li>
          </ul>
          <div className="drawer-contact-info">
            <p><i className="fa-solid fa-phone"></i> Hotline: <a href="tel:0918439995">0918.439.995</a></p>
            <p><i className="fa-solid fa-comment"></i> Zalo: <a href="https://zalo.me/0918439995" target="_blank" rel="noopener noreferrer">Tư vấn trực tiếp</a></p>
            <p><i className="fa-brands fa-facebook"></i> Facebook: <a href="https://www.facebook.com/Luattrana020726/" target="_blank" rel="noopener noreferrer">Fanpage Luật Trần Á</a></p>
          </div>
        </div>
      </div>
    </>
  );
}
