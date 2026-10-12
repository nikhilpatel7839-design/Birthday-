import { z } from 'zod';

export const inviteCustomerSchema = z.object({
  email: z.string().email().max(255),
  websiteId: z.string().uuid(),
  message: z.string().max(500).optional()
});

export const acceptInviteSchema = z.object({
  token: z.string().min(32),
  password: z.string().min(8).max(255)
});

export const updateProfileSchema = z.object({
  displayName: z.string().min(2).max(80)
});
