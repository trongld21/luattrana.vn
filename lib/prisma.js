import { PrismaClient } from '@prisma/client';

const globalForPrisma = global;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Mock database fallback for Legal Documents & Consultations when PostgreSQL is offline
export const mockLegalDocs = [
  {
    id: 'doc-1',
    title: 'Đơn Khởi Kiện Tranh Chấp Đất Đai (Mẫu Tòa Án)',
    category: 'bieumau',
    description: 'Mẫu đơn khởi kiện giải quyết tranh chấp ranh giới đất đai, cấp giấy chứng nhận quyền sử dụng đất tại Tòa án nhân dân.',
    content: `CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br>Độc lập - Tự do - Hạnh phúc<br><br><strong>ĐƠN KHỞI KIỆN</strong><br>(V/v: Tranh chấp ranh giới quyền sử dụng đất & Yêu cầu công nhận QSDĐ)<br><br><strong>Kính gửi: TÒA ÁN NHÂN DÂN CÓ THẨM QUYỀN</strong><br><br>Người khởi kiện: [Họ và tên người nộp đơn] - Sinh năm: [...]<br>CCCD số: [...] cấp ngày [...] tại [...]<br>Địa chỉ thường trú: [...]<br><br>Người bị kiện: [Họ và tên người bị kiện] - Sinh năm: [...]<br>Địa chỉ thường trú: [...]<br><br><strong>NỘI DUNG VỤ VIỆC:</strong><br>Gia đình tôi là chủ sở hữu hợp pháp thửa đất số [...], tờ bản đồ số [...], diện tích [...] m2 tại địa chỉ [...]. Thửa đất đã được UBND cấp Giấy chứng nhận quyền sử dụng đất số [...] ngày [...].<br>Tuy nhiên, vào khoảng tháng [...] người bị kiện đã có hành vi lấn chiếm diện tích đất ranh giới với kích thước [...]. Mặc dù đã qua hòa giải tại UBND cấp xã nhưng không thành.<br><br><strong>YÊU CẦU TÒA ÁN GIẢI QUYẾT:</strong><br>1. Buộc người bị kiện trả lại diện tích đất lấn chiếm [...] m2.<br>2. Công nhận mốc ranh giới sử dụng đất theo đúng Giấy chứng nhận QSDĐ đã cấp.`,
    keywords: 'đơn khởi kiện tranh chấp đất đai toà án sổ đỏ',
    downloadUrl: '#'
  },
  {
    id: 'doc-2',
    title: 'Đơn Xin Ly Hôn (Thuận Tình / Đơn Phương)',
    category: 'bieumau',
    description: 'Mẫu đơn yêu cầu công nhận thuận tình ly hôn hoặc khởi kiện ly hôn đơn phương kèm thỏa thuận tài sản & quyền nuôi con.',
    content: `CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br>Độc lập - Tự do - Hạnh phúc<br><br><strong>ĐƠN YÊU CẦU CÔNG NHẬN THUẬN TÌNH LY HÔN</strong><br>(Và thỏa thuận về nuôi con, chia tài sản khi ly hôn)<br><br><strong>Kính gửi: TÒA ÁN NHÂN DÂN CÓ THẨM QUYỀN</strong><br><br>Chúng tôi gồm:<br>Chồng: [Họ tên Chồng] - SĐT: [...]<br>Vợ: [Họ tên Vợ] - SĐT: [...]<br><br><strong>NỘI DUNG YÊU CẦU:</strong><br>1. Về quan hệ hôn nhân: Do bất đồng quan điểm sống sâu sắc, mục đích hôn nhân không đạt được. Chúng tôi tự nguyện đề nghị Tòa án giải quyết ly hôn.<br>2. Về con chung: Chúng tôi có 01 con chung. Thỏa thuận để Vợ trực tiếp nuôi dưỡng, Chồng cấp dưỡng [...] VNĐ/tháng.<br>3. Về tài sản chung & Nợ chung: Tự thỏa thuận, không yêu cầu Tòa án giải quyết.`,
    keywords: 'đơn xin ly hôn đơn phương thuận tình tài sản nuôi con',
    downloadUrl: '#'
  },
  {
    id: 'doc-3',
    title: 'Hợp Đồng Đặt Cọc Mua Bán Nhà Đất Chặt Chẽ',
    category: 'hopdong',
    description: 'Mẫu hợp đồng đặt cọc chuyển nhượng QSDĐ chuẩn pháp lý, phòng ngừa rủi ro phạt cọc và tranh chấp quy hoạch.',
    content: `<strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong><br><strong>HỢP ĐỒNG ĐẶT CỌC CHUYỂN NHƯỢNG QSDĐ & TÀI SẢN TRẮNG</strong><br><br>Hôm nay, ngày [...] tháng [...] năm 2026.<br>Tại Văn phòng Công ty Luật Trần Á.<br><br><strong>BÊN A (Bên Đặt Cọc):</strong> [Họ tên người mua] - CCCD: [...]<br><strong>BÊN B (Bên Nhận Đặt Cọc):</strong> [Họ tên người bán] - CCCD: [...]<br><br>Hai bên thống nhất ký kết Hợp đồng đặt cọc để bảo đảm thực hiện hợp đồng chuyển nhượng QSDĐ thửa đất số [...], diện tích [...] m2.<br>- Số tiền đặt cọc: [...] VNĐ.<br>- Phạt cọc: Nếu Bên B từ chối chuyển nhượng phải trả lại tiền cọc và bị phạt gấp 02 lần số tiền cọc.`,
    keywords: 'hợp đồng đặt cọc mua bán nhà đất bất động sản',
    downloadUrl: '#'
  },
  {
    id: 'doc-4',
    title: 'Tổng Hợp Án Lệ Về Tranh Chấp Đất Đai & Thừa Kế',
    category: 'anle',
    description: 'Tập hợp các bản án lệ tiêu biểu của Tòa án nhân dân Tối cao về xác định công sức đóng góp và di sản thừa kế.',
    content: `Tập hợp 10 Án lệ quan trọng của Tòa án nhân dân Tối cao giải quyết các vụ án tranh chấp thừa kế nhà đất và hợp đồng đặt cọc chuyển nhượng đất đai.`,
    keywords: 'bản án án lệ tranh chấp hợp đồng mua bán đất đai thừa kế',
    downloadUrl: '#'
  },
  {
    id: 'doc-5',
    title: 'Đơn Khiếu Nại Quyết Định Thu Hồi Đất & Bồi Thường',
    category: 'bieumau',
    description: 'Mẫu đơn khiếu nại gửi UBND cấp huyện/tỉnh về quyết định thu hồi đất, đơn giá bồi thường và hỗ trợ tái định cư.',
    content: `Mẫu đơn khiếu nại hành chính chính thức gửi UBND cấp huyện/tỉnh yêu cầu xem xét lại phương án đền bù giải phóng mặt bằng.`,
    keywords: 'đơn khiếu nại quyết định thu hồi đất bồi thường giải phóng mặt bằng',
    downloadUrl: '#'
  },
  {
    id: 'doc-6',
    title: 'Công Văn Giải Đáp Hiệu Lực Luật Đất Đai Mới Nhất',
    category: 'congvan',
    description: 'Tổng hợp các điểm mới cần chú ý về cấp sổ đỏ, hạn mức giao đất và trình tự hòa giải tranh chấp đất đai tại xã/phường.',
    content: `Văn bản hướng dẫn áp dụng Luật Đất đai mới nhất ban hành bởi Tòa án nhân dân tối cao & Bộ Tài nguyên Môi trường.`,
    keywords: 'công văn hướng dẫn áp dụng luật đất đai tố tụng dân sự',
    downloadUrl: '#'
  }
];
