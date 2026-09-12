'use client';

export default function Hero({ onOpenConsultModal }) {
  return (
    <section className="hero-section" id="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge"><span /> CÔNG TY LUẬT TRẦN Á</div>
          <h1 className="hero-title">Vững pháp lý.<br /><em>Vẹn niềm tin.</em></h1>
          <p className="hero-subtitle">Mỗi vấn đề pháp lý đều cần một người đồng hành thấu hiểu. Trần Á cùng bạn bảo vệ quyền lợi và tìm lời giải cho những điều quan trọng.</p>
          <div className="hero-buttons">
            <button className="btn btn-primary btn-lg" onClick={() => onOpenConsultModal()}>Đặt lịch tư vấn <span aria-hidden="true">↗</span></button>
            <a href="#services" className="hero-explore">Khám phá dịch vụ <span aria-hidden="true">↓</span></a>
          </div>
          <div className="hero-assurance"><span className="assurance-symbol" aria-hidden="true">✓</span><div><strong>Lắng nghe tận tâm. Tư vấn minh bạch.</strong><span>Bảo mật thông tin trong từng cuộc trao đổi.</span></div></div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-frame"><img src="/hero-bg.png" width="1024" height="1024" fetchPriority="high" alt="Minh họa không gian làm việc và nghiên cứu hồ sơ pháp lý" /></div>
          <div className="hero-image-label"><span>TRAN A LAW FIRM</span><span>UY TÍN · TẬN TÂM · HIỆU QUẢ</span></div>
          <div className="hero-quote"><span className="quote-mark" aria-hidden="true">“</span><p>Sự an tâm của bạn.<br /><em>Trách nhiệm của chúng tôi.</em></p><span className="quote-line" /></div>
          <span className="hero-side-note" aria-hidden="true">YOUR RIGHTS. OUR COMMITMENT.</span>
        </div>
      </div>
      <div className="container hero-bottom"><span>ĐỒNG HÀNH CÙNG BẠN</span><a href="#services">Tranh tụng & Tòa án <span>↗</span></a><a href="#services">Đất đai & Nhà ở <span>↗</span></a><a href="#services">Doanh nghiệp <span>↗</span></a></div>
    </section>
  );
}
