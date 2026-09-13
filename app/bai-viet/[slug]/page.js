import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { currentAdmin } from '@/lib/admin';
import { cleanHtml } from '@/lib/content.mjs';
import { siteUrl } from '@/lib/site';
import '../posts.css';
export const dynamic = 'force-dynamic';
async function findPost(slug, preview) {
  const admin = preview === '1' && await currentAdmin();
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
  const schema = {'@context':'https://schema.org','@type':'Article',headline:post.title,description:post.seoDescription || post.excerpt,datePublished:post.publishedAt?.toISOString(),dateModified:post.updatedAt.toISOString(),author:{'@type':'Organization',name:'Công ty Luật Trần Á'},mainEntityOfPage:`${siteUrl}/bai-viet/${post.slug}`,...(post.coverUrl ? {image:new URL(post.coverUrl,siteUrl).href}: {})};
  return <main className="journal article-page"><nav><Link href="/bai-viet">← Kiến thức pháp lý</Link><Link href="/">Luật Trần Á</Link></nav>{searchParams.preview && <p className="preview-banner">Bản xem trước dành cho quản trị viên · {post.status === 'DRAFT' ? 'Chưa xuất bản' : 'Đã xuất bản'}</p>}<header><span>{post.category?.name || 'KIẾN THỨC PHÁP LÝ'}</span><h1>{post.title}</h1><p>{post.excerpt}</p><small>Luật Trần Á · {post.publishedAt?.toLocaleDateString('vi-VN') || 'Bản nháp'}</small></header>{post.coverUrl && <img className="article-cover" src={post.coverUrl} alt={post.coverAlt} />}<article className="article-content" dangerouslySetInnerHTML={{__html:cleanHtml(post.content)}} /><aside className="article-cta"><h2>Bạn cần trao đổi về trường hợp của mình?</h2><p>Liên hệ Luật Trần Á để được tư vấn dựa trên hồ sơ cụ thể.</p><a href="tel:0918439995">Gọi 0918.439.995 ↗</a></aside><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}} /></main>;
}
