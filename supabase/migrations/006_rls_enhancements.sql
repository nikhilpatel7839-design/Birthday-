-- Additional RLS policy enhancements

CREATE POLICY "customers_cannot_publish_others" ON public.websites
  FOR UPDATE
  USING (
    owner_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'customer'
    )
  )
  WITH CHECK (
    owner_id = auth.uid() AND status != 'published'
  );

CREATE POLICY "admins_can_do_anything" ON public.websites
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "public_cannot_modify" ON public.websites
  FOR INSERT, UPDATE, DELETE
  USING (FALSE)
  WITH CHECK (FALSE);
