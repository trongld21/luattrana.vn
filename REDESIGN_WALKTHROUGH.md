# Luật Trần Á — Redesign walkthrough

## Kết quả

Website công khai được nâng cấp theo hướng hãng luật cao cấp, điềm tĩnh và có tính biên tập. Toàn bộ nghiệp vụ hiện có, API, Prisma, CMS quản trị, công cụ án phí, thư viện tài liệu và dữ liệu bài viết được giữ nguyên.

## Design system

- Màu chính: navy `#101820`, navy phụ `#19242E`, paper `#F5F3EE`, brass `#B69A67`, burgundy `#6E2528`.
- Typography: Cormorant Garamond cho display heading; Inter cho nội dung và UI.
- Layout: container tối đa 1.400px, nhịp khoảng trắng lớn, các section 12 cột hoặc chia bất đối xứng 5/7 và 7/5.
- Component: button vuông nhẹ, border mảnh, shadow tiết chế, editorial list thay cho card grid lặp lại.
- Motion: reveal theo viewport, chuyển động số của công cụ án phí, hover link có hướng và clip reveal ở hero. `prefers-reduced-motion` được tôn trọng.

Chi tiết token và quy tắc dùng tại `DESIGN_SYSTEM.md`.

## Cấu trúc trang chủ

1. Header trong suốt trên hero, chuyển nền navy khi cuộn; desktop có mega menu và mobile có drawer khóa focus.
2. Hero toàn màn hình với thông điệp lớn, ảnh documentary, CTA và các tín hiệu tin cậy.
3. Dải trust statement ngắn gọn.
4. About chia bất đối xứng, các giá trị được đánh số.
5. Practice areas dạng danh sách biên tập, ảnh thay đổi theo mục đang tương tác.
6. Statement toàn màn hình “Vững pháp lý. Vẹn niềm tin.”
7. Quy trình bốn bước theo timeline.
8. Công cụ án phí chia hai cột, cập nhật theo thời gian thực và có chuyển động số.
9. Thư viện biểu mẫu dạng danh sách sạch, có skeleton/loading, empty và error state.
10. Journal hiển thị nội dung mới từ CMS.
11. Contact, bản đồ, CTA và footer lớn theo cùng hệ thống hình ảnh.

## Route mới và SEO

Sáu trang chi tiết dịch vụ dùng route `/linh-vuc/[slug]`, metadata riêng, canonical URL, Open Graph, breadcrumb schema, phạm vi hỗ trợ, hồ sơ cần chuẩn bị, quy trình và dịch vụ liên quan.

Trang `/bai-viet` có bài nổi bật, lọc, tìm kiếm, phân trang và empty state. Trang bài chi tiết có mục lục tự sinh, anchor cho H2, nội dung liên quan, CTA, metadata và Article schema. Sitemap bao gồm trang chủ, bài viết, sáu dịch vụ và hai trang chính sách.

## Responsive và accessibility

- Layout được tối ưu tại các ngưỡng 1.240px, 1.080px, 900px, 768px, 560px và 480px.
- Navigation có focus trap, Escape để đóng, trạng thái `aria-expanded`, label cho nút nổi và vùng live cho kết quả án phí.
- Nội dung có hierarchy heading, màu chữ tương phản, vùng bấm đủ lớn và hiệu ứng giảm theo thiết lập hệ điều hành.
- Ảnh nội dung hỗ trợ alt từ CMS và fallback sang tiêu đề bài viết.

## Hiệu năng và giới hạn

Không thêm thư viện giao diện hay animation mới. Các section phía dưới tải theo luồng mặc định của Next.js; ảnh trong danh sách bài viết dùng lazy loading. Font hiện tải từ Google Fonts và bộ Font Awesome vẫn là tài nguyên ngoài đã có của dự án.

Ảnh hiện tại đã được xử lý bằng crop, saturation và contrast để thống nhất art direction. Khi có bộ ảnh thương hiệu thật, nên thay hero, văn phòng và chân dung luật sư bằng ảnh gốc đã tối ưu WebP/AVIF để tăng độ tin cậy và cải thiện LCP.

## Kiểm tra

- `npm test`: bộ kiểm tra CMS, bảo mật và RBAC.
- `npm run build`: production build, kiểm tra route, server component và type/lint tích hợp của Next.js.
- Các route động dịch vụ được pre-render từ danh sách slug cố định; bài viết và dữ liệu CMS tiếp tục lấy từ PostgreSQL.
