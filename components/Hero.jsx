'use client';
import LegalBackgroundIcons from './LegalBackgroundIcons';

export default function Hero({ onOpenConsultModal }) {
  return (
    <section className="hero-section" id="hero">
      <LegalBackgroundIcons variant="hero" density="medium" enableParallax enablePointerMotion />
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge"><span /> CÔNG TY LUẬT TRẦN Á</div>
          <h1 className="hero-title">Trách nhiệm –<br /><em>Niềm tin.</em></h1>
          <p className="hero-subtitle">Mỗi vấn đề pháp lý đều cần một người đồng hành thấu hiểu. Trần Á cùng bạn bảo vệ quyền lợi và tìm lời giải cho những điều quan trọng.</p>
          <div className="hero-buttons">
            <button className="btn btn-primary btn-lg" onClick={() => onOpenConsultModal()}>Đặt lịch tư vấn <span aria-hidden="true">↗</span></button>
            <a href="#services" className="hero-explore">Khám phá dịch vụ <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-frame"><img src="/hero-bg.png" width="1024" height="1024" fetchPriority="high" alt="Minh họa không gian làm việc và nghiên cứu hồ sơ pháp lý" /></div>
          <div className="hero-image-label"><span>CÔNG TY LUẬT TRẦN Á</span><span>TRÁCH NHIỆM – NIỀM TIN</span></div>
          <div className="hero-quote"><span className="quote-mark" aria-hidden="true">“</span><p>Sự an tâm của bạn.<br /><em>Trách nhiệm của chúng tôi.</em></p><span className="quote-line" /></div>
          <span className="hero-side-note" aria-hidden="true">TRÁCH NHIỆM – NIỀM TIN</span>
        </div>
      </div>
      <div className="container hero-bottom"><a href="#thu-tuc-hanh-chinh">Thủ tục hành chính nhà đất <span>↗</span></a><a href="#services">Tranh tụng & Tòa án <span>↗</span></a><a href="#services">Đất đai & Nhà ở <span>↗</span></a><a href="#services">Doanh nghiệp <span>↗</span></a></div>
    </section>
  );
}
