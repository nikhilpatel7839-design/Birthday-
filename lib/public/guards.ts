export const publicViewerRedirect = '/login';

export function isPublishedStatus(status: string | null) {
  return status === 'published';
}
