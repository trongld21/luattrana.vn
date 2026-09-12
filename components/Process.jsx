export default function Process() {
  return <section className="process-section" id="process" aria-labelledby="process-title"><div className="container">
    <div className="process-heading"><div className="section-tag">RÕ RÀNG TỪ BƯỚC ĐẦU TIÊN</div><h2 className="section-title" id="process-title">Một hành trình.<br /><em>Luôn có người đồng hành.</em></h2></div>
    <div className="process-grid">{[
      ['01', 'Lắng nghe & thấu hiểu', 'Chia sẻ câu chuyện, nhu cầu và hồ sơ của bạn trong một cuộc trao đổi bảo mật.'],
      ['02', 'Phân tích & định hướng', 'Luật sư đánh giá hồ sơ, trao đổi phương án, phạm vi công việc và chi phí dự kiến.'],
      ['03', 'Đồng hành & giải quyết', 'Triển khai phương án đã thống nhất, cập nhật tiến độ và hỗ trợ trong suốt quá trình.']
    ].map(([number, title, description]) => <article className="process-step" key={number}><span className="process-number">{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
  </div></section>;
}
