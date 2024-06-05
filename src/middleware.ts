import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import subdomains from '../subdomains.json';

const PUBLIC_FILE = /\.(.*)$/;

export const config = {
  matcher: [
    '/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const host = req.headers.get('host');

  if (!host) {
    return NextResponse.next();
  }

  const subdomain = host.split('.')[0];
  const allowedDomains = ['localhost:3000', 'prosperadefi.com'];
  const isAllowedDomain = allowedDomains.some(domain => host.includes(domain));

  if (isAllowedDomain && !subdomains.some(d => d.subdomain === subdomain)) {
    return NextResponse.next();
  }

  const subdomainData = subdomains.find(d => d.subdomain === subdomain);

  if (subdomainData) {
    url.pathname = `/${subdomain}${url.pathname}`;
    console.log(`>>> Rewriting: ${req.nextUrl.pathname} to ${url.pathname}`);
    return NextResponse.rewrite(url);
  }

  return new Response(null, { status: 404 });
}
