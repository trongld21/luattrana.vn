'use client';
import useDialog from './useDialog';

export default function DocModal({ doc, onClose, onOpenConsultModal, onShowToast }) {
  const dialogRef = useDialog(Boolean(doc), onClose);

  if (!doc) return null;

  return (
    <div className="modal-backdrop active">
      <div className="modal-box modal-lg" ref={dialogRef} role="dialog" aria-modal="true" aria-label="Chi tiết tài liệu">
        <button className="modal-close" aria-label="Đóng hộp thoại" onClick={onClose}><i className="fa-solid fa-xmark"></i></button>
        <div className="modal-header">
          <h3>{doc.title}</h3>
          <span className="doc-modal-badge">{doc.category === 'bieumau' ? 'Biểu mẫu chuẩn' : 'Tài liệu chuẩn Tòa án'}</span>
        </div>
        <div className="modal-body">
          <div className="doc-preview-box" dangerouslySetInnerHTML={{ __html: doc.content }} />
        </div>
        <div className="modal-footer">
          <button className="btn btn-gold" onClick={() => onShowToast('Đã bắt đầu tải file mẫu văn bản (.docx) thành công!')}>
            <i className="fa-solid fa-download"></i> Tải Văn Bản Mẫu (.docx)
          </button>
          <button className="btn btn-primary" onClick={() => { onClose(); onOpenConsultModal(`Soạn thảo ${doc.title}`); }}>
            <i className="fa-solid fa-user-pen"></i> Nhờ Luật Sư Soạn Thảo Giúp
          </button>
        </div>
      </div>
    </div>
  );
}
