import { z } from 'zod';

export const publicWebsiteResponseSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  title: z.string(),
  status: z.enum(['published', 'draft', 'unpublished']),
  content: z.any(),
  published_at: z.string().datetime().nullable().optional()
});
