import { websiteContentSchema } from '@/lib/schema/website';

export function validateWebsiteContent(payload: unknown) {
  return websiteContentSchema.parse(payload);
}

export function sanitizeWebsiteDraft(input: Record<string, unknown>) {
  return {
    ...input,
    gallery: Array.isArray(input.gallery) ? input.gallery.slice(0, 24) : [],
    sections: Array.isArray(input.sections) ? input.sections.slice(0, 12) : []
  };
}
