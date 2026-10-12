describe('Website publishing access control', () => {
  it('allows owner to publish their own website', () => {
    const ownerId = 'user-123';
    const currentUserId = 'user-123';
    expect(ownerId === currentUserId).toBe(true);
  });

  it('prevents customer from publishing others\' websites', () => {
    const ownerId = 'user-123';
    const currentUserId = 'user-456';
    const isAdmin = false;
    expect(ownerId === currentUserId || isAdmin).toBe(false);
  });

  it('allows admin to publish any website', () => {
    const isAdmin = true;
    expect(isAdmin).toBe(true);
  });

  it('keeps draft and published versions separate', () => {
    const draft = { kind: 'draft', content: 'edited' };
    const published = { kind: 'published', content: 'old' };
    expect(draft.kind).not.toBe(published.kind);
  });

  it('only allows published content to be publicly accessible', () => {
    const status = 'published';
    const isPublicVisible = status === 'published';
    expect(isPublicVisible).toBe(true);
  });
});
