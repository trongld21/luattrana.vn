import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { sameOrigin, sessionCookie } from '@/lib/admin';
import { tokenHash } from '@/lib/password.mjs';
export async function POST(request) {
  if (!sameOrigin(request)) return Response.json({ error: 'Nguồn yêu cầu không hợp lệ.' }, { status: 403 });
  const token = (await cookies()).get(sessionCookie)?.value;
  if (token) await prisma.adminSession.deleteMany({ where: { id: tokenHash(token) } });
  (await cookies()).delete(sessionCookie);
  return Response.json({ success: true });
}
