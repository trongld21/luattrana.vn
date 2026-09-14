export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-statement" aria-hidden="true">Trách nhiệm –<br />Niềm tin.</div>
        <div className="footer-top">
          <div className="footer-col footer-brand">
            <div className="f-logo">
              <img src="/logo.svg" alt="Công ty Luật Trần Á Logo" />
              <span>CÔNG TY LUẬT TRẦN Á</span>
            </div>
            <p className="f-desc">
              Đơn vị tư vấn pháp luật và tham dự toà án hàng đầu. Chúng tôi luôn chuyên nghiệp, tâm huyết và mang đến giải pháp pháp lý an toàn, tối ưu nhất cho cá nhân và doanh nghiệp.
            </p>
            <div className="f-socials">
              <a href="https://www.facebook.com/Luattrana020726/" target="_blank" rel="noopener noreferrer" title="Trang Facebook"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="https://zalo.me/0939369489" target="_blank" rel="noopener noreferrer" title="Zalo công ty"><i className="fa-solid fa-comment"></i></a>
              <a href="https://maps.app.goo.gl/sRYWsP2hmoNTCVvw8?g_st=ic" target="_blank" rel="noopener noreferrer" title="Google Maps"><i className="fa-solid fa-map-location-dot"></i></a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="f-title">Dịch Vụ Trọng Tâm</h4>
            <ul className="f-links">
              <li><a href="/linh-vuc/thu-tuc-hanh-chinh-nha-dat">Thủ tục Hành chính Nhà Đất</a></li>
              <li><a href="/linh-vuc/tranh-tung-toa-an"><i className="fa-solid fa-angle-right"></i> Luật sư Tham dự toà án</a></li>
              <li><a href="/linh-vuc/dat-dai-bat-dong-san"><i className="fa-solid fa-angle-right"></i> Dịch vụ pháp lý Đất đai</a></li>
              <li><a href="/linh-vuc/bao-chua-hinh-su"><i className="fa-solid fa-angle-right"></i> Bào chữa vụ án Hình sự</a></li>
              <li><a href="/linh-vuc/hon-nhan-gia-dinh"><i className="fa-solid fa-angle-right"></i> Hôn nhân & Gia đình</a></li>
              <li><a href="/linh-vuc/dan-su-thua-ke"><i className="fa-solid fa-angle-right"></i> Dân sự & Thừa kế</a></li>
              <li><a href="/linh-vuc/doanh-nghiep-thuong-mai"><i className="fa-solid fa-angle-right"></i> Doanh nghiệp & Thương mại</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="f-title">Thông Tin Hữu Ích</h4>
            <ul className="f-links">
              <li><a href="/#process"><i className="fa-solid fa-angle-right"></i> Quy trình làm việc với Luật sư</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="f-title">Thông Tin Kết Nối</h4>
            <div className="f-contact-item">
              <i className="fa-solid fa-phone"></i>
              <div>Điện thoại: <a href="tel:0939369489"><strong>0939 369 489</strong></a></div>
            </div>
            <div className="f-contact-item">
              <i className="fa-solid fa-comments"></i>
              <div>Zalo: <a href="https://zalo.me/0939369489" target="_blank" rel="noopener noreferrer">0939 369 489</a></div>
            </div>
            <div className="f-contact-item">
              <i className="fa-brands fa-facebook"></i>
              <div>Facebook: <a href="https://www.facebook.com/Luattrana020726/" target="_blank" rel="noopener noreferrer">Luattrana020726</a></div>
            </div>
            <div className="f-contact-item">
              <i className="fa-solid fa-location-dot"></i>
              <div>Bản đồ: <a href="https://maps.app.goo.gl/sRYWsP2hmoNTCVvw8?g_st=ic" target="_blank" rel="noopener noreferrer">Vị trí Google Maps</a></div>
            </div>
          </div>
        </div>

        <div className="footer-bottom text-center">
          <p>&copy; 2026 <strong>CÔNG TY LUẬT TRẦN Á</strong>. Bảo lưu mọi quyền.</p><div><a href="/chinh-sach-bao-mat">Bảo mật</a><a href="/dieu-khoan">Điều khoản</a></div>
        </div>
      </div>
    </footer>
  );
}
