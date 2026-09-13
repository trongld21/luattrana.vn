import { randomBytes } from 'node:crypto';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { sameOrigin, sessionCookie, apiError } from '@/lib/admin';
import { verifyPassword, hashPassword, tokenHash } from '@/lib/password.mjs';
const dummyHash = hashPassword(randomBytes(32).toString('hex'));
export async function POST(request) {
  if (!sameOrigin(request)) return Response.json({ error: 'Nguồn yêu cầu không hợp lệ.' }, { status: 403 });
  try {
    const { email, password } = await request.json();
    if (typeof email !== 'string' || email.length > 254 || typeof password !== 'string' || password.length > 256) return Response.json({ error: 'Thông tin đăng nhập không hợp lệ.' }, { status: 400 });
    const user = await prisma.adminUser.findUnique({ where: { email: email.toLowerCase().trim() } });
    if (user?.lockedUntil > new Date()) return Response.json({ error: 'Tạm khóa đăng nhập. Thử lại sau 15 phút.' }, { status: 429 });
    const valid = verifyPassword(password, user?.passwordHash || dummyHash);
    if (!user || !valid || !user.isActive) {
      if (user) {
        const updated = await prisma.adminUser.update({ where: { id: user.id }, data: { failedAttempts: { increment: 1 } } });
        if (updated.failedAttempts >= 5) await prisma.adminUser.update({ where: { id: user.id }, data: { failedAttempts: 0, lockedUntil: new Date(Date.now() + 900000) } });
      }
      return Response.json({ error: 'Email hoặc mật khẩu không đúng.' }, { status: 401 });
    }
    const token = randomBytes(32).toString('hex'), expiresAt = new Date(Date.now() + 8 * 3600000);
    await prisma.$transaction([
      prisma.adminUser.update({ where: { id: user.id }, data: { failedAttempts: 0, lockedUntil: null } }),
      prisma.adminSession.deleteMany({ where: { expiresAt: { lt: new Date() } } }),
      prisma.adminSession.create({ data: { id: tokenHash(token), userId: user.id, expiresAt } }),
    ]);
    (await cookies()).set(sessionCookie, token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/', expires: expiresAt });
    return Response.json({ success: true });
  } catch (error) { return apiError(error); }
}
