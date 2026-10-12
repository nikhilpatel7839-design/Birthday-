CREATE POLICY "storage_customer_own_images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'website-media' AND auth.uid()::text = owner
  );

CREATE POLICY "storage_customer_read_public" ON storage.objects
  FOR SELECT USING (bucket_id = 'website-media');

CREATE POLICY "storage_customer_delete_own_images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'website-media' AND auth.uid()::text = owner
  );

CREATE POLICY "storage_admin_manage_all" ON storage.objects
  FOR ALL USING (
    bucket_id = 'website-media' AND EXISTS (
      SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );
