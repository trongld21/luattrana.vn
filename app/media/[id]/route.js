import { prisma } from '@/lib/prisma';
export async function GET(request, { params }) {
  try {
    params = await params;
    const item = await prisma.media.findUnique({ where: { id: params.id } });
    if (!item) return new Response('Not found', { status: 404 });
    return new Response(item.data, { headers: { 'Content-Type': item.mimeType, 'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'public, max-age=3600', 'Content-Security-Policy': "default-src 'none'; sandbox" } });
  } catch { return new Response('Unavailable', { status: 503 }); }
}
