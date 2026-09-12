'use client';

import { useState, useEffect } from 'react';

export default function LegalDocsSearch({ onOpenDocModal }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDocs();
  }, [category, query]);

  const fetchDocs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/documents?category=${category}&q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data.success) {
        setDocs(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch legal docs', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="legal-docs-section" id="legal-docs">
      <div className="container">
        <div className="section-header text-center">
          <div className="section-tag"><i className="fa-solid fa-file-shield"></i> THƯ VIỆN BẢN ÁN & BIỂU MẪU</div>
          <h2 className="section-title">Hệ Thống Tra Cứu Biểu Mẫu & Án Lệ</h2>
          <p className="section-subtitle">Tải miễn phí các mẫu đơn khởi kiện, hợp đồng mẫu và tài liệu tham khảo pháp lý chuẩn quy định</p>
        </div>

        <div className="docs-search-bar">
          <div className="search-input-wrap">
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
            <input
              type="text"
              placeholder="Nhập từ khóa (vd: Đơn khởi kiện đất đai, ly hôn, di chúc, khiếu nại...)"
              className="form-control"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="search-category-wrap">
            <select
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">Tất cả danh mục</option>
              <option value="bieumau">Biểu mẫu - Đơn mẫu</option>
              <option value="anle">Bản án & Án lệ</option>
              <option value="hopdong">Hợp đồng mẫu</option>
              <option value="congvan">Văn bản hướng dẫn</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center" style={{ padding: '40px 0', color: 'var(--color-text-muted)' }}>
            <i className="fa-solid fa-spinner fa-spin fa-2x"></i>
            <p style={{ marginTop: '10px' }}>Đang kết nối PostgreSQL tra cứu biểu mẫu...</p>
          </div>
        ) : (
          <div className="docs-grid">
            {docs.map((doc) => (
              <div className="doc-card" key={doc.id}>
                <div className="doc-icon"><i className="fa-solid fa-file-pen"></i></div>
                <div className="doc-info">
                  <span className={`doc-badge ${doc.category === 'anle' ? 'gold' : ''}`}>
                    {doc.category === 'bieumau' ? 'Biểu mẫu' : doc.category === 'anle' ? 'Án lệ tham khảo' : 'Tài liệu chuẩn'}
                  </span>
                  <h4 className="doc-title">{doc.title}</h4>
                  <p className="doc-desc">{doc.description}</p>
                </div>
                <button
                  className="doc-action-btn"
                  onClick={() => onOpenDocModal(doc)}
                >
                  <i className="fa-solid fa-eye"></i> Xem & Tải
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
