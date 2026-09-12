export default function About() {
  return (
    <section className="about-section" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-image-wrapper">
            <div className="about-photo-card">
              <img src="/office-interior.png" alt="Không gian trụ sở Công ty Luật Trần Á" className="about-real-img" loading="lazy" width="1024" height="1024" />
              <div className="photo-overlay-badge">
                <i className="fa-solid fa-shield-halved badge-icon"></i>
                <div>
                  <div className="badge-text-title">CÔNG TY LUẬT TRẦN Á</div>
                  <div className="badge-text-sub">Không Gian Sang Trọng - Tư Vấn Tận Tâm</div>
                </div>
              </div>
            </div>
          </div>

          <div className="about-text-content">
            <div className="section-tag"><i className="fa-solid fa-building-flag"></i> VỀ CÔNG TY LUẬT TRẦN Á</div>
            <h2 className="section-title">Am hiểu pháp luật.<br /><em>Thấu hiểu con người.</em></h2>
            <p className="about-lead">
              <strong>Công ty Luật Trần Á</strong> được thành lập với sứ mệnh mang đến cho khách hàng các giải pháp pháp lý toàn diện, bảo vệ quyền lợi chính đáng tối đa trong các vụ án dân sự, đất đai, hình sự, hành chính và thương mại.
            </p>
            <p className="about-desc">
              Với định hướng lấy khách hàng làm trung tâm, chúng tôi không chỉ dừng lại ở vai trò tư vấn luật suông mà trực tiếp đồng hành, tham dự các phiên toà xét xử, làm việc cùng cơ quan quản lý đất đai và cơ quan tố tụng để đem lại kết quả thực tế nhanh chóng, thấu đáo nhất.
            </p>

            <div className="about-features">
              <div className="feature-item">
                <div className="feature-icon"><i className="fa-solid fa-gavel"></i></div>
                <div className="feature-info">
                  <h4>Kinh Nghiệm Tranh Tụng Thực Chiến</h4>
                  <p>Trực tiếp tham gia bảo vệ, bào chữa tại các cấp Tòa án nhân dân với bản lĩnh và kỹ năng tố tụng chuyên sâu.</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><i className="fa-solid fa-map"></i></div>
                <div className="feature-info">
                  <h4>Chuyên Sâu Hồ Sơ Đất Đai Phức Tạp</h4>
                  <p>Am hiểu sâu sắc thủ tục đất đai, tách thửa, thừa kế nhà đất, cấp giấy chứng nhận và khiếu nại bồi thường thu hồi đất.</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><i className="fa-solid fa-user-lock"></i></div>
                <div className="feature-info">
                  <h4>Bảo Mật & Minh Bạch Tuyệt Đối</h4>
                  <p>Cam kết tuyệt đối bảo mật mọi thông tin vụ việc và công khai rõ ràng về quy trình, chi phí ngay từ đầu.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
