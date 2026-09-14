import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { canAccess } from '@/lib/permissions.mjs';
import { currentAdmin } from '@/lib/admin';
import { cleanHtml, slugify } from '@/lib/content.mjs';
import { siteUrl } from '@/lib/site';
import PublicShell from '@/components/PublicShell';
import '../posts.css';
export const dynamic = 'force-dynamic';
function prepareArticle(value) {
  const headings = [];
  const used = new Map();
  const html = cleanHtml(value).replace(/<h2>([\s\S]*?)<\/h2>/gi, (match, inner) => {
    const label = inner.replace(/<[^>]+>/g, '').trim();
    const base = slugify(label) || 'noi-dung';
    const count = used.get(base) || 0;
    used.set(base, count + 1);
    const id = count ? `${base}-${count + 1}` : base;
    headings.push({ id, label });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { html, headings };
}
async function findPost(slug, preview) {
  const admin = preview === '1' && canAccess(await currentAdmin(), 'posts');
  return prisma.post.findFirst({ where: { slug, ...(!admin ? { status: 'PUBLISHED', publishedAt: { lte: new Date() } } : {}) }, include: { category:true } });
}
export async function generateMetadata({ params, searchParams }) {
  params = await params; searchParams = await searchParams;
  const post = await findPost(params.slug, searchParams.preview);
  if (!post) return { title:'Không tìm thấy bài viết',robots:{index:false} };
  return { title:post.seoTitle || post.title, description:post.seoDescription || post.excerpt, alternates:{canonical:`${siteUrl}/bai-viet/${post.slug}`}, robots: searchParams.preview ? { index:false,follow:false } : { index:true,follow:true }, openGraph:{type:'article', title:post.seoTitle || post.title, description:post.seoDescription || post.excerpt, url:`${siteUrl}/bai-viet/${post.slug}`, images:post.coverUrl ? [new URL(post.coverUrl,siteUrl).href] : [],publishedTime:post.publishedAt?.toISOString(),modifiedTime:post.updatedAt.toISOString()} };
}
export default async function Article({params, searchParams}) {
  params = await params; searchParams = await searchParams;
  const post = await findPost(params.slug,searchParams.preview); if (!post) notFound();
  const article = prepareArticle(post.content);
  const related = await prisma.post.findMany({ where:{id:{not:post.id},status:'PUBLISHED',publishedAt:{lte:new Date()},...(post.categoryId ? {categoryId:post.categoryId}:{})},orderBy:{publishedAt:'desc'},take:3,include:{category:true} });
  const schema = {'@context':'https://schema.org','@type':'Article',headline:post.title,description:post.seoDescription || post.excerpt,datePublished:post.publishedAt?.toISOString(),dateModified:post.updatedAt.toISOString(),author:{'@type':'Organization',name:'Công ty Luật Trần Á'},mainEntityOfPage:`${siteUrl}/bai-viet/${post.slug}`,...(post.coverUrl ? {image:new URL(post.coverUrl,siteUrl).href}: {})};
  return <PublicShell><main className="journal article-page"><nav><Link href="/bai-viet">← Kiến thức pháp lý</Link><Link href="/">Luật Trần Á</Link></nav>{searchParams.preview && <p className="preview-banner">Bản xem trước dành cho quản trị viên · {post.status === 'DRAFT' ? 'Chưa xuất bản' : 'Đã xuất bản'}</p>}<header><span>{post.category?.name || 'KIẾN THỨC PHÁP LÝ'}</span><h1>{post.title}</h1><p>{post.excerpt}</p><small>Luật Trần Á · {post.publishedAt?.toLocaleDateString('vi-VN') || 'Bản nháp'}</small></header>{post.coverUrl && <img className="article-cover" src={post.coverUrl} alt={post.coverAlt || post.title} />}<div className="article-layout">{article.headings.length > 1 && <aside className="article-toc"><span>TRONG BÀI VIẾT</span><ol>{article.headings.map(item=><li key={item.id}><a href={`#${item.id}`}>{item.label}</a></li>)}</ol></aside>}<article className="article-content" dangerouslySetInnerHTML={{__html:article.html}} /></div><aside className="article-cta"><h2>Bạn cần trao đổi về trường hợp của mình?</h2><p>Liên hệ Luật Trần Á để được tư vấn dựa trên hồ sơ cụ thể.</p><a href="tel:0939369489">Gọi 0939 369 489 ↗</a></aside>{related.length > 0 && <section className="related-posts"><span>ĐỌC TIẾP</span><h2>Nội dung liên quan</h2><div>{related.map(item=><article key={item.id}><small>{item.category?.name || 'Kiến thức pháp lý'}</small><h3><Link href={`/bai-viet/${item.slug}`}>{item.title}</Link></h3><Link href={`/bai-viet/${item.slug}`}>Đọc bài viết ↗</Link></article>)}</div></section>}<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}} /></main></PublicShell>;
}
