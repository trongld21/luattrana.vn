import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { siteUrl } from '@/lib/site';
import './posts.css';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Kiến thức pháp lý | Luật Trần Á', description: 'Bài viết, chia sẻ kiến thức và thông tin pháp lý từ Luật Trần Á.', alternates: { canonical: `${siteUrl}/bai-viet` } };
export default async function Posts({ searchParams }) {
  searchParams = await searchParams;
  const page = Math.max(1,Math.min(10000,parseInt(searchParams.page) || 1));
  const q = String(searchParams.q || '').slice(0,200), category = searchParams.category || '';
  const where = { status: 'PUBLISHED', publishedAt: { lte: new Date() }, ...(q ? { title: { contains: q, mode: 'insensitive' } } : {}), ...(category ? { category: { slug: category } } : {}) };
  const [posts,total,categories] = await Promise.all([prisma.post.findMany({ where, orderBy:{publishedAt:'desc'},skip:(page-1)*9,take:9,include:{category:true} }),prisma.post.count({where}),prisma.category.findMany({orderBy:{name:'asc'}})]);
  const pageUrl = value => `/bai-viet?${new URLSearchParams({ q, category, page:String(value) })}`;
  return <main className="journal"><nav><Link href="/">← Luật Trần Á</Link><a href="tel:0918439995">Tư vấn: 0918.439.995</a></nav><header><span>GÓC NHÌN & KIẾN THỨC</span><h1>Hiểu luật.<br /><em>Vững niềm tin.</em></h1><p>Thông tin và kiến thức pháp lý dành cho bạn.</p></header><form className="journal-search"><input name="q" aria-label="Tìm bài viết" placeholder="Tìm bài viết…" defaultValue={q} /><select name="category" aria-label="Danh mục" defaultValue={category}><option value="">Tất cả danh mục</option>{categories.map(item=><option value={item.slug} key={item.id}>{item.name}</option>)}</select><button>Tìm kiếm</button></form><div className="journal-grid">{posts.map(post=><article key={post.id}>{post.coverUrl && <Link href={`/bai-viet/${post.slug}`}><img src={post.coverUrl} alt={post.coverAlt} loading="lazy" /></Link>}<div><small>{post.category?.name || 'Kiến thức pháp lý'} · {post.publishedAt.toLocaleDateString('vi-VN')}</small><h2><Link href={`/bai-viet/${post.slug}`}>{post.title}</Link></h2><p>{post.excerpt}</p><Link href={`/bai-viet/${post.slug}`}>Đọc bài viết ↗</Link></div></article>)}</div>{!posts.length && <p>Chưa có bài viết phù hợp.</p>}<footer>{page>1 && <Link href={pageUrl(page-1)}>← Trang trước</Link>}<span>Trang {page} / {Math.max(1,Math.ceil(total/9))}</span>{page*9<total && <Link href={pageUrl(page+1)}>Trang tiếp →</Link>}</footer></main>;
}
