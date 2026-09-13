import { authorize, apiError } from '@/lib/admin';
import { models, mediaSelect } from '@/lib/resources';
import { payload, text } from '@/lib/content.mjs';
import { prisma } from '@/lib/prisma';
export async function PUT(request, { params }) {
  try {
    params = await params;
    const denied = await authorize(request, params.resource); if (denied) return denied;
    const model = models[params.resource]; if (!model) return Response.json({ error: 'Không tìm thấy.' }, { status: 404 });
    let data;
    try { const body = await request.json(); data = params.resource === 'media' ? { name: text(body.name, 200, true) } : payload(params.resource, body); } catch (error) { return Response.json({ error: error.message }, { status: 400 }); }
    if (params.resource === 'posts') {
      const current = await model.findUnique({ where: { id: params.id } });
      data.publishedAt = data.status === 'PUBLISHED' ? current?.publishedAt || new Date() : null;
    }
    return Response.json({ data: await model.update({ where: { id: params.id }, data, ...(params.resource === 'media' ? { select: mediaSelect } : {}) }) });
  } catch (error) { return apiError(error); }
}
export async function DELETE(request, { params }) {
  try {
    params = await params;
    const denied = await authorize(request, params.resource); if (denied) return denied;
    const model = models[params.resource]; if (!model) return Response.json({ error: 'Không tìm thấy.' }, { status: 404 });
    if (params.resource === 'media') {
      const url = `/media/${params.id}`;
      const count = await prisma.post.count({ where: { OR: [{ coverUrl: url }, { content: { contains: url } }] } }) + await prisma.legalDocument.count({ where: { OR: [{ content: { contains: url } }, { downloadUrl: url }] } });
      if (count) return Response.json({ error: 'Ảnh đang được sử dụng. Hãy gỡ ảnh khỏi nội dung trước.' }, { status: 409 });
    }
    await model.delete({ where: { id: params.id } });
    return Response.json({ success: true });
  } catch (error) { return apiError(error); }
}
