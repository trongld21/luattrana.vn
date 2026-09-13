'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import { allowedScreens, canAccess, screenLabels } from '@/lib/permissions.mjs';
import ChangePassword from './ChangePassword';
import { slugify } from '@/lib/content-client';
const resources = { posts: 'Bài viết SEO', categories: 'Danh mục', documents: 'Tài liệu pháp lý', consultations: 'Yêu cầu tư vấn', media: 'Thư viện ảnh', staff: 'Nhân sự & phân quyền' };
const descriptions = { posts: 'Biên tập, xuất bản và tối ưu nội dung tìm kiếm.', categories: 'Sắp xếp bài viết theo chủ đề để độc giả dễ khám phá.', documents: 'Quản lý biểu mẫu, hợp đồng và tài liệu pháp lý.', consultations: 'Theo dõi yêu cầu và chăm sóc khách hàng.', media: 'Lưu trữ và quản lý hình ảnh sử dụng trên website.', staff: 'Tạo tài khoản nhân viên và chọn màn hình được phép sử dụng.' };
const icons = { posts: '✎', categories: '▦', documents: '▤', consultations: '◉', media: '▧', staff: '♙' };
const statuses = { DRAFT: 'Bản nháp', PUBLISHED: 'Đã xuất bản', PENDING: 'Chờ xử lý', CONTACTED: 'Đã liên hệ', COMPLETED: 'Hoàn tất', CANCELLED: 'Đã hủy' };
const empty = {
  staff: { name: '', email: '', password: '', isActive: true, permissions: [], role: 'STAFF' },
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
export default function AdminDashboard({ user: initialUser }) {
  const [user, setUser] = useState(initialUser);
  const email = user.email;
  const screens = allowedScreens(user);
  const canUpload = canAccess(user, 'media');
  const [resource, setResource] = useState(() => allowedScreens(initialUser)[0] || null), [items, setItems] = useState([]), [total, setTotal] = useState(0), [page, setPage] = useState(1), [query, setQuery] = useState('');
  const [editing, setEditing] = useState(null), [categories, setCategories] = useState([]), [busy, setBusy] = useState(false), [loading, setLoading] = useState(false), [error, setError] = useState(''), [notice, setNotice] = useState(''), [revision, refresh] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(null);
  const editor = useRef(null), selection = useRef(null);
  useEffect(() => {
    if (!resource || !canAccess(user,resource)) return;
    const controller = new AbortController(); setLoading(true); setError('');
    const timer = setTimeout(() => api(`/api/admin/${resource}?page=${page}&q=${encodeURIComponent(query)}`, { signal: controller.signal, cache: 'no-store' }).then(data => { if (controller.signal.aborted) return; setItems(data.data); setTotal(data.total); setLastUpdated(new Date()); }).catch(error => { if (error.name !== 'AbortError') setError(error.message); }).finally(() => { if (!controller.signal.aborted) setLoading(false); }), 200);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [resource, page, query, revision, user]);
  useEffect(() => {
    if (resource !== 'posts' || !canAccess(user, 'posts')) return;
    let stopped = false;
    (async () => {
      const all = []; let page = 1, count;
      do { const result = await api(`/api/admin/post-categories?page=${page++}`); all.push(...result.data); count = result.total; } while (all.length < count);
      if (!stopped) setCategories(all);
    })().catch(error => { if (!stopped) setError(error.message); });
    return () => { stopped = true; };
  }, [resource, revision]);
  useEffect(() => {
    if (!editing) return;
    const handler = event => { event.preventDefault(); event.returnValue = ''; };
    window.addEventListener('beforeunload', handler); return () => window.removeEventListener('beforeunload', handler);
  }, [!!editing]);
  useEffect(() => {
    const controller = new AbortController();
    const sync = async () => {
      try {
        const result = await api('/api/admin/me', { cache: 'no-store', signal: controller.signal });
        if (!controller.signal.aborted && JSON.stringify(result.user) !== JSON.stringify(user)) {
          setUser(result.user);
          if (!canAccess(result.user, resource)) { setEditing(null); setItems([]); setResource(allowedScreens(result.user)[0] || null); }
        }
      } catch (error) { if (error.name !== 'AbortError') setError(error.message); }
    };
    const timer = setInterval(sync, 60000);
    window.addEventListener('focus', sync);
    return () => { controller.abort(); clearInterval(timer); window.removeEventListener('focus',sync); };
  }, [user, resource]);
  const update = (key, value) => setEditing(previous => ({ ...previous, [key]: value }));
  function switchResource(next) {
    if (!canAccess(user,next)) return;
    if (editing && !confirm('Bỏ thay đổi chưa lưu?')) return;
    if (busy || next === resource) return;
    setLastUpdated(null); setTotal(0); setResource(next); setEditing(null); setItems([]); setPage(1); setQuery(''); setNotice('');
  }
  function reload() { if (loading || busy) return; setLoading(true); setError(''); refresh(value => value + 1); }
  function open(item) { if (!canAccess(user,resource) || (resource === 'staff' && item.role === 'ADMIN')) return; setEditing({ ...item }); setError(''); setNotice(''); }
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
    if (!file || !canUpload) return;
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
    if (resource === 'staff' && item.role !== 'STAFF') return;
    if (!confirm(`Xóa “${item.title || item.name}”? Thao tác không thể hoàn tác.${resource === 'categories' ? ' Các bài viết sẽ chuyển sang không có danh mục.' : ''}`)) return;
    setBusy(true); setError('');
    try { await api(`/api/admin/${resource}/${item.id}`, { method: 'DELETE' }); setNotice('Đã xóa.'); if (items.length === 1 && page > 1) setPage(page - 1); else refresh(value => value + 1); } catch (error) { setError(error.message); } finally { setBusy(false); }
  }
  const attachEditor = useCallback(node => { if (node) node.innerHTML = editing?.content || ''; editor.current = node; selection.current = null; }, [editing?.id, resource]);
  return <div className="admin-shell"><aside className="admin-sidebar"><a href="/" className="admin-brand"><img src="/logo.svg" width="36" height="42" alt="" /> LUẬT TRẦN Á</a><span>QUẢN TRỊ WEBSITE</span><nav>{Object.entries(resources).filter(([key]) => screens.includes(key)).map(([key,label]) => <button key={key} className={resource === key ? 'selected' : ''} aria-current={resource === key ? 'page' : undefined} disabled={busy} onClick={() => switchResource(key)}><span aria-hidden="true">{icons[key]}</span>{label}</button>)}</nav><a href="/bai-viet" target="_blank" rel="noreferrer">Xem trang bài viết ↗</a><div className="admin-account"><span className="admin-avatar" aria-hidden="true">A</span><div><strong>{user.role === 'ADMIN' ? 'Quản trị viên' : user.name || 'Nhân viên'}</strong><small>{email}</small></div></div><ChangePassword /><button onClick={async () => { if (editing && !confirm('Bỏ thay đổi và đăng xuất?')) return; try { await api('/api/admin/logout',{ method: 'POST' }); window.location.assign('/admin/login'); } catch (error) { setError(error.message); } }}>Đăng xuất</button></aside>
    <main className="admin-main"><header className="admin-heading"><div><span>NỘI DUNG & KHÁCH HÀNG</span><h1>{editing ? (editing.id ? 'Chỉnh sửa nội dung' : 'Tạo nội dung mới') : resources[resource] || 'Tài khoản nhân viên'}</h1><p className="admin-description">{descriptions[resource]}</p></div><div className="admin-heading-actions">{resource && !editing && <button className="secondary admin-reload" disabled={loading || busy} onClick={reload}><span aria-hidden="true" className={loading ? 'reload-spinning' : ''}>↻</span>{loading ? 'Đang tải…' : 'Tải lại dữ liệu'}</button>}{resource && !editing && resource !== 'media' && <button disabled={busy} onClick={() => open(empty[resource])}>+ Thêm mới</button>}</div></header>
    {error && <div className="admin-error" role="alert"><span>{error}</span>{!editing && <button className="secondary" onClick={reload} disabled={loading || busy}>Thử lại</button>}</div>}{notice && <div className="admin-notice" role="status"><span>✓ {notice}</span><button type="button" aria-label="Đóng thông báo" onClick={() => setNotice('')}>×</button></div>}
    {!resource ? <div className="admin-panel admin-empty"><h2>Chưa được cấp quyền truy cập</h2><p>Liên hệ quản trị viên để được phân công màn hình làm việc.</p></div> : editing ? <form className="admin-panel" onSubmit={save}><div className="admin-form-heading"><h2>Thông tin {resources[resource].toLowerCase()}</h2><span>Kiểm tra nội dung trước khi lưu</span></div><div className="admin-form-grid">
      {['posts','documents'].includes(resource) && field('title','Tiêu đề','text',true)}
      {['categories','consultations','media','staff'].includes(resource) && field('name','Tên','text',true)}
      {['posts','categories'].includes(resource) && <div>{field('slug','Đường dẫn (slug)','text',true,220)}<button type="button" className="secondary" onClick={() => update('slug',slugify(editing.title || editing.name))}>Tạo từ tiêu đề</button></div>}
      {resource === 'staff' && <>{field('email','Email đăng nhập','email',true,254)}<label>{editing.id ? 'Mật khẩu mới (để trống nếu giữ nguyên)' : 'Mật khẩu đăng nhập'}<input type="password" autoComplete="new-password" value={editing.password || ''} required={!editing.id} minLength={12} maxLength={256} onChange={event => update('password',event.target.value)} /><small>Từ 12 đến 256 ký tự. Nhân viên có thể đổi mật khẩu sau khi đăng nhập.</small></label><label>Trạng thái tài khoản<select value={editing.isActive ? 'active' : 'inactive'} onChange={event => update('isActive',event.target.value === 'active')}><option value="active">Đang hoạt động</option><option value="inactive">Đã khóa</option></select></label><fieldset className="staff-permissions"><legend>Màn hình được phép truy cập</legend><p>Nhân viên chỉ nhìn thấy và sử dụng các màn bạn chọn, bao gồm thêm, sửa và xóa dữ liệu trong màn đó.</p><div>{Object.entries(screenLabels).map(([key,label]) => <label key={key} className="permission-choice"><input type="checkbox" checked={editing.permissions.includes(key)} onChange={event => update('permissions',event.target.checked ? [...editing.permissions,key] : editing.permissions.filter(value => value !== key))} /><span><strong>{label}</strong><small>{descriptions[key]}</small></span></label>)}</div><small>Chỉ chọn Bài viết SEO: nhân viên không được quản lý danh mục, tài liệu, tư vấn hay nhân sự. Cấp thêm Thư viện ảnh nếu cần upload ảnh.</small><p className="permission-summary">{editing.permissions.length} màn được cấp quyền{!editing.permissions.length && ' · Tài khoản sẽ không truy cập được màn quản lý nào.'}</p>{editing.id && <p>Khi lưu thay đổi, nhân viên cần đăng nhập lại.</p>}</fieldset></>}
      {resource === 'posts' && <>{select('status','Trạng thái',[['DRAFT','Bản nháp'],['PUBLISHED','Xuất bản']])}{select('categoryId','Danh mục',[['','Không có danh mục'],...categories.map(item => [item.id,item.name])])}{textarea('excerpt','Tóm tắt',600)}{field('coverUrl','URL ảnh đại diện','text',false,2000)}{field('coverAlt','Mô tả ảnh (alt)','text',false,250)}{canUpload && <label>Tải ảnh đại diện (PNG/JPEG/WebP, tối đa 2 MB)<input type="file" accept="image/png,image/jpeg,image/webp" disabled={busy} onChange={event => upload(event.target.files[0])} /></label>}{editing.coverUrl && <img className="admin-cover" src={editing.coverUrl} alt={editing.coverAlt || 'Ảnh đại diện'} />}</>}
      {resource === 'documents' && <>{select('category','Loại tài liệu',[['bieumau','Biểu mẫu'],['anle','Án lệ'],['hopdong','Hợp đồng'],['congvan','Văn bản hướng dẫn']])}{textarea('description','Mô tả')}{field('keywords','Từ khóa','text',false,1000)}{field('downloadUrl','URL file tải về (tùy chọn)','text',false,2000)}</>}
      {resource === 'consultations' && <>{field('phone','Số điện thoại','tel',true,30)}{field('service','Dịch vụ')}{select('status','Trạng thái',['PENDING','CONTACTED','COMPLETED','CANCELLED'].map(key => [key,statuses[key]]))}{textarea('message','Nội dung / ghi chú',5000)}</>}
    </div>
    {['posts','documents'].includes(resource) && <div className="admin-editor-wrap"><label id="editor-label">Nội dung</label><div className="editor-toolbar">{[['bold','Đậm'],['italic','Nghiêng'],['formatBlock','H2','h2'],['formatBlock','H3','h3'],['formatBlock','Đoạn văn','p'],['insertUnorderedList','Danh sách'],['formatBlock','Trích dẫn','blockquote'],['undo','Hoàn tác']].map(([cmd,label,value]) => <button key={label} type="button" className="secondary" onMouseDown={event => event.preventDefault()} onClick={() => command(cmd,value)}>{label}</button>)}<button type="button" className="secondary" onMouseDown={event => event.preventDefault()} onClick={() => { const url = prompt('URL liên kết (https://...)'); if (url && /^https?:\/\//i.test(url)) command('createLink',url); }}>Liên kết</button>{canUpload && <label className="editor-upload">Chèn ảnh<input type="file" accept="image/png,image/jpeg,image/webp" disabled={busy} onChange={event => upload(event.target.files[0],true)} /></label>}</div><div key={editing.id || resource} ref={attachEditor} contentEditable role="textbox" aria-multiline="true" aria-labelledby="editor-label" suppressContentEditableWarning className="rich-editor" onKeyUp={rememberSelection} onMouseUp={rememberSelection} onInput={event => { update('content',event.currentTarget.innerHTML); rememberSelection(); }} onPaste={event => { event.preventDefault(); document.execCommand('insertText',false,event.clipboardData.getData('text/plain')); }} onDrop={event => event.preventDefault()} /></div>}
    {resource === 'posts' && <section className="seo-panel"><h2>Thiết lập SEO</h2>{field('seoTitle',`Tiêu đề SEO (${(editing.seoTitle || editing.title).length} ký tự; gợi ý 50–60)`)}{textarea('seoDescription',`Mô tả SEO (${editing.seoDescription.length} ký tự; gợi ý 140–160)`,500)}<div className="seo-preview"><small>/bai-viet/{editing.slug}</small><h3>{editing.seoTitle || editing.title || 'Tiêu đề bài viết'}</h3><p>{editing.seoDescription || editing.excerpt || 'Mô tả bài viết trên kết quả tìm kiếm.'}</p></div><p>{editing.coverAlt ? '✓ Có mô tả ảnh' : '• Nên thêm mô tả ảnh đại diện'} · {/<h2[ >]/i.test(editing.content) ? '✓ Có tiêu đề H2' : '• Nên chia nội dung bằng H2'}</p></section>}
    <div className="admin-actions"><button disabled={busy}>{busy ? 'Đang lưu…' : 'Lưu thay đổi'}</button><button type="button" className="secondary" disabled={busy} onClick={() => { if (confirm('Bỏ thay đổi chưa lưu?')) setEditing(null); }}>Hủy</button>{resource === 'posts' && editing.id && <a target="_blank" rel="noreferrer" href={`/bai-viet/${editing.slug}?preview=1`}>Xem bản đã lưu ↗</a>}</div></form> : <><div className="admin-tools"><input aria-label="Tìm kiếm" placeholder={resource === 'staff' ? 'Tìm theo tên hoặc email…' : 'Tìm theo tên hoặc tiêu đề…'} value={query} onChange={event => { setQuery(event.target.value); setPage(1); }} /><span className="admin-count">{total} mục</span>{query && <button className="secondary" onClick={() => { setQuery(''); setPage(1); }}>Xóa tìm kiếm</button>}{resource === 'media' && <label>Tải ảnh lên<input type="file" disabled={busy} accept="image/png,image/jpeg,image/webp" onChange={event => upload(event.target.files[0])} /></label>}</div><div className="admin-list-meta"><span>Danh sách {resources[resource].toLowerCase()}</span><span role="status">{loading ? 'Đang cập nhật dữ liệu…' : lastUpdated ? `Cập nhật lúc ${lastUpdated.toLocaleTimeString('vi-VN')}` : 'Chưa tải dữ liệu'}</span></div><div className={`admin-list ${resource === 'media' ? 'admin-media-grid' : ''}`} aria-busy={loading}>{loading ? <div className="admin-loading" role="status"><span className="admin-spinner" />Đang tải dữ liệu mới nhất…</div> : error ? <div className="admin-empty"><span aria-hidden="true">!</span><h2>Chưa thể tải dữ liệu</h2><p>Hãy kiểm tra kết nối rồi thử tải lại.</p></div> : items.length === 0 ? <div className="admin-empty"><span aria-hidden="true">{icons[resource]}</span><h2>{query ? 'Không tìm thấy kết quả' : 'Chưa có nội dung'}</h2><p>{query ? 'Thử từ khóa khác hoặc xóa tìm kiếm để xem tất cả.' : 'Thêm nội dung đầu tiên để bắt đầu quản lý.'}</p>{query ? <button className="secondary" onClick={() => { setQuery(''); setPage(1); }}>Xóa tìm kiếm</button> : resource !== 'media' && <button onClick={() => open(empty[resource])}>+ Thêm mới</button>}</div> : items.map(item => <article className="admin-row" key={item.id}>{resource === 'media' && <img src={`/media/${item.id}`} alt={item.name} width="90" height="65" />}<div><h3>{item.title || item.name || item.email}</h3>{resource === 'staff' && <div className="staff-row-detail"><span>{item.email}</span><span className={`admin-status ${item.isActive ? 'status-completed' : 'status-cancelled'}`}>{item.isActive ? 'Hoạt động' : 'Đã khóa'}</span><p>{item.role === 'ADMIN' ? 'Quản trị viên · Toàn bộ chức năng' : item.permissions.map(key => screenLabels[key]).join(' · ') || 'Chưa cấp quyền'}</p></div>}<p>{item.status ? <span className={`admin-status status-${item.status.toLowerCase()}`}>{statuses[item.status]}</span> : <span>{item.category || item.slug || item.mimeType}</span>} {item.phone && <a href={`tel:${item.phone}`}>{item.phone}</a>}</p>{item.createdAt && <small>{new Date(item.createdAt).toLocaleDateString('vi-VN')}</small>}</div><div className="admin-row-actions">{resource === 'media' && <button className="secondary" onClick={async () => { try { await navigator.clipboard.writeText(`/media/${item.id}`); setNotice('Đã sao chép URL ảnh.'); } catch { setNotice(`/media/${item.id}`); } }}>Sao chép URL</button>}{!(resource === 'staff' && item.role === 'ADMIN') && <><button className="secondary" disabled={busy} aria-label={`Chỉnh sửa ${item.title || item.name}`} onClick={() => open(item)}>Chỉnh sửa</button><button className="danger" disabled={busy} onClick={() => remove(item)}>Xóa</button></>}{resource === 'staff' && item.role === 'ADMIN' && <span className="staff-protected">Tài khoản được bảo vệ</span>}</div></article>)}</div><div className="admin-pagination"><button className="secondary" disabled={page === 1 || loading} onClick={() => setPage(page - 1)}>← Trước</button><span>Trang {page} / {Math.max(1,Math.ceil(total / 20))}</span><button className="secondary" disabled={page * 20 >= total || loading} onClick={() => setPage(page + 1)}>Tiếp →</button></div></>}
    </main></div>;
}
