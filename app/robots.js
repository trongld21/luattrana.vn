import { siteUrl } from '@/lib/site';
export default function robots(){return {rules:{userAgent:'*',allow:'/',disallow:['/admin','/api/','/*?preview=']},sitemap:`${siteUrl}/sitemap.xml`};}
