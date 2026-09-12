'use client';

import { useState } from 'react';

export default function PracticeAreas({ onOpenConsultModal }) {
  const [filter, setFilter] = useState('all');

  const services = [
    {
      id: 'toaan',
      category: 'toaan',
      tag: 'Thế Mạnh Hàng Đầu',
      image: '/court-litigation.png',
      icon: 'fa-gavel',
      title: 'Tham Dự Toà Án & Tranh Tụng',
      desc: 'Cử Luật sư đại diện ủy quyền hoặc bảo vệ quyền và lợi ích hợp pháp trực tiếp tại các phiên tòa sơ thẩm, phúc thẩm, giám đốc thẩm trên toàn quốc.',
      checklist: [
        'Tranh tụng án Dân sự, Đất đai, Kinh doanh thương mại',
        'Đại diện tố tụng tại Tòa án & Trung tâm Trọng tài',
        'Soạn thảo Đơn khởi kiện, Bản tự khai, Yêu cầu phản tố',
        'Phân tích chứng cứ, bảo vệ tối đa lợi ích khách hàng'
      ]
    },
    {
      id: 'datdai',
      category: 'datdai',
      tag: 'Chuyên Sâu',
      image: '/land-service.png',
      icon: 'fa-map-location-dot',
      title: 'Dịch Vụ Pháp Lý Đất Đai & Nhà Ở',
      desc: 'Tư vấn và trực tiếp thực hiện mọi thủ tục đất đai, giải quyết các tranh chấp ranh giới, thừa kế nhà đất và khiếu nại bồi thường thu hồi đất.',
      checklist: [
        'Giải quyết tranh chấp đất đai tại UBND & Tòa án',
        'Thủ tục cấp mới, sang tên, chuyển mục đích sử dụng',
        'Tách thửa, hợp thửa, khai nhận di sản thừa kế nhà đất',
        'Khởi kiện hủy Quyết định cấp GCNQSDĐ trái pháp luật'
      ]
    },
    {
      id: 'hinhsu',
      category: 'hinhsu',
      tag: null,
      image: '/legal-library.jpg',
      icon: 'fa-user-shield',
      title: 'Luật Sư Bào Chữa Án Hình Sự',
      desc: 'Tham gia bảo vệ người bị tạm giữ, bị cáo, người bị hại trong suốt giai đoạn Điều tra, Truy tố, Xét xử nhằm đảm bảo không bị oan sai.',
      checklist: [
        'Tham gia lấy lời khai, đối chất tại Cơ quan điều tra',
        'Thu thập chứng cứ gỡ tội, các tình tiết giảm nhẹ',
        'Bào chữa trực tiếp tại phiên toà xét xử hình sự',
        'Bảo vệ quyền lợi người bị hại, người có nghĩa vụ liên quan'
      ]
    },
    {
      id: 'dansu',
      category: 'dansu',
      tag: null,
      image: '/land-service.png',
      icon: 'fa-handshake',
      title: 'Tranh Chấp Dân Sự & Thừa Kế',
      desc: 'Giải quyết triệt để các tranh chấp hợp đồng dân sự, vay nợ, chia di sản thừa kế theo di chúc hoặc theo pháp luật.',
      checklist: [
        'Giải quyết tranh chấp hợp đồng đặt cọc, mua bán, vay tài sản',
        'Tư vấn lập di chúc hợp pháp, phân chia di sản thừa kế',
        'Thu hồi nợ xấu, đòi bồi thường thiệt hại ngoài hợp đồng',
        'Khởi kiện vụ án dân sự tại Tòa án nhân dân'
      ]
    },
    {
      id: 'honnhan',
      category: 'honnhan',
      tag: null,
      image: '/office-interior.png',
      icon: 'fa-people-roof',
      title: 'Hôn Nhân & Gia Đình',
      desc: 'Tư vấn và đại diện giải quyết các vụ việc ly hôn, phân chia tài sản chung vợ chồng, quyền nuôi con và cấp dưỡng.',
      checklist: [
        'Thủ tục ly hôn thuận tình nhanh gọn & đơn phương ly hôn',
        'Tranh chấp quyền nuôi con, mức cấp dưỡng sau ly hôn',
        'Chia tài sản chung, nợ chung vợ chồng khi ly hôn',
        'Tranh chấp ly hôn có yếu tố nước ngoài'
      ]
    },
    {
      id: 'doanhnghiep',
      category: 'doanhnghiep',
      tag: null,
      image: '/business-architecture.jpg',
      icon: 'fa-briefcase',
      title: 'Tư Vấn Doanh Nghiệp & Thương Mại',
      desc: 'Cung cấp dịch vụ Luật sư nội bộ thường xuyên, tư vấn rà soát hợp đồng thương mại, giải quyết tranh chấp kinh doanh.',
      checklist: [
        'Tư vấn pháp lý thường xuyên cho Doanh nghiệp',
        'Soạn thảo & rà soát Hợp đồng mua bán, đầu tư, lao động',
        'Tranh chấp giữa các thành viên góp vốn, cổ đông',
        'Tranh chấp hợp đồng thương mại trong và ngoài nước'
      ]
    }
  ];

  const filteredServices = services.filter(s => filter === 'all' || s.category === filter);

  return (
    <section className="services-section" id="services">
      <div className="container">
        <div className="section-header text-center">
          <div className="section-tag"><i className="fa-solid fa-scale-balanced"></i> DỊCH VỤ PHÁP LÝ TRỌNG TÂM</div>
          <h2 className="section-title">Chuyên môn vững vàng.<br /><em>Giải pháp phù hợp.</em></h2>
          <p className="section-subtitle">Đội ngũ Luật sư Công ty Luật Trần Á sẵn sàng bảo vệ quyền lợi hợp pháp của Quý khách trên các lĩnh vực</p>
        </div>

        <div className="service-filters">
          <button aria-pressed={filter === 'all'} className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>Tất Cả Lĩnh Vực</button>
          <button aria-pressed={filter === 'toaan'} className={`filter-btn ${filter === 'toaan' ? 'active' : ''}`} onClick={() => setFilter('toaan')}><i className="fa-solid fa-gavel"></i> Tham Dự Toà Án</button>
          <button aria-pressed={filter === 'datdai'} className={`filter-btn ${filter === 'datdai' ? 'active' : ''}`} onClick={() => setFilter('datdai')}><i className="fa-solid fa-house-flag"></i> Dịch Vụ Đất Đai</button>
          <button aria-pressed={filter === 'hinhsu'} className={`filter-btn ${filter === 'hinhsu' ? 'active' : ''}`} onClick={() => setFilter('hinhsu')}><i className="fa-solid fa-shield-cat"></i> Hình Sự</button>
          <button aria-pressed={filter === 'dansu'} className={`filter-btn ${filter === 'dansu' ? 'active' : ''}`} onClick={() => setFilter('dansu')}><i className="fa-solid fa-handshake"></i> Dân Sự & Thừa Kế</button>
          <button aria-pressed={filter === 'honnhan'} className={`filter-btn ${filter === 'honnhan' ? 'active' : ''}`} onClick={() => setFilter('honnhan')}><i className="fa-solid fa-people-roof"></i> Hôn Nhân & Gia Đình</button>
          <button aria-pressed={filter === 'doanhnghiep'} className={`filter-btn ${filter === 'doanhnghiep' ? 'active' : ''}`} onClick={() => setFilter('doanhnghiep')}>Doanh Nghiệp</button>
        </div>

        <div className="services-grid" key={filter}>
          {filteredServices.map(item => (
            <div className="service-card" key={item.id}>
              <div className="service-card-image">
                <img src={item.image} alt={item.title} loading="lazy" width="1000" height="700" />
                <div className="service-card-banner">
                  {item.tag ? <span className="card-tag highlight-tag"><i className="fa-solid fa-star"></i> {item.tag}</span> : <div />}
                  <div className="card-icon"><i className={`fa-solid ${item.icon}`}></i></div>
                </div>
              </div>
              <div className="service-card-body">
                <h3 className="service-title">{item.title}</h3>
                <p className="service-desc">{item.desc}</p>
                <ul className="service-checklist">
                  {item.checklist.map((c, idx) => (
                    <li key={idx}><i className="fa-solid fa-check-circle"></i> {c}</li>
                  ))}
                </ul>
                <div className="service-card-footer">
                  <button className="btn btn-outline-primary" onClick={() => onOpenConsultModal(item.title)}>
                    Tư Vấn Ngay <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
