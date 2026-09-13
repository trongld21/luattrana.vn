import test from 'node:test';
import assert from 'node:assert/strict';
import { cleanHtml, safeUrl, payload, slugify } from '../lib/content.mjs';
import { hashPassword, verifyPassword, tokenHash } from '../lib/password.mjs';
test('removes executable HTML and unsafe URL schemes',()=>{
 const clean = cleanHtml('<h2>Luật</h2><script>alert(1)</script><img src="x" onerror="alert(1)"><a href="javascript:alert(1)">link</a><iframe src="https://example.com"></iframe>');
 assert.match(clean, /<h2>Luật<\/h2>/); assert.doesNotMatch(clean, /script|onerror|javascript:|iframe/);
 assert.throws(()=>safeUrl('javascript:alert(1)')); assert.throws(()=>safeUrl('//evil.example'));
 assert.equal(safeUrl('/media/abc'),'/media/abc');
});
test('Vietnamese slug and validation reject invalid publication',()=>{
 assert.equal(slugify('Đất đai & Nhà ở'),'dat-dai-nha-o');
 assert.throws(()=>payload('posts',{title:'test',content:'abc',status:'INVALID'}));
 assert.throws(()=>payload('posts',{title:'test',content:'<script>x</script>',status:'PUBLISHED'}));
 const post=payload('posts',{title:'Đất đai',content:'<p>Hello</p>',status:'DRAFT',id:'injected',publishedAt:'2000-01-01'});
 assert.equal(post.slug,'dat-dai'); assert.equal(post.id,undefined); assert.equal(post.publishedAt,undefined);
});
test('passwords use salted hashes and sessions store only token digests',()=>{
 const one=hashPassword('long-test-password'),two=hashPassword('long-test-password');
 assert.notEqual(one,two); assert.equal(verifyPassword('long-test-password',one),true); assert.equal(verifyPassword('wrong',one),false); assert.equal(tokenHash('secret').length,64);
});
