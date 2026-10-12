import { z } from 'zod';

export const websiteCreateSchema = z.object({
  title: z.string().min(1).max(180),
  slug: z.string().trim().min(3).max(80).regex(/^[a-z0-9-]+$/),
  templateId: z.string().uuid().optional(),
  ownerId: z.string().uuid().optional()
});

export const websiteUpdateSchema = z.object({
  title: z.string().min(1).max(180).optional(),
  slug: z.string().trim().min(3).max(80).regex(/^[a-z0-9-]+$/).optional(),
  status: z.enum(['draft', 'published', 'unpublished', 'archived']).optional()
});
