'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import ChangePassword from './ChangePassword';
import { slugify } from '@/lib/content-client';
const resources = { posts: 'Bài viết SEO', categories: 'Danh mục', documents: 'Tài liệu pháp lý', consultations: 'Yêu cầu tư vấn', media: 'Thư viện ảnh' };
const statuses = { DRAFT: 'Bản nháp', PUBLISHED: 'Đã xuất bản', PENDING: 'Chờ xử lý', CONTACTED: 'Đã liên hệ', COMPLETED: 'Hoàn tất', CANCELLED: 'Đã hủy' };
const empty = {
  posts: { title: '', slug: '', excerpt: '', content: '<p></p>', coverUrl: '', coverAlt: '', status: 'DRAFT', categoryId: '', seoTitle: '', seoDescription: '' },
  categories: { name: '', slug: '' },
  documents: { title: '', category: 'bieumau', description: '', content: '<p></p>', keywords: '', downloadUrl: '' },
  consultations: { name: '', phone: '', service: '', message: '', status: 'PENDING' },
};
async function api(url, options) {
  const response = await fetch(url, options);
  const body = await response.json();
  if (response.status === 401) { window.location.assign('/admin/login'); throw new Error('Phiên đăng nhập hết hạn.'); }
  if (!response.ok) throw new Error(body.error || 'Không thể xử lý yêu cầu.');
  return body;
}
export default function AdminDashboard({ email }) {
  const [resource, setResource] = useState('posts'), [items, setItems] = useState([]), [total, setTotal] = useState(0), [page, setPage] = useState(1), [query, setQuery] = useState('');
  const [editing, setEditing] = useState(null), [categories, setCategories] = useState([]), [busy, setBusy] = useState(false), [loading, setLoading] = useState(false), [error, setError] = useState(''), [notice, setNotice] = useState(''), [revision, refresh] = useState(0);
  const editor = useRef(null), selection = useRef(null);
  useEffect(() => {
    const controller = new AbortController(); setLoading(true); setError('');
    const timer = setTimeout(() => api(`/api/admin/${resource}?page=${page}&q=${encodeURIComponent(query)}`, { signal: controller.signal }).then(data => { setItems(data.data); setTotal(data.total); }).catch(error => { if (error.name !== 'AbortError') setError(error.message); }).finally(() => { if (!controller.signal.aborted) setLoading(false); }), 200);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [resource, page, query, revision]);
  useEffect(() => {
    if (resource !== 'posts') return;
    let stopped = false;
    (async () => {
      const all = []; let page = 1, count;
      do { const result = await api(`/api/admin/categories?page=${page++}`); all.push(...result.data); count = result.total; } while (all.length < count);
      if (!stopped) setCategories(all);
    })().catch(error => { if (!stopped) setError(error.message); });
    return () => { stopped = true; };
  }, [resource, revision]);
  useEffect(() => {
    if (!editing) return;
    const handler = event => { event.preventDefault(); event.returnValue = ''; };
    window.addEventListener('beforeunload', handler); return () => window.removeEventListener('beforeunload', handler);
  }, [!!editing]);
  const update = (key, value) => setEditing(previous => ({ ...previous, [key]: value }));
  function switchResource(next) {
    if (editing && !confirm('Bỏ thay đổi chưa lưu?')) return;
    setResource(next); setEditing(null); setItems([]); setPage(1); setQuery(''); setNotice('');
  }
  function open(item) { setEditing({ ...item }); setError(''); setNotice(''); }
  function field(key, label, type = 'text', required = false, maxLength = 200) {
    return <label key={key}>{label}<input type={type} value={editing[key] || ''} required={required} maxLength={maxLength} onChange={event => update(key, event.target.value)} /></label>;
  }
  function textarea(key, label, maxLength = 1000) { return <label>{label}<textarea rows="3" maxLength={maxLength} value={editing[key] || ''} onChange={event => update(key, event.target.value)} /></label>; }
  function select(key, label, options) { return <label>{label}<select value={editing[key] || ''} onChange={event => update(key,event.target.value)}>{options.map(([value,label]) => <option key={value} value={value}>{label}</option>)}</select></label>; }
  function rememberSelection() {
    const current = window.getSelection();
    if (current?.rangeCount && editor.current?.contains(current.anchorNode)) selection.current = current.getRangeAt(0).cloneRange();
  }
  function command(name, value) {
    editor.current.focus();
    if (selection.current && editor.current.contains(selection.current.commonAncestorContainer)) { const current = window.getSelection(); current.removeAllRanges(); current.addRange(selection.current); }
    document.execCommand(name, false, value); update('content',editor.current.innerHTML); rememberSelection();
  }
  async function upload(file, insert = false) {
    if (!file) return;
    setBusy(true); setError('');
    try {
      const data = new FormData(); data.append('file',file);
      const result = await api('/api/admin/media', { method: 'POST', body: data });
      if (editing && insert) {
        command('insertImage', result.data.url);
        const alt = prompt('Mô tả nội dung ảnh (alt):', file.name) || '';
        editor.current.querySelectorAll('img').forEach(img => { if (img.getAttribute('src') === result.data.url) img.setAttribute('alt',alt); });
        update('content',editor.current.innerHTML);
      }
      else if (editing && resource === 'posts') update('coverUrl',result.data.url);
      setNotice('Đã tải ảnh lên.'); refresh(value => value + 1);
    } catch (error) { setError(error.message); } finally { setBusy(false); }
  }
  async function save(event) {
    event.preventDefault(); setBusy(true); setError('');
    try {
      const data = { ...editing, ...(editor.current ? { content: editor.current.innerHTML } : {}) };
      await api(`/api/admin/${resource}${editing.id ? '/' + editing.id : ''}`, { method: editing.id ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      setEditing(null); setNotice('Đã lưu thay đổi.'); refresh(value => value + 1);
    } catch (error) { setError(error.message); } finally { setBusy(false); }
  }
  async function remove(item) {
    if (!confirm(`Xóa “${item.title || item.name}”? Thao tác không thể hoàn tác.${resource === 'categories' ? ' Các bài viết sẽ chuyển sang không có danh mục.' : ''}`)) return;
    setBusy(true); setError('');
    try { await api(`/api/admin/${resource}/${item.id}`, { method: 'DELETE' }); setNotice('Đã xóa.'); if (items.length === 1 && page > 1) setPage(page - 1); else refresh(value => value + 1); } catch (error) { setError(error.message); } finally { setBusy(false); }
  }
  const attachEditor = useCallback(node => { if (node) node.innerHTML = editing?.content || ''; editor.current = node; selection.current = null; }, [editing?.id, resource]);
  return <div className="admin-shell"><aside className="admin-sidebar"><a href="/" className="admin-brand"><img src="/logo.svg" width="36" height="42" alt="" /> LUẬT TRẦN Á</a><span>QUẢN TRỊ WEBSITE</span><nav>{Object.entries(resources).map(([key,label]) => <button key={key} className={resource === key ? 'selected' : ''} onClick={() => switchResource(key)}>{label}</button>)}</nav><a href="/bai-viet" target="_blank" rel="noreferrer">Xem trang bài viết ↗</a><small>{email}</small><ChangePassword /><button onClick={async () => { if (editing && !confirm('Bỏ thay đổi và đăng xuất?')) return; try { await api('/api/admin/logout',{ method: 'POST' }); window.location.assign('/admin/login'); } catch (error) { setError(error.message); } }}>Đăng xuất</button></aside>
    <main className="admin-main"><header className="admin-heading"><div><span>NỘI DUNG & KHÁCH HÀNG</span><h1>{resources[resource]}</h1></div>{!editing && resource !== 'media' && <button onClick={() => open(empty[resource])}>+ Thêm mới</button>}</header>
    {error && <p className="admin-error" role="alert">{error}</p>}{notice && <p className="admin-notice" role="status">{notice}</p>}
    {editing ? <form className="admin-panel" onSubmit={save}><div className="admin-form-grid">
      {['posts','documents'].includes(resource) && field('title','Tiêu đề','text',true)}
      {['categories','consultations','media'].includes(resource) && field('name','Tên','text',true)}
      {['posts','categories'].includes(resource) && <div>{field('slug','Đường dẫn (slug)','text',true,220)}<button type="button" className="secondary" onClick={() => update('slug',slugify(editing.title || editing.name))}>Tạo từ tiêu đề</button></div>}
      {resource === 'posts' && <>{select('status','Trạng thái',[['DRAFT','Bản nháp'],['PUBLISHED','Xuất bản']])}{select('categoryId','Danh mục',[['','Không có danh mục'],...categories.map(item => [item.id,item.name])])}{textarea('excerpt','Tóm tắt',600)}{field('coverUrl','URL ảnh đại diện','text',false,2000)}{field('coverAlt','Mô tả ảnh (alt)','text',false,250)}<label>Tải ảnh đại diện (PNG/JPEG/WebP, tối đa 2 MB)<input type="file" accept="image/png,image/jpeg,image/webp" disabled={busy} onChange={event => upload(event.target.files[0])} /></label>{editing.coverUrl && <img className="admin-cover" src={editing.coverUrl} alt={editing.coverAlt || 'Ảnh đại diện'} />}</>}
      {resource === 'documents' && <>{select('category','Loại tài liệu',[['bieumau','Biểu mẫu'],['anle','Án lệ'],['hopdong','Hợp đồng'],['congvan','Văn bản hướng dẫn']])}{textarea('description','Mô tả')}{field('keywords','Từ khóa','text',false,1000)}{field('downloadUrl','URL file tải về (tùy chọn)','text',false,2000)}</>}
      {resource === 'consultations' && <>{field('phone','Số điện thoại','tel',true,30)}{field('service','Dịch vụ')}{select('status','Trạng thái',['PENDING','CONTACTED','COMPLETED','CANCELLED'].map(key => [key,statuses[key]]))}{textarea('message','Nội dung / ghi chú',5000)}</>}
    </div>
    {['posts','documents'].includes(resource) && <div className="admin-editor-wrap"><label id="editor-label">Nội dung</label><div className="editor-toolbar">{[['bold','Đậm'],['italic','Nghiêng'],['formatBlock','H2','h2'],['formatBlock','H3','h3'],['formatBlock','Đoạn văn','p'],['insertUnorderedList','Danh sách'],['formatBlock','Trích dẫn','blockquote'],['undo','Hoàn tác']].map(([cmd,label,value]) => <button key={label} type="button" className="secondary" onMouseDown={event => event.preventDefault()} onClick={() => command(cmd,value)}>{label}</button>)}<button type="button" className="secondary" onMouseDown={event => event.preventDefault()} onClick={() => { const url = prompt('URL liên kết (https://...)'); if (url && /^https?:\/\//i.test(url)) command('createLink',url); }}>Liên kết</button><label className="editor-upload">Chèn ảnh<input type="file" accept="image/png,image/jpeg,image/webp" disabled={busy} onChange={event => upload(event.target.files[0],true)} /></label></div><div key={editing.id || resource} ref={attachEditor} contentEditable role="textbox" aria-multiline="true" aria-labelledby="editor-label" suppressContentEditableWarning className="rich-editor" onKeyUp={rememberSelection} onMouseUp={rememberSelection} onInput={event => { update('content',event.currentTarget.innerHTML); rememberSelection(); }} onPaste={event => { event.preventDefault(); document.execCommand('insertText',false,event.clipboardData.getData('text/plain')); }} onDrop={event => event.preventDefault()} /></div>}
    {resource === 'posts' && <section className="seo-panel"><h2>Thiết lập SEO</h2>{field('seoTitle',`Tiêu đề SEO (${(editing.seoTitle || editing.title).length} ký tự; gợi ý 50–60)`)}{textarea('seoDescription',`Mô tả SEO (${editing.seoDescription.length} ký tự; gợi ý 140–160)`,500)}<div className="seo-preview"><small>/bai-viet/{editing.slug}</small><h3>{editing.seoTitle || editing.title || 'Tiêu đề bài viết'}</h3><p>{editing.seoDescription || editing.excerpt || 'Mô tả bài viết trên kết quả tìm kiếm.'}</p></div><p>{editing.coverAlt ? '✓ Có mô tả ảnh' : '• Nên thêm mô tả ảnh đại diện'} · {/<h2[ >]/i.test(editing.content) ? '✓ Có tiêu đề H2' : '• Nên chia nội dung bằng H2'}</p></section>}
    <div className="admin-actions"><button disabled={busy}>{busy ? 'Đang lưu…' : 'Lưu thay đổi'}</button><button type="button" className="secondary" disabled={busy} onClick={() => { if (confirm('Bỏ thay đổi chưa lưu?')) setEditing(null); }}>Hủy</button>{resource === 'posts' && editing.id && <a target="_blank" rel="noreferrer" href={`/bai-viet/${editing.slug}?preview=1`}>Xem bản đã lưu ↗</a>}</div></form> : <><div className="admin-tools"><input aria-label="Tìm kiếm" placeholder="Tìm theo tên hoặc tiêu đề…" value={query} onChange={event => { setQuery(event.target.value); setPage(1); }} /><span>{total} mục</span>{resource === 'media' && <label>Tải ảnh lên<input type="file" disabled={busy} accept="image/png,image/jpeg,image/webp" onChange={event => upload(event.target.files[0])} /></label>}</div><div className="admin-list">{loading ? <p>Đang tải…</p> : items.length === 0 ? <p>Chưa có dữ liệu phù hợp.</p> : items.map(item => <article className="admin-row" key={item.id}>{resource === 'media' && <img src={`/media/${item.id}`} alt={item.name} width="90" height="65" />}<div><h3>{item.title || item.name}</h3><p>{statuses[item.status] || item.category || item.slug || item.mimeType} {item.phone && ` · ${item.phone}`}</p>{item.createdAt && <small>{new Date(item.createdAt).toLocaleDateString('vi-VN')}</small>}</div><div className="admin-row-actions">{resource === 'media' && <button className="secondary" onClick={async () => { try { await navigator.clipboard.writeText(`/media/${item.id}`); setNotice('Đã sao chép URL ảnh.'); } catch { setNotice(`/media/${item.id}`); } }}>Sao chép URL</button>}<button className="secondary" onClick={() => open(item)}>Sửa</button><button className="danger" disabled={busy} onClick={() => remove(item)}>Xóa</button></div></article>)}</div><div className="admin-pagination"><button className="secondary" disabled={page === 1 || loading} onClick={() => setPage(page - 1)}>← Trước</button><span>Trang {page} / {Math.max(1,Math.ceil(total / 20))}</span><button className="secondary" disabled={page * 20 >= total || loading} onClick={() => setPage(page + 1)}>Tiếp →</button></div></>}
    </main></div>;
}
