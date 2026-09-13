import { prisma } from '@/lib/prisma';
export const dynamic = 'force-dynamic';
export async function GET(request) {
  const limit = Math.max(1, Math.min(12, Number(new URL(request.url).searchParams.get('limit')) || 3));
  try {
    const data = await prisma.post.findMany({ where: { status: 'PUBLISHED', publishedAt: { lte: new Date() } }, orderBy: { publishedAt: 'desc' }, select: { id: true, title: true, slug: true, excerpt: true, coverUrl: true, coverAlt: true, publishedAt: true, category: { select: { name: true, slug: true } } }, take: limit });
    return Response.json({ data }, { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' } });
  } catch { return Response.json({ data: [] }, { status: 503 }); }
}
