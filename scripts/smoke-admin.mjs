// Run against an isolated local production server after migrations.
// Creates uniquely named fixtures and always removes its own records.
import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../lib/password.mjs';
const prisma=new PrismaClient(),base=process.env.TEST_BASE_URL || 'http://localhost:3010';
const prefix=`cms-test-${Date.now()}`,password=randomBytes(24).toString('hex');
let cookie='',user,post,category,media,document,consultation;
async function request(path,method='GET',body,authenticated=true,origin=process.env.SITE_URL || base){
 const headers={Origin:origin,...(authenticated&&cookie?{Cookie:cookie}:{})};
 if(body && !(body instanceof FormData))headers['Content-Type']='application/json';
 return fetch(base+path,{method,headers,body:body instanceof FormData?body:body?JSON.stringify(body):undefined,redirect:'manual'});
}
async function json(path,method,body,status=200){const response=await request(path,method,body);const data=await response.json();assert.equal(response.status,status,JSON.stringify(data));return data.data;}
try{
 user=await prisma.adminUser.create({data:{email:`${prefix}@example.invalid`,passwordHash:hashPassword(password)}});
 assert.equal((await request('/api/admin/posts')).status,401);
 assert.equal((await request('/api/consultations')).status,401);
 assert.equal((await request('/admin')).status,307);
 let response=await request('/api/admin/login','POST',{email:user.email,password},false,'https://invalid.example');assert.equal(response.status,403);
 response=await request('/api/admin/login','POST',{email:user.email,password});assert.equal(response.status,200);
 cookie=response.headers.get('set-cookie').split(';')[0];assert.match(response.headers.get('set-cookie'),/HttpOnly/i);
 category=await json('/api/admin/categories','POST',{name:prefix,slug:prefix},201);
 post=await json('/api/admin/posts','POST',{title:prefix,slug:prefix,content:'<h2>Test</h2><script>alert(1)</script><p>Content</p>',status:'DRAFT',categoryId:category.id},201);
 assert.doesNotMatch(post.content,/script/);
 assert.equal((await request(`/bai-viet/${post.slug}`,'GET',null,false)).status,404);
 assert.equal((await request(`/bai-viet/${post.slug}?preview=1`,'GET',null,false)).status,404);
 assert.equal((await request(`/bai-viet/${post.slug}?preview=1`)).status,200);
 assert.equal((await request('/api/admin/posts','POST',{...post},true,'https://invalid.example')).status,403);
 post=await json(`/api/admin/posts/${post.id}`,'PUT',{...post,status:'PUBLISHED'});
 response=await request(`/bai-viet/${post.slug}`,'GET',null,false);assert.equal(response.status,200);const html=await response.text();assert.match(html,/application\/ld\+json/);
 assert.ok((await (await request('/sitemap.xml','GET',null,false)).text()).includes(post.slug));
 assert.equal((await request('/api/admin/posts','POST',{...post})).status,409);
 const bad=new FormData();bad.append('file',new Blob(['<svg onload=alert(1)>'],{type:'image/svg+xml'}),'bad.svg');assert.equal((await request('/api/admin/media','POST',bad)).status,400);
 const form=new FormData();form.append('file',new Blob([Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jhXcAAAAASUVORK5CYII=','base64')],{type:'image/png'}),'test.png');
 media=await json('/api/admin/media','POST',form,201);
 assert.equal((await request(media.url,'GET',null,false)).headers.get('content-type'),'image/png');
 post=await json(`/api/admin/posts/${post.id}`,'PUT',{...post,coverUrl:media.url});
 assert.equal((await request(`/api/admin/media/${media.id}`,'DELETE')).status,409);
 document=await json('/api/admin/documents','POST',{title:prefix,category:'bieumau',content:'<p>Test</p>'},201);
 assert.ok((await (await request(`/api/documents?q=${prefix}`,'GET',null,false)).json()).data.some(item=>item.id===document.id));
 consultation=await json('/api/admin/consultations','POST',{name:prefix,phone:'0912345678',status:'PENDING'},201);
 consultation=await json(`/api/admin/consultations/${consultation.id}`,'PUT',{...consultation,status:'COMPLETED'});
 assert.equal(consultation.status,'COMPLETED');
 for(const [resource,item] of [['posts',post],['categories',category],['documents',document],['consultations',consultation],['media',media]])assert.equal((await request(`/api/admin/${resource}/${item.id}`,'DELETE')).status,200);
 const nextPassword=randomBytes(24).toString('hex');
 assert.equal((await request('/api/admin/password','POST',{currentPassword:password,newPassword:nextPassword})).status,200);
 assert.equal((await request('/api/admin/posts')).status,401);
 response=await request('/api/admin/login','POST',{email:user.email,password:nextPassword});assert.equal(response.status,200);cookie=response.headers.get('set-cookie').split(';')[0];
 assert.equal((await request('/api/admin/logout','POST')).status,200);
 assert.equal((await request('/api/admin/posts')).status,401);
 for(let i=0;i<5;i++)assert.equal((await request('/api/admin/login','POST',{email:user.email,password:'wrong-password'})).status,401);
 assert.equal((await request('/api/admin/login','POST',{email:user.email,password:nextPassword})).status,429);
 console.log('PASS: password change, session revocation, account lock, invalid image rejection; login/logout, authorization, CSRF, CRUD, draft privacy, SEO, sitemap, image validation and references.');
}finally{
 for(const [model,item] of [[prisma.post,post],[prisma.category,category],[prisma.legalDocument,document],[prisma.consultation,consultation],[prisma.media,media],[prisma.adminUser,user]])if(item)await model.deleteMany({where:{id:item.id}});
 await prisma.$disconnect();
}
