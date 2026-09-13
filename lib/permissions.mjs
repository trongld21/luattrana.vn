export const screenLabels = Object.freeze({ posts: 'Bài viết SEO', categories: 'Danh mục', documents: 'Tài liệu pháp lý', consultations: 'Yêu cầu tư vấn', media: 'Thư viện ảnh' });
export function canAccess(user, screen) {
  if (!user || user.isActive === false) return false;
  if (screen !== 'staff' && !Object.hasOwn(screenLabels, screen)) return false;
  return user.role === 'ADMIN' || (screen !== 'staff' && user.role === 'STAFF' && Array.isArray(user.permissions) && user.permissions.includes(screen));
}
export function allowedScreens(user) { return [...Object.keys(screenLabels), 'staff'].filter(screen => canAccess(user, screen)); }
export function staffPayload(body, creating = false) {
  if (!body || typeof body !== 'object') throw new Error('Dữ liệu không hợp lệ.');
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (!name || name.length > 150) throw new Error('Nhập tên nhân viên (tối đa 150 ký tự).');
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Email không hợp lệ.');
  if (!Array.isArray(body.permissions) || body.permissions.some(p => !Object.hasOwn(screenLabels, p))) throw new Error('Quyền truy cập không hợp lệ.');
  if (typeof body.isActive !== 'boolean') throw new Error('Trạng thái tài khoản không hợp lệ.');
  if (body.role && body.role !== 'STAFF') throw new Error('Không thể cấp quyền quản trị từ màn nhân viên.');
  const password = body.password;
  if ((creating || password) && (typeof password !== 'string' || password.length < 12 || password.length > 256)) throw new Error('Mật khẩu cần từ 12 đến 256 ký tự.');
  return { name, email, isActive: body.isActive, permissions: [...new Set(body.permissions)], ...(password ? { password } : {}) };
}
