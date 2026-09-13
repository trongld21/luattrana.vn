import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../lib/password.mjs';
const prisma=new PrismaClient(),base=process.env.TEST_BASE_URL || 'http://localhost:3011',prefix=`rbac-${Date.now()}`,password=randomBytes(24).toString('hex');
let admin,staff,post,adminCookie='',staffCookie='';
async function req(path,method='GET',body,cookie=adminCookie){return fetch(base+path,{method,headers:{Origin:process.env.SITE_URL || base,...(cookie?{Cookie:cookie}:{}),...(body?{'Content-Type':'application/json'}:{})},body:body?JSON.stringify(body):undefined,redirect:'manual'});}
async function login(email){const r=await req('/api/admin/login','POST',{email,password},'');assert.equal(r.status,200);return r.headers.get('set-cookie').split(';')[0];}
async function data(path,method,body,status=200,cookie=adminCookie){const r=await req(path,method,body,cookie);const j=await r.json();assert.equal(r.status,status,JSON.stringify(j));return j.data;}
try{
 admin=await prisma.adminUser.create({data:{name:prefix,email:`${prefix}-admin@example.invalid`,passwordHash:hashPassword(password),role:'ADMIN'}});adminCookie=await login(admin.email);
 const fields={name:'Nhân viên A',email:`${prefix}-staff@example.invalid`,password,isActive:true,permissions:['posts']};
 staff=await data('/api/admin/staff','POST',fields,201);assert.equal(staff.role,'STAFF');assert.equal(staff.passwordHash,undefined);staffCookie=await login(staff.email);
 const list=await (await req('/api/admin/staff')).json();assert.ok(list.data.every(user=>!('passwordHash'in user)));
 for(const resource of ['staff','categories','documents','consultations','media'])for(const [method,suffix,body] of [['GET','',null],['POST','',{}],['PUT','/missing',{}],['DELETE','/missing',null]])assert.equal((await req(`/api/admin/${resource}${suffix}`,method,body,staffCookie)).status,403,`${resource} ${method}`);
 assert.equal((await req('/api/consultations','GET',null,staffCookie)).status,403);
 assert.equal((await req('/api/admin/post-categories','GET',null,staffCookie)).status,200);
 const screen=await (await req('/admin','GET',null,staffCookie)).text();assert.match(screen,/Bài viết SEO/);assert.doesNotMatch(screen,/>Nhân sự &amp; phân quyền<|>Yêu cầu tư vấn<|>Thư viện ảnh</);
 post=await data('/api/admin/posts','POST',{title:prefix,slug:prefix,content:'<p>Test permission</p>',status:'DRAFT'},201,staffCookie);
 assert.equal((await req(`/bai-viet/${post.slug}?preview=1`,'GET',null,staffCookie)).status,200);
 assert.equal((await req('/api/admin/staff','POST',{...fields,email:`${prefix}-evil@example.invalid`,role:'ADMIN'})).status,400);
 assert.equal((await req(`/api/admin/staff/${admin.id}`,'PUT',fields)).status,403);
 assert.equal((await req(`/api/admin/staff/${admin.id}`,'DELETE')).status,404);
 staff=await data(`/api/admin/staff/${staff.id}`,'PUT',{...fields,password:'',permissions:['documents']});
 assert.equal((await req('/api/admin/posts','GET',null,staffCookie)).status,401);staffCookie=await login(staff.email);
 assert.equal((await req('/api/admin/posts','GET',null,staffCookie)).status,403);
 assert.equal((await req(`/bai-viet/${post.slug}?preview=1`,'GET',null,staffCookie)).status,404);
 staff=await data(`/api/admin/staff/${staff.id}`,'PUT',{...fields,password:'',permissions:[]});staffCookie=await login(staff.email);
 assert.match(await (await req('/admin','GET',null,staffCookie)).text(),/Chưa được cấp quyền truy cập/);
 staff=await data(`/api/admin/staff/${staff.id}`,'PUT',{...fields,password:'',isActive:false});
 assert.equal((await req('/api/admin/me','GET',null,staffCookie)).status,401);
 assert.equal((await req('/api/admin/login','POST',{email:staff.email,password},'')).status,401);
 assert.equal((await req(`/api/admin/staff/${staff.id}`,'DELETE')).status,200);
 console.log('PASS: staff creation, screen/API isolation, post editing, draft preview, no escalation, session revocation, empty permissions, disabled account, deletion.');
}finally{
 if(post)await prisma.post.deleteMany({where:{id:post.id}});
 if(staff)await prisma.adminUser.deleteMany({where:{id:staff.id}});
 if(admin)await prisma.adminUser.deleteMany({where:{id:admin.id}});
 await prisma.$disconnect();
}
