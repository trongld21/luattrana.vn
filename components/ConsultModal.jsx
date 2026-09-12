'use client';
import useDialog from './useDialog';

import { useState, useEffect } from 'react';

export default function ConsultModal({ isOpen, onClose, selectedService, onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Tham dự toà án & Tranh tụng',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (selectedService) {
      setFormData(prev => ({ ...prev, service: selectedService }));
    }
  }, [selectedService]);

  const dialogRef = useDialog(isOpen, onClose);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        onShowToast(`Đã nhận yêu cầu đặt lịch từ Quý khách ${formData.name} (${formData.phone})!`);
        setFormData({ name: '', phone: '', service: 'Tham dự toà án & Tranh tụng', message: '' });
        onClose();
        setTimeout(() => {
          window.open('https://zalo.me/0918439995', '_blank');
        }, 1500);
      } else {
        onShowToast('Lỗi: ' + (data.error || 'Vui lòng thử lại'));
      }
    } catch (err) {
      onShowToast('Đã nhận yêu cầu đặt lịch tư vấn!');
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop active">
      <div className="modal-box" ref={dialogRef} role="dialog" aria-modal="true" aria-label="Đặt lịch tư vấn">
        <button className="modal-close" aria-label="Đóng hộp thoại" onClick={onClose}><i className="fa-solid fa-xmark"></i></button>
        <div className="modal-header">
          <img src="/logo.svg" alt="Logo" className="modal-logo" />
          <h3>Đặt Lịch Tư Vấn Với Luật Sư Trần Á</h3>
          <p>Vui lòng để lại thông tin, Luật sư chuyên trách sẽ tư vấn ngay lập tức</p>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit} className="modal-form">
            <div className="form-group">
              <label htmlFor="mName">Họ và tên *</label>
              <input
                type="text"
                id="mName"
                className="form-control"
                placeholder="Nhập họ và tên"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="mPhone">Số điện thoại / Zalo liên hệ *</label>
              <input
                type="tel"
                id="mPhone"
                className="form-control"
                placeholder="Nhập số điện thoại"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="mService">Dịch vụ quan tâm</label>
              <select
                id="mService"
                className="form-control"
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              >
                <option value="Tham dự toà án & Tranh tụng">Tham dự toà án & Tranh tụng</option>
                <option value="Dịch vụ đất đai & Bất động sản">Dịch vụ đất đai & Bất động sản</option>
                <option value="Bào chữa án hình sự">Bào chữa án hình sự</option>
                <option value="Tranh chấp dân sự & Thừa kế">Tranh chấp dân sự & Thừa kế</option>
                <option value="Hôn nhân & Gia đình">Hôn nhân & Gia đình</option>
                <option value="Tư vấn Doanh nghiệp & Thương mại">Tư vấn Doanh nghiệp & Thương mại</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="mDetail">Nội dung câu hỏi / Tình huống pháp lý</label>
              <textarea
                id="mDetail"
                className="form-control"
                rows={3}
                placeholder="Mô tả sơ lược tình huống pháp lý..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-gold btn-block btn-lg" disabled={submitting}>
              {submitting ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-paper-plane"></i>} Gửi Yêu Cầu Ngay
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
