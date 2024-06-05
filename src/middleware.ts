import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getValidSubdomain } from '@/utils/subdomain';
import subdomains from '../subdomains.json'; // Adjust the path to the correct location

const PUBLIC_FILE = /\.(.*)$/;

export const config = {
  matcher: [
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
    "/ico/:path*",
    "/desktop/:path*"
  ],
};

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const host = req.headers.get('host');
  
  // Add null check for host
  if (!host) {
    return NextResponse.next();
  }

  const subdomain = getValidSubdomain(host);

  // Define allowed domains
  const allowedDomains = ["localhost:3000", "prosperadefi.com"];
  const isAllowedDomain = allowedDomains.some((domain: string) => host.includes(domain));

  // If we are on an allowed domain and there is no subdomain, allow the request
  if (isAllowedDomain && !subdomains.some((d: { subdomain: string }) => d.subdomain === subdomain)) {
    return NextResponse.next();
  }

  if (subdomain === 'ico') {
    url.pathname = `/ico${url.pathname}`;
    console.log(`>>> Rewriting: ${req.nextUrl.pathname} to ${url.pathname}`);
    return NextResponse.rewrite(url);
  }

  if (subdomain === 'desktop') {
    url.pathname = `/desktop${url.pathname}`;
    console.log(`>>> Rewriting: ${req.nextUrl.pathname} to ${url.pathname}`);
    return NextResponse.rewrite(url);
  }

  return new Response(null, { status: 404 });
}
