import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.pathname.split('/').at(-1);

  return NextResponse.json({
    success: true,
    slug,
    message: 'Public website placeholder endpoint'
  });
}
