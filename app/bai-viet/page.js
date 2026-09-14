import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { siteUrl } from '@/lib/site';
import PublicShell from '@/components/PublicShell';
import './posts.css';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Kiến thức pháp lý | Luật Trần Á', description: 'Bài viết, chia sẻ kiến thức và thông tin pháp lý từ Luật Trần Á.', alternates: { canonical: `${siteUrl}/bai-viet` } };

function PostMeta({ post }) {
  return <small>{post.category?.name || 'Kiến thức pháp lý'} · {post.publishedAt.toLocaleDateString('vi-VN')}</small>;
}

export default async function Posts({ searchParams }) {
  searchParams = await searchParams;
  const page = Math.max(1, Math.min(10000, parseInt(searchParams.page) || 1));
  const q = String(searchParams.q || '').slice(0, 200);
  const category = String(searchParams.category || '').slice(0, 180);
  const where = { status: 'PUBLISHED', publishedAt: { lte: new Date() }, ...(q ? { title: { contains: q, mode: 'insensitive' } } : {}), ...(category ? { category: { slug: category } } : {}) };
  const [posts, total, categories] = await Promise.all([
    prisma.post.findMany({ where, orderBy: { publishedAt: 'desc' }, skip: (page - 1) * 9, take: 9, include: { category: true } }),
    prisma.post.count({ where }), prisma.category.findMany({ orderBy: { name: 'asc' } })
  ]);
  const showFeatured = page === 1 && !q && !category && posts.length > 0;
  const featured = showFeatured ? posts[0] : null;
  const list = showFeatured ? posts.slice(1) : posts;
  const pageUrl = value => `/bai-viet?${new URLSearchParams({ q, category, page: String(value) })}`;

  return <PublicShell><main className="journal">
    <nav aria-label="Điều hướng phụ"><Link href="/">← Luật Trần Á</Link><a href="tel:0939369489">Tư vấn: 0939 369 489</a></nav>
    <header><span>GÓC NHÌN & KIẾN THỨC</span><h1>Hiểu luật.<br /><em>Vững niềm tin.</em></h1><p>Phân tích pháp lý thực tiễn, được trình bày rõ ràng để bạn có cơ sở đưa ra quyết định.</p></header>
    <form className="journal-search"><input name="q" aria-label="Tìm bài viết" placeholder="Tìm bài viết…" defaultValue={q} /><select name="category" aria-label="Danh mục" defaultValue={category}><option value="">Tất cả danh mục</option>{categories.map(item => <option value={item.slug} key={item.id}>{item.name}</option>)}</select><button>Tìm kiếm</button></form>
    {featured && <article className="journal-featured">{featured.coverUrl && <Link href={`/bai-viet/${featured.slug}`}><img src={featured.coverUrl} alt={featured.coverAlt || featured.title} /></Link>}<div><PostMeta post={featured} /><h2><Link href={`/bai-viet/${featured.slug}`}>{featured.title}</Link></h2><p>{featured.excerpt}</p><Link className="read-link" href={`/bai-viet/${featured.slug}`}>Đọc phân tích <span>↗</span></Link></div></article>}
    {list.length > 0 && <><div className="journal-list-heading"><span>BÀI VIẾT MỚI</span><p>{total} nội dung đang được xuất bản</p></div><div className="journal-grid">{list.map(post => <article key={post.id}>{post.coverUrl && <Link href={`/bai-viet/${post.slug}`}><img src={post.coverUrl} alt={post.coverAlt || post.title} loading="lazy" /></Link>}<div><PostMeta post={post} /><h2><Link href={`/bai-viet/${post.slug}`}>{post.title}</Link></h2><p>{post.excerpt}</p><Link className="read-link" href={`/bai-viet/${post.slug}`}>Đọc bài viết <span>↗</span></Link></div></article>)}</div></>}
    {!posts.length && <div className="journal-empty"><span>Không tìm thấy nội dung</span><p>Hãy thử từ khóa khác hoặc chọn tất cả danh mục.</p><Link href="/bai-viet">Xem toàn bộ bài viết</Link></div>}
    <footer>{page > 1 && <Link href={pageUrl(page - 1)}>← Trang trước</Link>}<span>Trang {page} / {Math.max(1, Math.ceil(total / 9))}</span>{page * 9 < total && <Link href={pageUrl(page + 1)}>Trang tiếp →</Link>}</footer>
  </main></PublicShell>;
}
