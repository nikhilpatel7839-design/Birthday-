ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.websites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_self_read" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_self_update" ON public.profiles
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id AND role = 'customer');

CREATE POLICY "admin_profiles_read_all" ON public.profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "templates_read_active" ON public.templates
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "admin_templates_manage" ON public.templates
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "customers_manage_own_websites" ON public.websites
  FOR ALL USING (
    owner_id = auth.uid()
  ) WITH CHECK (
    owner_id = auth.uid()
  );

CREATE POLICY "admin_manage_all_websites" ON public.websites
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "public_published_websites_read" ON public.websites
  FOR SELECT USING (status = 'published');

CREATE POLICY "customers_manage_own_versions" ON public.website_versions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.websites w
      WHERE w.id = website_id AND w.owner_id = auth.uid()
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.websites w
      WHERE w.id = website_id AND w.owner_id = auth.uid()
    )
  );

CREATE POLICY "admin_manage_all_versions" ON public.website_versions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "public_versions_no_access" ON public.website_versions
  FOR SELECT USING (FALSE);

CREATE POLICY "customers_manage_own_media" ON public.website_media
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.websites w
      WHERE w.id = website_id AND w.owner_id = auth.uid()
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.websites w
      WHERE w.id = website_id AND w.owner_id = auth.uid()
    )
  );

CREATE POLICY "admin_manage_all_media" ON public.website_media
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "customers_read_own_invitations" ON public.website_invitations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.websites w
      WHERE w.id = website_id AND w.owner_id = auth.uid()
    )
  );

CREATE POLICY "admin_manage_all_invitations" ON public.website_invitations
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "public_invitations_no_access" ON public.website_invitations
  FOR SELECT USING (FALSE);

CREATE POLICY "customers_read_own_audit" ON public.audit_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.websites w
      WHERE w.id = website_id AND w.owner_id = auth.uid()
    )
  );

CREATE POLICY "admin_read_all_audit" ON public.audit_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "public_audit_no_access" ON public.audit_logs FOR SELECT USING (FALSE);
