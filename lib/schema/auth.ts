import { z } from 'zod';

export const customerInviteSchema = z.object({
  email: z.string().email().max(255),
  websiteId: z.string().uuid().optional(),
  message: z.string().max(500).optional()
});

export const profileUpdateSchema = z.object({
  displayName: z.string().min(2).max(80)
});
