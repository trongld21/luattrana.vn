import { services } from '@/lib/services';
import LegalBackgroundIcons from './LegalBackgroundIcons';

export default function About() {
  const service = services[0];
  return <section className="about-section" id="thu-tuc-hanh-chinh">
    <LegalBackgroundIcons variant="light" density="low" enableParallax />
    <div className="container"><div className="section-tag">THỦ TỤC HÀNH CHÍNH</div>
      <h2 className="section-title">{service.title}</h2>
      <ul className="administrative-services">{service.issues.map(issue => <li key={issue}>{issue}</li>)}</ul>
      <a className="btn btn-primary" href={`/linh-vuc/${service.slug}`}>Tìm hiểu thủ tục nhà đất <span aria-hidden="true">↗</span></a>
    </div>
  </section>;
}
