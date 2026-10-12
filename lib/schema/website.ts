import { z } from 'zod';

export const websiteContentSchema = z.object({
  title: z.string().min(1).max(120),
  recipientName: z.string().min(1).max(80),
  senderName: z.string().min(1).max(80),
  headline: z.string().min(1).max(180),
  message: z.string().min(1).max(2000),
  letter: z.string().max(5000).optional().or(z.literal('')),
  gallery: z.array(z.object({
    id: z.string().uuid(),
    url: z.string().url(),
    alt: z.string().max(180).optional(),
    caption: z.string().max(220).optional()
  })).max(24),
  sections: z.array(z.object({
    id: z.string().uuid(),
    type: z.enum(['text', 'gallery', 'letter', 'card', 'scratch']).default('text'),
    title: z.string().max(120).optional(),
    body: z.string().max(2000).optional(),
    visible: z.boolean().default(true),
    order: z.number().int().min(0).max(100)
  })).max(12),
  theme: z.object({
    background: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
    primary: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
    accent: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
    font: z.enum(['classic', 'modern', 'playful']).default('classic')
  }),
  musicUrl: z.string().url().optional().or(z.literal('')),
  autoplay: z.boolean().default(false),
  showEnvelope: z.boolean().default(true),
  useScrapbook: z.boolean().default(true),
  useFlipCards: z.boolean().default(false),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
}).strict();

export type WebsiteContent = z.infer<typeof websiteContentSchema>;

export const createWebsiteSchema = z.object({
  title: z.string().min(1).max(120),
  slug: z.string().regex(/^[a-z0-9-]+$/).min(3).max(80),
  templateId: z.string().uuid().optional()
});

export const updateWebsiteSchema = z.object({
  title: z.string().min(1).max(120).optional(),
  slug: z.string().regex(/^[a-z0-9-]+$/).min(3).max(80).optional(),
  status: z.enum(['draft', 'published', 'unpublished', 'archived']).optional()
});
