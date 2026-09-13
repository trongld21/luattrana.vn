import { prisma } from '@/lib/prisma';
import { siteUrl } from '@/lib/site';
import { services } from '@/lib/services';
export const dynamic = 'force-dynamic';
export default async function sitemap() {
  const posts = await prisma.post.findMany({ where:{status:'PUBLISHED',publishedAt:{lte:new Date()}},select:{slug:true,updatedAt:true},take:49000 });
  return [
    {url:siteUrl, changeFrequency:'weekly', priority:1},
    {url:`${siteUrl}/bai-viet`, changeFrequency:'weekly', priority:.8},
    ...services.map(service=>({url:`${siteUrl}/linh-vuc/${service.slug}`,changeFrequency:'monthly',priority:.8})),
    {url:`${siteUrl}/chinh-sach-bao-mat`,changeFrequency:'yearly',priority:.2},
    {url:`${siteUrl}/dieu-khoan`,changeFrequency:'yearly',priority:.2},
    ...posts.map(post=>({url:`${siteUrl}/bai-viet/${post.slug}`,lastModified:post.updatedAt,changeFrequency:'monthly',priority:.65}))
  ];
}
