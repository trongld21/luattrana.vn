import { NextResponse } from 'next/server';
import { prisma, mockLegalDocs } from '@/lib/prisma';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'all';
  const query = (searchParams.get('q') || '').toLowerCase().trim();

  try {
    let docs = [];
    try {
      // Query PostgreSQL via Prisma
      const whereClause = {};
      if (category !== 'all') {
        whereClause.category = category;
      }
      if (query) {
        whereClause.OR = [
          { title: { contains: query, mode: 'insensitive' } },
          { keywords: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ];
      }

      docs = await prisma.legalDocument.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
      });

      // If DB is empty, use default legal seed dataset
      if (docs.length === 0 && !query && category === 'all') {
        docs = mockLegalDocs;
      }
    } catch (dbErr) {
      console.warn('PostgreSQL fallback to memory legal docs dataset');
      docs = mockLegalDocs.filter((item) => {
        const matchCat = category === 'all' || item.category === category;
        const matchQuery =
          !query ||
          item.title.toLowerCase().includes(query) ||
          item.keywords.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query);
        return matchCat && matchQuery;
      });
    }

    return NextResponse.json({ success: true, count: docs.length, data: docs });
  } catch (error) {
    return NextResponse.json({ success: false, data: mockLegalDocs });
  }
}
