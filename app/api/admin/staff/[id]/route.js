import { authorize, apiError } from '@/lib/admin';
import { prisma } from '@/lib/prisma';
import { staffPayload } from '@/lib/permissions.mjs';
import { hashPassword } from '@/lib/password.mjs';
import { staffSelect } from '@/lib/staff';
export async function PUT(request,{params}) {
 try {
  const denied=await authorize(request,'staff');if(denied)return denied;
  const {id}=await params;
  let data;try{data=staffPayload(await request.json());}catch(error){return Response.json({error:error.message},{status:400});}
  const {password,...fields}=data;
  const result=await prisma.$transaction(async tx=>{
   const current=await tx.adminUser.findUnique({where:{id}});
   if(!current)return {error:'Không tìm thấy tài khoản.',status:404};
   if(current.role!=='STAFF')return {error:'Màn này chỉ được chỉnh sửa tài khoản nhân viên.',status:403};
   const user=await tx.adminUser.update({where:{id},data:{...fields,...(password?{passwordHash:hashPassword(password),failedAttempts:0,lockedUntil:null}:{})},select:staffSelect});
   await tx.adminSession.deleteMany({where:{userId:id}});
   return {data:user};
  });
  return Response.json(result,{status:result.status||200});
 }catch(error){if(error.code==='P2002')return Response.json({error:'Email này đã được sử dụng.'},{status:409});return apiError(error);}
}
export async function DELETE(request,{params}) {
 try{
  const denied=await authorize(request,'staff');if(denied)return denied;
  const {id}=await params;
  const result=await prisma.adminUser.deleteMany({where:{id,role:'STAFF'}});
  return result.count?Response.json({success:true}):Response.json({error:'Không tìm thấy nhân viên hoặc tài khoản quản trị được bảo vệ.'},{status:404});
 }catch(error){return apiError(error);}
}
