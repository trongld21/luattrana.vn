import { currentAdmin } from '@/lib/admin';
export const dynamic = 'force-dynamic';
export async function GET() {
 const user = await currentAdmin();
 return Response.json(user ? { user } : { error:'Vui lòng đăng nhập.' },{status:user?200:401,headers:{'Cache-Control':'no-store'}});
}
