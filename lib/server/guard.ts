import { NextResponse } from 'next/server';

export async function withAuthGuard(req: Request, handler: () => Promise<NextResponse>) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return handler();
}
