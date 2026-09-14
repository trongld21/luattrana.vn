import LegalBackgroundIcons from './LegalBackgroundIcons';

export default function Commitment() {
  return <section className="commitment-section">
    <div className="commitment-image" aria-hidden="true" />
    <LegalBackgroundIcons variant="dark" density="low" enableParallax />
    <div className="container commitment-copy"><span className="section-tag">LỜI CAM KẾT CỦA TRẦN Á</span><h2>Trách nhiệm –<br /><em>Niềm tin.</em></h2><p>Quyền lợi của khách hàng là trọng tâm trong mỗi tư vấn, mỗi hồ sơ và mỗi lần chúng tôi hiện diện tại phiên tòa.</p><a href="#contact" className="editorial-link">Trao đổi cùng luật sư <span>↗</span></a></div>
  </section>;
}
