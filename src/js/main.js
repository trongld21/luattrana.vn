/* ==========================================================================
   CÔNG TY LUẬT TRẦN Á - MAIN JAVASCRIPT ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
   * 1. MOBILE DRAWER NAVIGATION
   * ------------------------------------------------------------------------ */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerClose = document.getElementById('drawerClose');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openDrawer() {
    mobileDrawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  /* ------------------------------------------------------------------------
   * 2. SCROLL & STICKY HEADER & BACK-TO-TOP
   * ------------------------------------------------------------------------ */
  const backToTopBtn = document.getElementById('backToTopBtn');
  const mainHeader = document.getElementById('mainHeader');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav .nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Header background intensity
    if (scrollY > 50) {
      mainHeader.style.boxShadow = '0 10px 25px rgba(15, 23, 42, 0.12)';
    } else {
      mainHeader.style.boxShadow = 'var(--shadow-sm)';
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }

    // Active nav link highlight
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ------------------------------------------------------------------------
   * 3. SERVICES FILTERING
   * ------------------------------------------------------------------------ */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');
  const dropdownFilterLinks = document.querySelectorAll('.dropdown-menu a[data-filter]');

  function applyServiceFilter(filterVal) {
    filterBtns.forEach(btn => {
      if (btn.getAttribute('data-filter') === filterVal) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    serviceCards.forEach(card => {
      const cat = card.getAttribute('data-category');
      if (filterVal === 'all' || cat === filterVal) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      applyServiceFilter(filter);
    });
  });

  dropdownFilterLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const filter = link.getAttribute('data-filter');
      applyServiceFilter(filter);
    });
  });

  /* ------------------------------------------------------------------------
   * 4. COURT FEE CALCULATOR ENGINE (NGHỊ QUYẾT 326/2016/UBTVQH14)
   * ------------------------------------------------------------------------ */
  const caseTypeSelect = document.getElementById('caseType');
  const disputeValueInput = document.getElementById('disputeValue');
  const disputeValueGroup = document.getElementById('disputeValueGroup');
  const btnCalculate = document.getElementById('btnCalculate');
  const advanceFeeResult = document.getElementById('advanceFeeResult');
  const totalFeeResult = document.getElementById('totalFeeResult');
  const calcExplain = document.getElementById('calcExplain');

  // Format currency with commas (500,000,000)
  function formatCurrency(val) {
    return new Intl.NumberFormat('vi-VN').format(val) + ' VNĐ';
  }

  function parseFormattedNumber(valStr) {
    return parseFloat(valStr.replace(/[^0-9]/g, '')) || 0;
  }

  if (disputeValueInput) {
    disputeValueInput.addEventListener('input', (e) => {
      const rawNum = parseFormattedNumber(e.target.value);
      if (rawNum === 0 && e.target.value.trim() === '') {
        e.target.value = '';
      } else {
        e.target.value = new Intl.NumberFormat('en-US').format(rawNum);
      }
    });
  }

  if (caseTypeSelect) {
    caseTypeSelect.addEventListener('change', () => {
      const val = caseTypeSelect.value;
      if (val === 'civil_no_value' || val === 'marriage_divorce' || val === 'administrative') {
        disputeValueGroup.style.display = 'none';
      } else {
        disputeValueGroup.style.display = 'block';
      }
      calculateCourtFee();
    });
  }

  function calculateCourtFee() {
    const type = caseTypeSelect ? caseTypeSelect.value : 'civil_value';
    const amount = disputeValueInput ? parseFormattedNumber(disputeValueInput.value) : 0;

    let totalFee = 0;
    let explanation = '';

    if (type === 'civil_no_value' || type === 'marriage_divorce' || type === 'administrative') {
      totalFee = 300000;
      explanation = 'Án phí sơ thẩm không có giá ngạch/hành chính cố định: 300.000 VNĐ theo quy định.';
    } else if (type === 'civil_value' || type === 'marriage_property' || type === 'business') {
      if (amount <= 60000000) {
        totalFee = Math.max(300000, amount * 0.05);
        explanation = `Án phí = 5% x ${formatCurrency(amount)} (Mức tối thiểu 300.000 VNĐ).`;
      } else if (amount <= 400000000) {
        totalFee = 3000000 + 0.04 * (amount - 60000000);
        explanation = `Án phí = 3.000.000 VNĐ + 4% x (${formatCurrency(amount)} - 60.000.000 VNĐ).`;
      } else if (amount <= 800000000) {
        totalFee = 16600000 + 0.03 * (amount - 400000000);
        explanation = `Án phí = 16.600.000 VNĐ + 3% x (${formatCurrency(amount)} - 400.000.000 VNĐ).`;
      } else if (amount <= 2000000000) {
        totalFee = 28600000 + 0.02 * (amount - 800000000);
        explanation = `Án phí = 28.600.000 VNĐ + 2% x (${formatCurrency(amount)} - 800.000.000 VNĐ).`;
      } else if (amount <= 4000000000) {
        totalFee = 52600000 + 0.001 * (amount - 2000000000);
        explanation = `Án phí = 52.600.000 VNĐ + 0.1% x (${formatCurrency(amount)} - 2.000.000.000 VNĐ).`;
      } else {
        totalFee = 54600000 + 0.0001 * (amount - 4000000000);
        explanation = `Án phí = 54.600.000 VNĐ + 0.01% x (${formatCurrency(amount)} - 4.000.000.000 VNĐ).`;
      }
    }

    const advanceFee = totalFee * 0.5;

    if (advanceFeeResult) advanceFeeResult.textContent = formatCurrency(advanceFee);
    if (totalFeeResult) totalFeeResult.textContent = formatCurrency(totalFee);
    if (calcExplain) calcExplain.innerHTML = `<strong>Cách tính:</strong> ${explanation}`;
  }

  if (btnCalculate) {
    btnCalculate.addEventListener('click', calculateCourtFee);
  }

  // Initial calculation on page load
  calculateCourtFee();

  /* ------------------------------------------------------------------------
   * 5. LEGAL DOCUMENTS SEARCH & PREVIEW MODAL
   * ------------------------------------------------------------------------ */
  const docSearchInput = document.getElementById('docSearchInput');
  const docCategorySelect = document.getElementById('docCategorySelect');
  const docCards = document.querySelectorAll('.doc-card');
  const viewDocBtns = document.querySelectorAll('.view-doc-btn');
  const docViewModal = document.getElementById('docViewModal');
  const modalDocTitle = document.getElementById('modalDocTitle');
  const modalDocCategory = document.getElementById('modalDocCategory');
  const modalDocPreview = document.getElementById('modalDocPreview');

  const docDatabase = {
    'Đơn Khởi Kiện Tranh Chấp Đất Đai': {
      category: 'Biểu mẫu chuẩn Tòa án',
      content: `CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br>Độc lập - Tự do - Hạnh phúc<br><br><strong>ĐƠN KHỞI KIỆN</strong><br>(V/v: Tranh chấp ranh giới quyền sử dụng đất & Yêu cầu công nhận QSDĐ)<br><br><strong>Kính gửi: TÒA ÁN NHÂN DÂN CÓ THẨM QUYỀN</strong><br><br>Người khởi kiện: [Họ và tên người nộp đơn] - Sinh năm: [...]<br>CCCD số: [...] cấp ngày [...] tại [...]<br>Địa chỉ thường trú: [...]<br><br>Người bị kiện: [Họ và tên người bị kiện] - Sinh năm: [...]<br>Địa chỉ thường trú: [...]<br><br><strong>NỘI DUNG VỤ VIỆC:</strong><br>Gia đình tôi là chủ sở hữu hợp pháp thửa đất số [...], tờ bản đồ số [...], diện tích [...] m2 tại địa chỉ [...]. Thửa đất đã được UBND cấp Giấy chứng nhận quyền sử dụng đất số [...] ngày [...].<br>Tuy nhiên, vào khoảng tháng [...] người bị kiện đã có hành vi lấn chiếm diện tích đất ranh giới với kích thước [...]. Mặc dù đã qua hòa giải tại UBND cấp xã nhưng không thành.<br><br><strong>YÊU CẦU TÒA ÁN GIẢI QUYẾT:</strong><br>1. Buộc người bị kiện trả lại diện tích đất lấn chiếm [...] m2.<br>2. Công nhận mốc ranh giới sử dụng đất theo đúng Giấy chứng nhận QSDĐ đã cấp.`
    },
    'Đơn Xin Ly Hôn Mẫu': {
      category: 'Biểu mẫu Hôn nhân & Gia đình',
      content: `CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br>Độc lập - Tự do - Hạnh phúc<br><br><strong>ĐƠN YÊU CẦU CÔNG NHẬN THUẬN TÌNH LY HÔN</strong><br>(Và thỏa thuận về nuôi con, chia tài sản khi ly hôn)<br><br><strong>Kính gửi: TÒA ÁN NHÂN DÂN CÓ THẨM QUYỀN</strong><br><br>Chúng tôi gồm:<br>Chồng: [Họ tên Chồng] - SĐT: [...]<br>Vợ: [Họ tên Vợ] - SĐT: [...]<br><br><strong>NỘI DUNG YÊU CẦU:</strong><br>1. Về quan hệ hôn nhân: Do bất đồng quan điểm sống sâu sắc, mục đích hôn nhân không đạt được. Chúng tôi tự nguyện đề nghị Tòa án giải quyết ly hôn.<br>2. Về con chung: Chúng tôi có 01 con chung. Thỏa thuận để Vợ trực tiếp nuôi dưỡng, Chồng cấp dưỡng [...] VNĐ/tháng.<br>3. Về tài sản chung & Nợ chung: Tự thỏa thuận, không yêu cầu Tòa án giải quyết.`
    },
    'Hợp Đồng Đặt Cọc Mua Bán Nhà Đất': {
      category: 'Hợp đồng mẫu Bất động sản',
      content: `<strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong><br><strong>HỢP ĐỒNG ĐẶT CỌC CHUYỂN NHƯỢNG QSDĐ & TÀI SẢN TRẮNG</strong><br><br>Hôm nay, ngày [...] tháng [...] năm 2026.<br>Tại Văn phòng Công ty Luật Trần Á.<br><br><strong>BÊN A (Bên Đặt Cọc):</strong> [Họ tên người mua] - CCCD: [...]<br><strong>BÊN B (Bên Nhận Đặt Cọc):</strong> [Họ tên người bán] - CCCD: [...]<br><br>Hai bên thống nhất ký kết Hợp đồng đặt cọc để bảo đảm thực hiện hợp đồng chuyển nhượng QSDĐ thửa đất số [...], diện tích [...] m2.<br>- Số tiền đặt cọc: [...] VNĐ.<br>- Phạt cọc: Nếu Bên B từ chối chuyển nhượng phải trả lại tiền cọc và bị phạt gấp 02 lần số tiền cọc.`
    },
    'default': {
      category: 'Tài liệu Pháp lý Trần Á',
      content: `Văn bản chuẩn pháp lý được soạn thảo và kiểm duyệt bởi đội ngũ Luật sư Công ty Luật Trần Á.<br>Quý khách vui lòng liên hệ Zalo <strong>0918.439.995</strong> hoặc gửi yêu cầu để nhận file Word chỉnh sửa (.docx) hoàn toàn miễn phí.`
    }
  };

  function filterDocs() {
    const query = docSearchInput ? docSearchInput.value.toLowerCase().trim() : '';
    const cat = docCategorySelect ? docCategorySelect.value : 'all';

    docCards.forEach(card => {
      const cardCat = card.getAttribute('data-cat');
      const keywords = card.getAttribute('data-keywords').toLowerCase();
      const title = card.querySelector('.doc-title').textContent.toLowerCase();

      const matchCat = (cat === 'all' || cardCat === cat);
      const matchQuery = (query === '' || keywords.includes(query) || title.includes(query));

      if (matchCat && matchQuery) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (docSearchInput) docSearchInput.addEventListener('input', filterDocs);
  if (docCategorySelect) docCategorySelect.addEventListener('change', filterDocs);

  viewDocBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const docKey = btn.getAttribute('data-doc');
      const docData = docDatabase[docKey] || docDatabase['default'];

      if (modalDocTitle) modalDocTitle.textContent = docKey;
      if (modalDocCategory) modalDocCategory.textContent = docData.category;
      if (modalDocPreview) modalDocPreview.innerHTML = docData.content;

      openModal('docViewModal');
    });
  });

  const btnDownloadSim = document.getElementById('btnDownloadSim');
  if (btnDownloadSim) {
    btnDownloadSim.addEventListener('click', () => {
      showToast('Đã bắt đầu tải file mẫu văn bản (.docx) thành công!');
    });
  }

  /* ------------------------------------------------------------------------
   * 6. MODAL SYSTEM & FORM HANDLERS
   * ------------------------------------------------------------------------ */
  const openModalBtns = document.querySelectorAll('.open-modal-btn');
  const closeModalBtns = document.querySelectorAll('.closeModalBtn');
  const modals = document.querySelectorAll('.modal-backdrop');

  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal(modal) {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal');
      const serviceName = btn.getAttribute('data-service');

      if (serviceName) {
        const mService = document.getElementById('mService');
        if (mService) mService.value = serviceName;
      }

      openModal(modalId);
    });
  });

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-backdrop');
      closeModal(modal);
    });
  });

  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Contact Form Submission Handler
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('cName').value;
      const phone = document.getElementById('cPhone').value;
      const service = document.getElementById('cService').value;

      showToast(`Cảm ơn Quý khách ${name}! Đã gửi yêu cầu tư vấn [${service}]. Luật sư Trần Á sẽ liên hệ lại qua SĐT ${phone} ngay lập tức.`);
      contactForm.reset();

      setTimeout(() => {
        window.open(`https://zalo.me/0918439995`, '_blank');
      }, 1500);
    });
  }

  // Modal Consult Form Submission Handler
  const modalConsultForm = document.getElementById('modalConsultForm');
  if (modalConsultForm) {
    modalConsultForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('mName').value;
      const phone = document.getElementById('mPhone').value;
      const modal = document.getElementById('consultModal');

      showToast(`Đã nhận yêu cầu đặt lịch từ Quý khách ${name} (${phone}). Luật sư sẽ xác nhận lịch hẹn trong ít phút.`);
      modalConsultForm.reset();
      closeModal(modal);

      setTimeout(() => {
        window.open(`https://zalo.me/0918439995`, '_blank');
      }, 1500);
    });
  }

  /* ------------------------------------------------------------------------
   * 7. TOAST NOTIFICATION ENGINE
   * ------------------------------------------------------------------------ */
  function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--color-gold-light); font-size: 1.2rem;"></i> <span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

});
