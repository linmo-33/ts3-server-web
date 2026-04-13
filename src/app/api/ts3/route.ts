import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';
import { ensureTS3SamplerStarted, refreshTS3Data } from '@/lib/ts3-data';

function shouldTrustProxyHeaders(): boolean {
  return ['1', 'true', 'yes', 'on'].includes(
    (process.env.TRUST_PROXY_HEADERS || 'false').trim().toLowerCase()
  );
}

function createRequestFingerprint(request: NextRequest): string {
  const fingerprintSource = [
    request.headers.get('user-agent') ?? 'unknown-agent',
    request.headers.get('accept-language') ?? 'unknown-language',
  ].join('|');

  let hash = 0;

  for (let index = 0; index < fingerprintSource.length; index += 1) {
    hash = (hash * 31 + fingerprintSource.charCodeAt(index)) >>> 0;
  }

  return `fp:${hash.toString(36)}`;
}

function getTrustedProxyIP(request: NextRequest): string | null {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const realIp = request.headers.get('x-real-ip')?.trim();
  const vercelIp = request.headers.get('x-vercel-forwarded-for')?.trim();
  const cloudflareIp = request.headers.get('cf-connecting-ip')?.trim();

  return forwarded || realIp || vercelIp || cloudflareIp || null;
}

function getRateLimitKey(request: NextRequest): string {
  if (shouldTrustProxyHeaders()) {
    const trustedIP = getTrustedProxyIP(request);

    if (trustedIP) {
      return `ip:${trustedIP}`;
    }
  }

  return createRequestFingerprint(request);
}

export async function GET(request: NextRequest) {
  ensureTS3SamplerStarted();

  const rateLimitKey = getRateLimitKey(request);
  const { allowed, remaining } = checkRateLimit(rateLimitKey);

  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429, headers: { 'X-RateLimit-Remaining': '0' } }
    );
  }

  const jsonResponse = (data: unknown, status = 200) => {
    return NextResponse.json(data, {
      status,
      headers: { 'X-RateLimit-Remaining': String(remaining) }
    });
  };

  try {
    const allData = await refreshTS3Data();

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    switch (type) {
      case 'serverinfo':
        return jsonResponse(allData.server);
      case 'clientlist':
        return jsonResponse(allData.clients);
      case 'channellist':
        return jsonResponse(allData.channels);
      case 'all':
        return jsonResponse(allData);
      case 'history':
        return jsonResponse(allData.history);
      default:
        return jsonResponse({ error: 'Invalid type parameter' }, 400);
    }
  } catch (error) {
    console.error('TS3 Query Error:', error);
    return jsonResponse(
      {
        error: 'TS3 Query failed',
        message: 'Unable to load server data right now.',
      },
      500
    );
  }
}
