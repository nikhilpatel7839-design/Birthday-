import { createServerClient } from '@supabase/ssr';

export function getSupabaseRouteClient(request: Request) {
  const url = new URL(request.url);
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => [],
        setAll: () => undefined
      },
      global: {
        headers: { origin: url.origin }
      }
    }
  );
}
