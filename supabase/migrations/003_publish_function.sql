CREATE OR REPLACE FUNCTION public.publish_website(
  p_website_id UUID,
  p_content JSONB
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_owner_id UUID;
  v_current_status public.website_status;
BEGIN
  -- Verify the website exists and get ownership
  SELECT owner_id, status INTO v_owner_id, v_current_status
  FROM public.websites
  WHERE id = p_website_id;

  IF v_owner_id IS NULL THEN
    RAISE EXCEPTION 'Website not found';
  END IF;

  -- Verify authorization: user must be owner or admin
  IF NOT (
    auth.uid() = v_owner_id OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  ) THEN
    RAISE EXCEPTION 'Unauthorized: insufficient permissions to publish';
  END IF;

  -- Verify content structure
  IF p_content ->> 'title' IS NULL OR
     p_content ->> 'recipientName' IS NULL OR
     p_content ->> 'senderName' IS NULL THEN
    RAISE EXCEPTION 'Invalid content: missing required fields';
  END IF;

  -- Upsert published version (atomic)
  INSERT INTO public.website_versions (website_id, kind, content, version)
  VALUES (p_website_id, 'published', p_content, 1)
  ON CONFLICT (website_id, kind)
  DO UPDATE SET
    content = EXCLUDED.content,
    version = public.website_versions.version + 1;

  -- Update website status
  UPDATE public.websites
  SET
    status = 'published',
    published_at = NOW(),
    updated_at = NOW()
  WHERE id = p_website_id;

  -- Log audit event
  INSERT INTO public.audit_logs (actor_id, website_id, action, details)
  VALUES (
    auth.uid(),
    p_website_id,
    'publish_website',
    jsonb_build_object('previous_status', v_current_status)
  );

  RETURN jsonb_build_object(
    'success', true,
    'website_id', p_website_id,
    'status', 'published',
    'published_at', NOW(),
    'previous_status', v_current_status
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.publish_website(UUID, JSONB) TO authenticated;
