import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../lib/password.mjs';
const prisma = new PrismaClient();
try {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !password || password.length < 12 || password.length > 256) throw new Error('Cần ADMIN_EMAIL và ADMIN_PASSWORD (12–256 ký tự) trong môi trường.');
  await prisma.adminUser.create({ data: { email, passwordHash: hashPassword(password) } });
  console.log('Đã tạo tài khoản quản trị.');
} catch (error) { console.error(error.code === 'P2002' ? 'Email đã tồn tại; không thay đổi mật khẩu.' : 'Không thể tạo admin. Kiểm tra biến ADMIN_EMAIL, ADMIN_PASSWORD và kết nối database.'); process.exitCode = 1; }
finally { await prisma.$disconnect(); }
