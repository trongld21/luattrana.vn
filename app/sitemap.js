import { prisma } from '@/lib/prisma';
import { siteUrl } from '@/lib/site';
export const dynamic = 'force-dynamic';
export default async function sitemap() {
  const posts = await prisma.post.findMany({ where:{status:'PUBLISHED',publishedAt:{lte:new Date()}},select:{slug:true,updatedAt:true},take:49000 });
  return [{url:siteUrl},{url:`${siteUrl}/bai-viet`},...posts.map(post=>({url:`${siteUrl}/bai-viet/${post.slug}`,lastModified:post.updatedAt}))];
}
