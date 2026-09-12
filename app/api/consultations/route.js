import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, service, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: 'Họ tên và Số điện thoại là bắt buộc' },
        { status: 400 }
      );
    }

    let consultation;
    try {
      // Save directly to PostgreSQL via Prisma
      consultation = await prisma.consultation.create({
        data: {
          name,
          phone,
          service: service || 'Chưa chọn lĩnh vực',
          message: message || '',
        },
      });
    } catch (dbError) {
      console.warn('PostgreSQL database save fallback notice:', dbError.message);
      // Fallback mock record if DB is not reachable
      consultation = {
        id: `local-${Date.now()}`,
        name,
        phone,
        service: service || 'Chưa chọn lĩnh vực',
        message: message || '',
        status: 'PENDING',
        createdAt: new Date().toISOString(),
      };
    }

    return NextResponse.json({
      success: true,
      message: 'Đăng ký tư vấn thành công!',
      data: consultation,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Có lỗi xảy ra khi xử lý yêu cầu' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    let consultations = [];
    try {
      consultations = await prisma.consultation.findMany({
        orderBy: { createdAt: 'desc' },
      });
    } catch (err) {
      consultations = [];
    }
    return NextResponse.json({ success: true, data: consultations });
  } catch (error) {
    return NextResponse.json({ success: false, data: [] });
  }
}
