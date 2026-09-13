import { authorize, apiError } from '@/lib/admin';
import { prisma } from '@/lib/prisma';
import { staffPayload } from '@/lib/permissions.mjs';
import { hashPassword } from '@/lib/password.mjs';
import { staffSelect } from '@/lib/staff';
export const dynamic = 'force-dynamic';
export async function GET(request) {
 try {
  const denied=await authorize(request,'staff'); if(denied)return denied;
  const url=new URL(request.url),q=(url.searchParams.get('q')||'').slice(0,200),page=Math.max(1,parseInt(url.searchParams.get('page'))||1);
  const where=q?{OR:[{name:{contains:q,mode:'insensitive'}},{email:{contains:q,mode:'insensitive'}}]}:{};
  const [data,total]=await Promise.all([prisma.adminUser.findMany({where,select:staffSelect,orderBy:{createdAt:'desc'},take:20,skip:(page-1)*20}),prisma.adminUser.count({where})]);
  return Response.json({data,total,page},{headers:{'Cache-Control':'no-store'}});
 }catch(error){return apiError(error);}
}
export async function POST(request) {
 try {
  const denied=await authorize(request,'staff'); if(denied)return denied;
  let data;try{data=staffPayload(await request.json(),true);}catch(error){return Response.json({error:error.message},{status:400});}
  const {password,...fields}=data;
  const user=await prisma.adminUser.create({data:{...fields,role:'STAFF',passwordHash:hashPassword(password)},select:staffSelect});
  return Response.json({data:user},{status:201});
 }catch(error){if(error.code==='P2002')return Response.json({error:'Email này đã được sử dụng.'},{status:409});return apiError(error);}
}
