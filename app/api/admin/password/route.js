import { authorize, currentAdmin, apiError, sessionCookie } from '@/lib/admin';
import { hashPassword, verifyPassword } from '@/lib/password.mjs';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
export async function POST(request) {
  try {
    const denied = await authorize(request); if (denied) return denied;
    const { currentPassword, newPassword } = await request.json();
    if (typeof currentPassword !== 'string' || currentPassword.length > 256 || typeof newPassword !== 'string' || newPassword.length < 12 || newPassword.length > 256) return Response.json({ error:'Mật khẩu mới cần 12–256 ký tự.' },{ status:400 });
    const admin = await currentAdmin();
    const user = await prisma.adminUser.findUnique({ where:{id:admin.id} });
    if (!verifyPassword(currentPassword,user.passwordHash)) return Response.json({error:'Mật khẩu hiện tại không đúng.'},{status:400});
    await prisma.$transaction([prisma.adminUser.update({where:{id:user.id},data:{passwordHash:hashPassword(newPassword)}}),prisma.adminSession.deleteMany({where:{userId:user.id}})]);
    (await cookies()).delete(sessionCookie);
    return Response.json({success:true});
  } catch(error) { return apiError(error); }
}
