CREATE OR REPLACE FUNCTION public.publish_website(p_website_id UUID, p_content JSONB)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_owner_id UUID;
  v_current_status public.website_status;
BEGIN
  SELECT owner_id, status INTO v_owner_id, v_current_status
  FROM public.websites
  WHERE id = p_website_id;

  IF v_owner_id IS NULL THEN
    RAISE EXCEPTION 'Website not found';
  END IF;

  IF NOT (auth.uid() = v_owner_id OR EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
  )) THEN
    RAISE EXCEPTION 'Unauthorized publish operation';
  END IF;

  INSERT INTO public.website_versions (website_id, kind, content, version)
  VALUES (p_website_id, 'published', p_content, 1)
  ON CONFLICT (website_id, kind)
  DO UPDATE SET content = EXCLUDED.content, version = public.website_versions.version + 1;

  UPDATE public.websites
  SET status = 'published', published_at = NOW(), updated_at = NOW()
  WHERE id = p_website_id;

  RETURN jsonb_build_object(
    'website_id', p_website_id,
    'status', 'published',
    'published_at', NOW(),
    'previous_status', v_current_status
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.publish_website(UUID, JSONB) TO authenticated;
