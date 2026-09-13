'use client';
import { useState } from 'react';
import Link from 'next/link';
import { services } from '@/lib/services';
import LegalBackgroundIcons from './LegalBackgroundIcons';

export default function PracticeAreas({ onOpenConsultModal }) {
  const [active, setActive] = useState(services[0]);
  return <section className={`services-section service-active-${services.findIndex(item => item.slug === active.slug) + 1}`} id="services"><LegalBackgroundIcons variant="services" density="medium" enableParallax /><div className="container practice-layout"><header className="practice-intro"><span className="section-tag">LĨNH VỰC PHÁP LÝ TRỌNG TÂM</span><h2 className="section-title">Chuyên môn vững vàng.<br /><em>Giải pháp phù hợp.</em></h2><p>Chúng tôi tiếp cận mỗi vụ việc bằng phân tích thận trọng, chiến lược rõ ràng và sự đồng hành trực tiếp.</p><div className="practice-visual"><img key={active.slug} src={active.image} alt="" loading="lazy" /><span>{active.number} / 06</span></div></header><div className="practice-list">{services.map(service => <article className={active.slug === service.slug ? 'active' : ''} key={service.slug} onMouseEnter={() => setActive(service)} onFocus={() => setActive(service)}><span className="practice-number">{service.number}</span><div><h3><Link href={`/linh-vuc/${service.slug}`}>{service.title}</Link></h3><p>{service.description}</p><div className="practice-actions"><Link href={`/linh-vuc/${service.slug}`}>Tìm hiểu lĩnh vực <span>↗</span></Link><button onClick={() => onOpenConsultModal(service.title)}>Trao đổi vụ việc</button></div></div></article>)}</div></div></section>;
}
