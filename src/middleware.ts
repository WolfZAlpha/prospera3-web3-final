import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getValidSubdomain } from '@/utils/subdomain';

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (PUBLIC_FILE.test(url.pathname) || url.pathname.includes('_next')) return NextResponse.next();

  const host = req.headers.get('host');
  const subdomain = getValidSubdomain(host);

  if (subdomain === 'ico') {
    url.pathname = `/ico${url.pathname}`;
    console.log(`>>> Rewriting: ${req.nextUrl.pathname} to ${url.pathname}`);
  }

  if (subdomain === 'desktop') {
    url.pathname = `/desktop${url.pathname}`;
    console.log(`>>> Rewriting: ${req.nextUrl.pathname} to ${url.pathname}`);
  }

  return NextResponse.rewrite(url);
}
