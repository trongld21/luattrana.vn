'use client';

import { useState } from 'react';
import LegalBackgroundIcons from './LegalBackgroundIcons';

export default function ContactSection({ onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Tham dự toà án & Tranh tụng',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState('idle');
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setStatus('idle'); setFormError('');

    try {
      const res = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        setStatus('success');
        onShowToast(`Cảm ơn Quý khách ${formData.name}! Thông tin đã được lưu vào hệ thống. Luật sư sẽ liên hệ lại qua SĐT ${formData.phone} ngay lập tức.`);
        setFormData({ name: '', phone: '', service: 'Tham dự toà án & Tranh tụng', message: '' });
        setTimeout(() => {
          window.open('https://zalo.me/0918439995', '_blank');
        }, 1500);
      } else {
        setStatus('error'); setFormError(data.error || 'Vui lòng thử lại.');
      }
    } catch (err) {
      setStatus('error'); setFormError('Chưa thể gửi yêu cầu. Vui lòng thử lại hoặc gọi hotline 0918.439.995.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <LegalBackgroundIcons variant="contact" density="low" enableParallax />
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info-panel">
            <div className="section-tag light-tag"><i className="fa-solid fa-location-dot"></i> KHAI THÔNG PHÁP LÝ</div>
            <h2 className="contact-panel-title">Liên Hệ Công Ty Luật Trần Á</h2>
            <p className="contact-panel-desc">
              Quý khách có nhu cầu tư vấn pháp luật, tham dự toà án hoặc xử lý hồ sơ đất đai, xin vui lòng liên hệ trực tiếp với chúng tôi qua các kênh dưới đây:
            </p>

            <div className="contact-cards">
              <div className="c-info-card">
                <div className="c-icon"><i className="fa-solid fa-phone-volume"></i></div>
                <div className="c-details">
                  <span className="c-label">Hotline / Điện Thoại:</span>
                  <a href="tel:0918439995" className="c-val highlight-val">0918.439.995</a>
                </div>
              </div>

              <div className="c-info-card">
                <div className="c-icon"><i className="fa-solid fa-comments"></i></div>
                <div className="c-details">
                  <span className="c-label">Tư Vấn Zalo Trực Tuyến:</span>
                  <a href="https://zalo.me/0918439995" target="_blank" rel="noopener noreferrer" className="c-val">0918.439.995 (Chat Ngay)</a>
                </div>
              </div>

              <div className="c-info-card">
                <div className="c-icon"><i className="fa-brands fa-facebook"></i></div>
                <div className="c-details">
                  <span className="c-label">Trang Facebook Fanpage:</span>
                  <a href="https://www.facebook.com/Luattrana020726/" target="_blank" rel="noopener noreferrer" className="c-val">facebook.com/Luattrana020726</a>
                </div>
              </div>

              <div className="c-info-card">
                <div className="c-icon"><i className="fa-solid fa-map-location-dot"></i></div>
                <div className="c-details">
                  <span className="c-label">Vị trí & Bản đồ Google Maps:</span>
                  <a href="https://maps.app.goo.gl/sRYWsP2hmoNTCVvw8?g_st=ic" target="_blank" rel="noopener noreferrer" className="c-val">Xem vị trí Công ty Luật Trần Á trên Google Maps <i className="fa-solid fa-arrow-up-right-from-square"></i></a>
                </div>
              </div>

              <div className="c-info-card">
                <div className="c-icon"><i className="fa-solid fa-clock"></i></div>
                <div className="c-details">
                  <span className="c-label">Thời Gian Làm Việc:</span>
                  <span className="c-val">Thứ Hai – Thứ Bảy: 07:30 – 17:30 (Hỗ trợ khẩn cấp 24/7 qua Zalo)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-panel">
            <div className="form-wrapper">
              <h3><i className="fa-solid fa-calendar-plus"></i> Đặt Lịch Tư Vấn & Gửi Hồ Sơ</h3>
              <p>Vui lòng điền thông tin bên dưới, thông tin sẽ được lưu trữ bảo mật vào PostgreSQL và Luật sư sẽ liên hệ lại ngay.</p>

              <form onSubmit={handleSubmit} className="site-form">
                {status === 'success' && <div className="form-success" role="status"><span>✓</span><div><strong>Yêu cầu đã được tiếp nhận.</strong><p>Luật sư sẽ liên hệ lại với Quý khách.</p></div></div>}
                {status === 'error' && <p className="form-error" role="alert">{formError}</p>}
                <div className="form-row">
                  <div className="form-group col-6">
                    <label htmlFor="cName">Họ và tên Quý khách *</label>
                    <input
                      type="text"
                      id="cName"
                      className="form-control"
                      placeholder="Nguyễn Văn A"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group col-6">
                    <label htmlFor="cPhone">Số điện thoại / Zalo *</label>
                    <input
                      type="tel"
                      id="cPhone"
                      className="form-control"
                      placeholder="0912 345 678"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="cService">Lĩnh vực cần tư vấn *</label>
                  <select
                    id="cService"
                    className="form-control"
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  >
                    <option value="Tham dự toà án & Tranh tụng">Tham dự toà án & Tranh tụng</option>
                    <option value="Dịch vụ đất đai & Bất động sản">Dịch vụ đất đai & Bất động sản</option>
                    <option value="Bào chữa án hình sự">Bào chữa án hình sự</option>
                    <option value="Tranh chấp dân sự & Thừa kế">Tranh chấp dân sự & Thừa kế</option>
                    <option value="Hôn nhân & Gia đình">Hôn nhân & Gia đình</option>
                    <option value="Tư vấn Doanh nghiệp & Thương mại">Tư vấn Doanh nghiệp & Thương mại</option>
                    <option value="Khác">Dịch vụ pháp lý khác</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="cMessage">Tóm tắt nội dung vụ việc / Câu hỏi pháp lý</label>
                  <textarea
                    id="cMessage"
                    className="form-control"
                    rows={4}
                    placeholder="Mô tả sơ lược tình huống pháp lý của quý khách..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-gold btn-block btn-lg" disabled={submitting}>
                  {submitting ? <i className="fa-solid fa-spinner fa-spin"></i> : null} {submitting ? 'Đang gửi yêu cầu…' : 'Gửi yêu cầu tư vấn'}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="map-container">
          <div className="map-card">
            <div className="map-header">
              <h4><i className="fa-solid fa-map-pin"></i> Vị Trí Văn Phòng Công Ty Luật Trần Á</h4>
              <a href="https://maps.app.goo.gl/sRYWsP2hmoNTCVvw8?g_st=ic" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm">
                <i className="fa-solid fa-location-arrow"></i> Mở ứng dụng Google Maps
              </a>
            </div>
            <div className="map-frame">
              <iframe
                title="Bản đồ vị trí Công ty Luật Trần Á"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5!2d106.6!3d10.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQyJzAwLjAiTiAxMDYsNDInMDAuMCJF!5e0!3m2!1svi!2s!4v1600000000000!5m2!1svi!2s"
                width="100%"
                height="380"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
