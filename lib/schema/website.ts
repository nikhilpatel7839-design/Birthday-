import { z } from 'zod';

export const websiteContentSchema = z.object({
  title: z.string().min(1).max(120),
  recipientName: z.string().min(1).max(80),
  senderName: z.string().min(1).max(80),
  headline: z.string().min(1).max(180),
  message: z.string().min(1).max(2000),
  letter: z.string().max(5000).optional(),
  gallery: z.array(z.object({
    id: z.string(),
    url: z.string().url(),
    alt: z.string().max(180).optional(),
    caption: z.string().max(220).optional()
  })).max(24),
  sections: z.array(z.object({
    id: z.string(),
    type: z.enum(['text','gallery','letter','card','scratch']).default('text'),
    title: z.string().max(120).optional(),
    body: z.string().max(2000).optional(),
    visible: z.boolean().default(true)
  })).max(12),
  theme: z.object({
    background: z.string().max(20),
    primary: z.string().max(20),
    accent: z.string().max(20),
    font: z.enum(['classic','modern','playful']).default('classic')
  }),
  musicUrl: z.string().url().optional().or(z.literal('')),
  autoplay: z.boolean().default(false),
  showEnvelope: z.boolean().default(true),
  useScrapbook: z.boolean().default(true),
  useFlipCards: z.boolean().default(false)
}).strict();

export type WebsiteContent = z.infer<typeof websiteContentSchema>;
