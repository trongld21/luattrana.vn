import sanitizeHtml from 'sanitize-html';
export function cleanHtml(value) {
  return sanitizeHtml(String(value || ''), {
    allowedTags: ['p','br','h2','h3','h4','strong','b','em','i','u','ul','ol','li','blockquote','a','img','table','thead','tbody','tr','th','td','hr'],
    allowedAttributes: { a: ['href','title'], img: ['src','alt','width','height'], th: ['colspan'], td: ['colspan'] },
    allowedSchemes: ['https','http','mailto','tel'],
    allowedSchemesByTag: { img: ['https','http'] },
    allowProtocolRelative: false,
  });
}
export function slugify(value) {
  return String(value).toLowerCase().replace(/đ/g, 'd').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
export function safeUrl(value) {
  if (!value) return '';
  if (/^\/(?!\/)[a-zA-Z0-9/_\.\-]+$/.test(value)) return value;
  try { const url = new URL(value); if (['https:', 'http:'].includes(url.protocol)) return url.href; } catch {}
  throw new Error('Đường dẫn phải là HTTP(S) hoặc đường dẫn nội bộ.');
}
export function text(value, max = 200, required = false) {
  if (typeof value !== 'string' || value.length > max || (required && !value.trim())) throw new Error(`Nội dung không hợp lệ (tối đa ${max} ký tự).`);
  return value.trim();
}
export function payload(resource, body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('Dữ liệu không hợp lệ.');
  if (resource === 'categories') {
    const name = text(body.name, 100, true), slug = slugify(text(body.slug || name, 180));
    if (!slug) throw new Error('Đường dẫn không hợp lệ.');
    return { name, slug };
  }
  if (resource === 'posts') {
    const title = text(body.title, 200, true), slug = slugify(text(body.slug || title, 220));
    const status = body.status;
    if (!slug || !['DRAFT', 'PUBLISHED'].includes(status)) throw new Error('Đường dẫn hoặc trạng thái không hợp lệ.');
    const content = cleanHtml(text(body.content, 200000, true));
    if (!content.trim()) throw new Error('Bài viết cần có nội dung.');
    return { title, slug, content, status, excerpt: text(body.excerpt || '', 600), coverUrl: safeUrl(text(body.coverUrl || '', 2000)), coverAlt: text(body.coverAlt || '', 250), seoTitle: text(body.seoTitle || '', 200), seoDescription: text(body.seoDescription || '', 500), categoryId: body.categoryId ? text(body.categoryId, 100) : null };
  }
  if (resource === 'documents') {
    if (!['bieumau','anle','hopdong','congvan'].includes(body.category)) throw new Error('Danh mục không hợp lệ.');
    return { title: text(body.title, 200, true), category: body.category, description: text(body.description || '', 1000), content: cleanHtml(text(body.content, 200000, true)), keywords: text(body.keywords || '', 1000), downloadUrl: safeUrl(text(body.downloadUrl || '', 2000)) || null };
  }
  if (resource === 'consultations') {
    if (!['PENDING','CONTACTED','COMPLETED','CANCELLED'].includes(body.status)) throw new Error('Trạng thái không hợp lệ.');
    return { name: text(body.name, 150, true), phone: text(body.phone, 30, true), service: text(body.service || '', 200), message: text(body.message || '', 5000), status: body.status };
  }
  throw new Error('Không hỗ trợ dữ liệu này.');
}
