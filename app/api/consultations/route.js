import { prisma } from '@/lib/prisma';
import { authorize, apiError } from '@/lib/admin';
import { text } from '@/lib/content.mjs';
export async function POST(request) {
  try {
    let data;
    try {
      const body = await request.json();
      data = { name: text(body.name,150,true), phone: text(body.phone,30,true), service: text(body.service || 'Chưa chọn lĩnh vực',200), message: text(body.message || '',5000) };
      if (!/^[+\d\s().-]{8,30}$/.test(data.phone)) throw new Error('Số điện thoại không hợp lệ.');
    } catch (error) { return Response.json({ success: false, error: error.message }, { status: 400 }); }
    await prisma.consultation.create({ data });
    return Response.json({ success: true, message: 'Đã nhận yêu cầu tư vấn.' }, { status: 201 });
  } catch { return Response.json({ success: false, error: 'Chưa lưu được yêu cầu. Vui lòng thử lại hoặc liên hệ hotline.' }, { status: 503 }); }
}
export async function GET(request) {
  try {
    const denied = await authorize(request, 'consultations'); if (denied) return denied;
    return Response.json({ success: true, data: await prisma.consultation.findMany({ take: 100, orderBy: { createdAt: 'desc' } }) });
  } catch (error) { return apiError(error); }
}
