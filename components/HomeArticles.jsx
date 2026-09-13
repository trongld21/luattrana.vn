'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomeArticles() {
  const [posts, setPosts] = useState([]);
  useEffect(() => { const controller = new AbortController(); fetch('/api/posts?limit=3', { signal: controller.signal }).then(r => r.ok ? r.json() : { data: [] }).then(body => setPosts(body.data || [])).catch(() => {}); return () => controller.abort(); }, []);
  if (!posts.length) return null;
  const [featured, ...rest] = posts;
  return <section className="home-journal"><div className="container"><header className="journal-heading"><div><span className="section-tag">KIẾN THỨC PHÁP LÝ</span><h2 className="section-title">Góc nhìn từ<br /><em>thực tiễn pháp luật.</em></h2></div><Link href="/bai-viet" className="editorial-link">Xem tất cả bài viết <span>↗</span></Link></header><div className="home-journal-grid"><article className="featured-post">{featured.coverUrl && <Link href={`/bai-viet/${featured.slug}`}><img src={featured.coverUrl} alt={featured.coverAlt} loading="lazy" /></Link>}<PostCopy post={featured} /></article><div className="latest-posts">{rest.map(post => <article key={post.id}><PostCopy post={post} /></article>)}</div></div></div></section>;
}
function PostCopy({ post }) { return <div className="post-copy"><small>{post.category?.name || 'Kiến thức pháp lý'} · {new Date(post.publishedAt).toLocaleDateString('vi-VN')}</small><h3><Link href={`/bai-viet/${post.slug}`}>{post.title}</Link></h3><p>{post.excerpt}</p><Link className="editorial-link" href={`/bai-viet/${post.slug}`}>Đọc bài viết <span>↗</span></Link></div>; }
