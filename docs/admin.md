# Quản trị nội dung

## Cài đặt

Node.js 22 và PostgreSQL. Giữ bí mật trong `.env`, không commit.

1. Cấu hình `DATABASE_URL` và `SITE_URL` (origin thật, ví dụ `https://luattrana.vn`; local dùng `http://localhost:3001`).
2. Chạy `npm ci`, `npm run prisma:generate`, `npm run db:deploy`.
3. Thêm `ADMIN_EMAIL` và `ADMIN_PASSWORD` (12–256 ký tự) vào `.env`, chạy `npm run admin:create`. Lệnh chỉ tạo mới, không ghi đè tài khoản cũ. Xóa `ADMIN_PASSWORD` khỏi env sau khi tạo.
4. Chạy `npm run dev -- --port 3001` hoặc production `npm run build && npm start` sau reverse proxy HTTPS.
5. Mở `/admin/login`.

Không có tài khoản hoặc mật khẩu mặc định. Admin có toàn quyền quản trị. Nhân viên chỉ truy cập các màn admin đã cấp.

## Chức năng

- CRUD bài viết: soạn thảo định dạng, tiêu đề, slug, danh mục, ảnh, alt, tóm tắt, meta title/description; bản nháp/xuất bản, xem trước bản đã lưu.
- CRUD danh mục: xóa danh mục giữ nguyên bài viết, đưa về không có danh mục.
- CRUD tài liệu: soạn nội dung, phân loại, từ khóa, URL tải file. Nút tải chỉ xuất hiện khi có file thật.
- CRUD tư vấn: chờ xử lý, đã liên hệ, hoàn tất, đã hủy. Yêu cầu công khai chỉ báo thành công sau khi lưu database.
- Ảnh PNG/JPEG/WebP tối đa 2 MB lưu trong PostgreSQL, không phụ thuộc filesystem tạm của Vercel. Đổi tên/sao chép URL/xóa; ảnh đang được dùng bị chặn xóa. Ảnh có URL công khai: không dùng cho hồ sơ khách hàng riêng tư.
- `/bai-viet`: tìm kiếm, danh mục, phân trang; bài công khai có canonical, Open Graph và Article JSON-LD.
- `/sitemap.xml`: chỉ bài xuất bản; `/robots.txt`: không cho index admin và preview.

## Bảo mật / vận hành

Mật khẩu scrypt + salt, session ngẫu nhiên lưu hash trong DB, cookie HttpOnly/SameSite và Secure khi production; hết hạn 8 giờ. Sai mật khẩu 5 lần khóa tài khoản 15 phút. API mutation kiểm tra Origin, mọi API admin kiểm tra session. HTML được lọc phía server.

Production phải có HTTPS và SITE_URL đúng. Reverse proxy cần chuyển tiếp Host chuẩn. Nên giới hạn body request 3 MB và rate limit tại proxy, đặc biệt `/api/admin/login` và `/api/consultations`. Ảnh lưu trong DB làm tăng dung lượng backup; chuyển object storage nếu thư viện lớn.

Kiểm tra trước deploy: `npm test && npm run build`; chạy `npm run db:deploy` một lần trong quy trình release trước khi chạy phiên bản mới. Không chạy `prisma db push` trên production.

Đổi mật khẩu trong thanh bên admin bằng nút **Đổi mật khẩu**. Thao tác thu hồi mọi session của tài khoản và yêu cầu đăng nhập lại.

## Nhân sự & phân quyền

Vào **Nhân sự & phân quyền → Thêm mới**, nhập tên, email, mật khẩu và chọn các màn được phép truy cập. Ví dụ chỉ tích **Bài viết SEO** thì nhân viên chỉ có màn này, được tạo/sửa/xóa/xuất bản bài viết và xem trước bản nháp. Quyền theo màn áp dụng cho toàn bộ dữ liệu của màn, không giới hạn theo tác giả.

- Các quyền độc lập: Bài viết SEO, Danh mục, Tài liệu pháp lý, Yêu cầu tư vấn, Thư viện ảnh.
- Nhân viên viết bài được đọc danh sách tên/id danh mục để chọn trong bài, nhưng không có quyền quản lý danh mục. Upload ảnh chỉ có khi được cấp thêm Thư viện ảnh; nếu không vẫn có thể nhập URL ảnh.
- Màn nhân sự chỉ admin thấy và gọi API được. Nhân viên không thể tự cấp quyền hoặc tạo tài khoản admin.
- Sửa quyền, đặt lại mật khẩu, khóa tài khoản sẽ thu hồi mọi session cũ. Tài khoản không có quyền nào vẫn đăng nhập được nhưng chỉ thấy thông báo chưa được phân công. Tài khoản khóa không đăng nhập được.
- Tài khoản admin được bảo vệ khỏi sửa/xóa tại màn nhân sự. Tạo admin bổ sung bằng lệnh vận hành `npm run admin:create`.
- Tài khoản tồn tại trước migration phân quyền giữ vai trò ADMIN. Tài khoản mới mặc định STAFF, không có quyền.
- API kiểm tra quyền hiện tại trong database ở mỗi yêu cầu; menu đồng bộ khi quay lại tab và định kỳ 60 giây. Thu hồi session có hiệu lực ngay ở lần gọi API tiếp theo.

Kiểm thử quyền: `TEST_BASE_URL=http://localhost:3011 node --env-file=.env scripts/smoke-permissions.mjs` với server kiểm thử đang chạy. Script tạo dữ liệu riêng và tự xóa sau kiểm thử.
