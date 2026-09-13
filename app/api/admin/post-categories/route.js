import { authorize, apiError } from '@/lib/admin';
import { prisma } from '@/lib/prisma';
export const dynamic = 'force-dynamic';
export async function GET(request) {
 try {
  const denied = await authorize(request,'posts'); if(denied) return denied;
  const page=Math.max(1,parseInt(new URL(request.url).searchParams.get('page')) || 1);
  const [data,total]=await Promise.all([prisma.category.findMany({select:{id:true,name:true},orderBy:{name:'asc'},take:100,skip:(page-1)*100}),prisma.category.count()]);
  return Response.json({data,total},{headers:{'Cache-Control':'no-store'}});
 }catch(error){return apiError(error);}
}
