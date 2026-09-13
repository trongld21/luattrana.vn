import test from 'node:test';
import assert from 'node:assert/strict';
import { allowedScreens, canAccess, staffPayload } from '../lib/permissions.mjs';
test('staff sees only explicitly allowed screens and cannot manage staff',()=>{
 const user={role:'STAFF',isActive:true,permissions:['posts']};
 assert.deepEqual(allowedScreens(user),['posts']);
 for(const screen of ['staff','categories','documents','consultations','media','__proto__'])assert.equal(canAccess(user,screen),false);
 assert.equal(canAccess({...user,isActive:false},'posts'),false);
 assert.deepEqual(allowedScreens({...user,permissions:[]}),[]);
 assert.equal(canAccess({...user,permissions:['staff']},'staff'),false);
});
test('admin retains screens; staff account payload cannot elevate privileges',()=>{
 assert.equal(allowedScreens({role:'ADMIN',isActive:true}).length,6);
 const body={name:'Nhân viên A',email:'STAFF@example.com',password:'long-random-password',permissions:['posts'],isActive:true};
 assert.equal(staffPayload(body,true).email,'staff@example.com');
 assert.throws(()=>staffPayload({...body,role:'ADMIN'},true));
 assert.throws(()=>staffPayload({...body,permissions:['staff']},true));
 assert.throws(()=>staffPayload({...body,password:''},true));
 assert.deepEqual(staffPayload({...body,permissions:['posts','posts']},true).permissions,['posts']);
});
