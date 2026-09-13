import { authorize, apiError } from '@/lib/admin';
import { models, mediaSelect } from '@/lib/resources';
import { payload, cleanHtml } from '@/lib/content.mjs';
export const dynamic = 'force-dynamic';
export async function GET(request, { params }) {
  try {
    params = await params;
    const denied = await authorize(request, params.resource); if (denied) return denied;
    const model = models[params.resource]; if (!model) return Response.json({ error: 'Không tìm thấy.' }, { status: 404 });
    const url = new URL(request.url), q = (url.searchParams.get('q') || '').slice(0, 200);
    const page = Math.max(1, Math.min(100000, Number(url.searchParams.get('page')) || 1));
    const field = ['categories','media','consultations'].includes(params.resource) ? 'name' : 'title';
    const where = q ? { [field]: { contains: q, mode: 'insensitive' } } : {};
    const [data, total] = await Promise.all([model.findMany({ where, orderBy: params.resource === 'categories' ? { name: 'asc' } : { createdAt: 'desc' }, take: 20, skip: (page - 1) * 20, ...(params.resource === 'media' ? { select: mediaSelect } : {}) }), model.count({ where })]);
    if (['posts','documents'].includes(params.resource)) data.forEach(item => { item.content = cleanHtml(item.content); });
    return Response.json({ data, total, page }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) { return apiError(error); }
}
export async function POST(request, { params }) {
  try {
    params = await params;
    const denied = await authorize(request, params.resource); if (denied) return denied;
    const model = models[params.resource]; if (!model) return Response.json({ error: 'Không tìm thấy.' }, { status: 404 });
    if (params.resource === 'media') {
      if (Number(request.headers.get('content-length')) > 3 * 1024 * 1024) return Response.json({ error: 'Ảnh tối đa 2 MB.' }, { status: 413 });
      const form = await request.formData(), file = form.get('file');
      if (!file || typeof file.arrayBuffer !== 'function' || file.size > 2 * 1024 * 1024) return Response.json({ error: 'Chọn ảnh PNG, JPEG hoặc WebP tối đa 2 MB.' }, { status: 400 });
      const data = Buffer.from(await file.arrayBuffer());
      let mimeType;
      if (data.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) mimeType = 'image/png';
      else if (data[0] === 255 && data[1] === 216 && data[2] === 255) mimeType = 'image/jpeg';
      else if (data.toString('ascii',0,4) === 'RIFF' && data.toString('ascii',8,12) === 'WEBP') mimeType = 'image/webp';
      if (!mimeType) return Response.json({ error: 'Định dạng ảnh không được hỗ trợ.' }, { status: 400 });
      const item = await model.create({ data: { name: String(file.name).slice(0,200), mimeType, data }, select: mediaSelect });
      return Response.json({ data: { ...item, url: `/media/${item.id}` } }, { status: 201 });
    }
    let data;
    try { data = payload(params.resource, await request.json()); } catch (error) { return Response.json({ error: error.message }, { status: 400 }); }
    if (params.resource === 'posts') data.publishedAt = data.status === 'PUBLISHED' ? new Date() : null;
    return Response.json({ data: await model.create({ data }) }, { status: 201 });
  } catch (error) { return apiError(error); }
}
