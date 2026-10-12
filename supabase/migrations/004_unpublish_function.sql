CREATE OR REPLACE FUNCTION public.unpublish_website(
  p_website_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_owner_id UUID;
BEGIN
  -- Verify the website exists and get ownership
  SELECT owner_id INTO v_owner_id
  FROM public.websites
  WHERE id = p_website_id;

  IF v_owner_id IS NULL THEN
    RAISE EXCEPTION 'Website not found';
  END IF;

  -- Verify authorization
  IF NOT (
    auth.uid() = v_owner_id OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  ) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  -- Update website status
  UPDATE public.websites
  SET status = 'unpublished', updated_at = NOW()
  WHERE id = p_website_id;

  -- Log audit event
  INSERT INTO public.audit_logs (actor_id, website_id, action)
  VALUES (auth.uid(), p_website_id, 'unpublish_website');

  RETURN jsonb_build_object(
    'success', true,
    'website_id', p_website_id,
    'status', 'unpublished'
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.unpublish_website(UUID) TO authenticated;
