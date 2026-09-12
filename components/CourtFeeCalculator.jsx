'use client';

import { useState } from 'react';

export default function CourtFeeCalculator({ onOpenConsultModal }) {
  const [caseType, setCaseType] = useState('civil_value');
  const [disputeValue, setDisputeValue] = useState('500,000,000');

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('vi-VN').format(val) + ' VNĐ';
  };

  const parseFormattedNumber = (valStr) => {
    return parseFloat(valStr.replace(/[^0-9]/g, '')) || 0;
  };

  const handleInputChange = (e) => {
    const rawNum = parseFormattedNumber(e.target.value);
    if (rawNum === 0 && e.target.value.trim() === '') {
      setDisputeValue('');
    } else {
      setDisputeValue(new Intl.NumberFormat('en-US').format(rawNum));
    }
  };

  const amount = parseFormattedNumber(disputeValue);
  let totalFee = 0;
  let explanation = '';

  if (caseType === 'civil_no_value' || caseType === 'marriage_divorce' || caseType === 'administrative') {
    totalFee = 300000;
    explanation = 'Án phí sơ thẩm không có giá ngạch/hành chính cố định: 300.000 VNĐ theo quy định.';
  } else if (caseType === 'civil_value' || caseType === 'marriage_property' || caseType === 'business') {
    if (amount <= 60000000) {
      totalFee = Math.max(300000, amount * 0.05);
      explanation = `Án phí = 5% x ${formatCurrency(amount)} (Mức tối thiểu 300.000 VNĐ).`;
    } else if (amount <= 400000000) {
      totalFee = 3000000 + 0.04 * (amount - 60000000);
      explanation = `Án phí = 3.000.000 VNĐ + 4% x (${formatCurrency(amount)} - 60.000.000 VNĐ).`;
    } else if (amount <= 800000000) {
      totalFee = 16600000 + 0.03 * (amount - 400000000);
      explanation = `Án phí = 16.600.000 VNĐ + 3% x (${formatCurrency(amount)} - 400.000.000 VNĐ).`;
    } else if (amount <= 2000000000) {
      totalFee = 28600000 + 0.02 * (amount - 800000000);
      explanation = `Án phí = 28.600.000 VNĐ + 2% x (${formatCurrency(amount)} - 800.000.000 VNĐ).`;
    } else if (amount <= 4000000000) {
      totalFee = 52600000 + 0.001 * (amount - 2000000000);
      explanation = `Án phí = 52.600.000 VNĐ + 0.1% x (${formatCurrency(amount)} - 2.000.000.000 VNĐ).`;
    } else {
      totalFee = 54600000 + 0.0001 * (amount - 4000000000);
      explanation = `Án phí = 54.600.000 VNĐ + 0.01% x (${formatCurrency(amount)} - 4.000.000.000 VNĐ).`;
    }
  }

  const advanceFee = totalFee * 0.5;

  return (
    <section className="calculator-section" id="calculator">
      <div className="container">
        <div className="calc-box">
          <div className="calc-header">
            <div className="section-tag light-tag"><i className="fa-solid fa-calculator"></i> CÔNG CỤ PHÁP LÝ TỰ ĐỘNG</div>
            <h2>Tra Cứu & Ước Tính Án Phí Tố Tụng Toà Án</h2>
            <p>Dựa trên Nghị quyết 326/2016/UBTVQH14 quy định về mức thu, miễn, giảm, thu, nộp, quản lý và sử dụng án phí, lệ phí Tòa án.</p>
          </div>

          <div className="calc-grid">
            <div className="calc-inputs">
              <div className="form-group">
                <label htmlFor="caseType"><i className="fa-solid fa-list-check"></i> Loại vụ việc tố tụng:</label>
                <select id="caseType" className="form-control" value={caseType} onChange={(e) => setCaseType(e.target.value)}>
                  <option value="civil_value">Vụ án Dân sự / Đất đai (Có giá ngạch)</option>
                  <option value="civil_no_value">Vụ án Dân sự / Đất đai (Không có giá ngạch)</option>
                  <option value="marriage_divorce">Vụ án Hôn nhân gia đình (Không tranh chấp tài sản)</option>
                  <option value="marriage_property">Vụ án Hôn nhân gia đình (Có tranh chấp tài sản)</option>
                  <option value="business">Tranh chấp Kinh doanh thương mại (Có giá ngạch)</option>
                  <option value="administrative">Vụ án Hành chính</option>
                </select>
              </div>

              {(caseType === 'civil_value' || caseType === 'marriage_property' || caseType === 'business') && (
                <div className="form-group">
                  <label htmlFor="disputeValue"><i className="fa-solid fa-money-bill-wave"></i> Giá trị tranh chấp (VNĐ):</label>
                  <input
                    type="text"
                    id="disputeValue"
                    className="form-control"
                    placeholder="Ví dụ: 500,000,000"
                    value={disputeValue}
                    onChange={handleInputChange}
                  />
                  <span className="input-note">Nhập số tiền hoặc giá trị quyền sử dụng đất đang tranh chấp.</span>
                </div>
              )}

              <button type="button" className="btn btn-gold btn-block">
                <i className="fa-solid fa-coins"></i> Đã Tự Động Tính Theo Thời Gian Thực
              </button>
            </div>

            <div className="calc-results">
              <div className="result-card">
                <span className="result-label">Tạm Ứng Án Phí Sơ Thẩm Phải Nộp (50% Án Phí):</span>
                <div className="result-price">{formatCurrency(advanceFee)}</div>
              </div>

              <div className="result-card secondary">
                <span className="result-label">Mức Án Phí Sơ Thẩm Chính Thức Estimator:</span>
                <div className="result-price-sub">{formatCurrency(totalFee)}</div>
              </div>

              <div className="result-explain">
                <strong>Cách tính:</strong> {explanation}
              </div>

              <div className="calc-cta text-center">
                <p>Cần tư vấn về trường hợp được miễn, giảm hoặc tạm hoãn nộp tạm ứng án phí?</p>
                <button className="btn btn-primary btn-sm" onClick={() => onOpenConsultModal('Tư vấn án phí & lệ phí toà án')}>
                  <i className="fa-solid fa-headset"></i> Hỏi Luật Sư Ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
