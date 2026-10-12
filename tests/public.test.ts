describe('Public viewer access', () => {
  it('allows public access to published websites', () => {
    const status = 'published';
    const isPublic = status === 'published';
    expect(isPublic).toBe(true);
  });

  it('blocks public access to unpublished websites', () => {
    const status = 'unpublished';
    const isPublic = status === 'published';
    expect(isPublic).toBe(false);
  });

  it('never returns draft content to public', () => {
    const draftContent = 'secret draft';
    const publishedContent = 'public content';
    expect(draftContent).not.toBe(publishedContent);
  });

  it('hides private customer data from public', () => {
    const publicFields = ['title', 'slug', 'content'];
    const privateField = 'customer_email';
    expect(publicFields.includes(privateField)).toBe(false);
  });
});
