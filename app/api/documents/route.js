import { prisma } from '@/lib/prisma';
import { cleanHtml } from '@/lib/content.mjs';
export const dynamic = 'force-dynamic';
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'all';
  const query = (searchParams.get('q') || '').trim().slice(0,200);
  try {
    const where = category !== 'all' ? { category } : {};
    if (query) where.OR = ['title','keywords','description'].map(field => ({ [field]: { contains: query, mode: 'insensitive' } }));
    const docs = await prisma.legalDocument.findMany({ where, orderBy: { createdAt: 'desc' }, take: 100 });
    return Response.json({ success: true, data: docs.map(doc => ({ ...doc, content: cleanHtml(doc.content) })) });
  } catch { return Response.json({ success: false, error: 'Chưa tải được tài liệu. Vui lòng thử lại.', data: [] }, { status: 503 }); }
}
