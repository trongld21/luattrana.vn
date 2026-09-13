import { cookies } from 'next/headers';
import { prisma } from './prisma';
import { tokenHash } from './password.mjs';
export const sessionCookie = 'trana_admin';
export async function currentAdmin() {
  const token = (await cookies()).get(sessionCookie)?.value;
  if (!token || token.length !== 64) return null;
  const session = await prisma.adminSession.findUnique({ where: { id: tokenHash(token) }, include: { user: true } });
  if (!session || session.expiresAt <= new Date()) return null;
  return { id: session.user.id, email: session.user.email };
}
export function sameOrigin(request) {
  const origin = request.headers.get('origin');
  const configured = process.env.SITE_URL;
  const expected = configured ? new URL(configured).origin : new URL(request.url).origin;
  return origin === expected;
}
export async function authorize(request) {
  if (!['GET','HEAD'].includes(request.method) && !sameOrigin(request)) return Response.json({ error: 'Nguồn yêu cầu không hợp lệ.' }, { status: 403 });
  if (!await currentAdmin()) return Response.json({ error: 'Vui lòng đăng nhập.' }, { status: 401 });
  return null;
}
export function apiError(error) {
  if (error.code === 'P2002') return Response.json({ error: 'Đường dẫn đã tồn tại. Hãy chọn đường dẫn khác.' }, { status: 409 });
  if (error.code === 'P2025') return Response.json({ error: 'Không tìm thấy dữ liệu.' }, { status: 404 });
  if (error.code === 'P2003') return Response.json({ error: 'Danh mục không tồn tại hoặc đang được sử dụng.' }, { status: 409 });
  return Response.json({ error: 'Không thể xử lý yêu cầu. Vui lòng thử lại.' }, { status: 503 });
}
