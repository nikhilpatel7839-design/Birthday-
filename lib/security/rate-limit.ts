import { cookies } from 'next/headers';

export function getRateLimitKey(prefix: string, identifier: string) {
  return `${prefix}:${identifier}`;
}

export function getRequestIp() {
  const cookieStore = cookies();
  return cookieStore.get('x-forwarded-for')?.value || 'unknown';
}
