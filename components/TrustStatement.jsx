export default function TrustStatement() {
  const values = ['Bảo mật thông tin', 'Tư vấn minh bạch', 'Trực tiếp đồng hành', 'Chuyên sâu tranh tụng'];
  return <section className="trust-strip" aria-label="Giá trị của Luật Trần Á"><div className="container trust-inner"><p>Trách nhiệm <i /> Niềm tin</p><ul>{values.map((value, index) => <li key={value}><span>0{index + 1}</span>{value}</li>)}</ul></div></section>;
}
