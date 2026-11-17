-- MMV Medical: approved staff access and least-privilege RLS
-- Apply only after reviewing existing Auth users and disabling public signups.

BEGIN;

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS approved boolean NOT NULL DEFAULT false;

-- Existing accounts are approved only after the operator has reviewed them.
UPDATE public.profiles SET approved = true;

CREATE OR REPLACE FUNCTION public.is_staff()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND approved = true
      AND role IN ('admin', 'manager')
  );
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND approved = true AND role = 'admin'
  );
$$;

REVOKE ALL ON FUNCTION public.is_staff() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_staff() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- Profiles: users can read their own profile; approved staff can read staff profiles.
DROP POLICY IF EXISTS profiles_select ON public.profiles;
DROP POLICY IF EXISTS profiles_update ON public.profiles;
CREATE POLICY profiles_select ON public.profiles
  FOR SELECT TO authenticated
  USING (id = auth.uid() OR public.is_staff());
CREATE POLICY profiles_update ON public.profiles
  FOR UPDATE TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Role and approval are never client-editable.
REVOKE UPDATE ON TABLE public.profiles FROM PUBLIC, anon, authenticated;
GRANT UPDATE (full_name, avatar_url) ON TABLE public.profiles TO authenticated;

-- Leads: approved staff only. Admin-only soft-delete/restore is enforced by trigger.
DROP POLICY IF EXISTS leads_select ON public.leads;
DROP POLICY IF EXISTS leads_insert ON public.leads;
DROP POLICY IF EXISTS leads_update ON public.leads;
DROP POLICY IF EXISTS leads_delete ON public.leads;
CREATE POLICY leads_select ON public.leads
  FOR SELECT TO authenticated
  USING (deleted_at IS NULL AND public.is_staff());
CREATE POLICY leads_insert ON public.leads
  FOR INSERT TO authenticated
  WITH CHECK (public.is_staff());
CREATE POLICY leads_update ON public.leads
  FOR UPDATE TO authenticated
  USING ((deleted_at IS NULL AND public.is_staff()) OR public.is_admin())
  WITH CHECK (public.is_staff());

CREATE OR REPLACE FUNCTION public.restrict_soft_delete()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.deleted_at IS DISTINCT FROM OLD.deleted_at
     AND auth.uid() IS NOT NULL
     AND NOT public.is_admin() THEN
    RAISE EXCEPTION 'Only approved admins can delete or restore records';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS restrict_soft_delete ON public.leads;
CREATE TRIGGER restrict_soft_delete
  BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE PROCEDURE public.restrict_soft_delete();

-- Activities
DROP POLICY IF EXISTS activities_select ON public.lead_activities;
DROP POLICY IF EXISTS activities_insert ON public.lead_activities;
CREATE POLICY activities_select ON public.lead_activities
  FOR SELECT TO authenticated USING (public.is_staff());
CREATE POLICY activities_insert ON public.lead_activities
  FOR INSERT TO authenticated WITH CHECK (public.is_staff());

-- Notes. The old notes_delete policy was also FOR UPDATE, so remove it.
DROP POLICY IF EXISTS notes_select ON public.lead_notes;
DROP POLICY IF EXISTS notes_insert ON public.lead_notes;
DROP POLICY IF EXISTS notes_update ON public.lead_notes;
DROP POLICY IF EXISTS notes_delete ON public.lead_notes;
CREATE POLICY notes_select ON public.lead_notes
  FOR SELECT TO authenticated
  USING (deleted_at IS NULL AND public.is_staff());
CREATE POLICY notes_insert ON public.lead_notes
  FOR INSERT TO authenticated
  WITH CHECK (public.is_staff() AND created_by = auth.uid());
CREATE POLICY notes_update ON public.lead_notes
  FOR UPDATE TO authenticated
  USING (public.is_staff() AND created_by = auth.uid())
  WITH CHECK (public.is_staff() AND created_by = auth.uid());

-- Knowledge base
DROP POLICY IF EXISTS kb_sources_select ON public.kb_sources;
DROP POLICY IF EXISTS kb_sources_insert ON public.kb_sources;
DROP POLICY IF EXISTS kb_sources_update ON public.kb_sources;
CREATE POLICY kb_sources_select ON public.kb_sources
  FOR SELECT TO authenticated
  USING (deleted_at IS NULL AND public.is_staff());
CREATE POLICY kb_sources_insert ON public.kb_sources
  FOR INSERT TO authenticated
  WITH CHECK (public.is_staff() AND created_by = auth.uid());
CREATE POLICY kb_sources_update ON public.kb_sources
  FOR UPDATE TO authenticated
  USING (deleted_at IS NULL AND public.is_staff())
  WITH CHECK (public.is_staff());

DROP POLICY IF EXISTS kb_articles_select ON public.kb_articles;
DROP POLICY IF EXISTS kb_articles_insert ON public.kb_articles;
DROP POLICY IF EXISTS kb_articles_update ON public.kb_articles;
CREATE POLICY kb_articles_select ON public.kb_articles
  FOR SELECT TO authenticated
  USING (deleted_at IS NULL AND public.is_staff());
CREATE POLICY kb_articles_insert ON public.kb_articles
  FOR INSERT TO authenticated
  WITH CHECK (public.is_staff() AND created_by = auth.uid());
CREATE POLICY kb_articles_update ON public.kb_articles
  FOR UPDATE TO authenticated
  USING (deleted_at IS NULL AND public.is_staff())
  WITH CHECK (public.is_staff());

DROP POLICY IF EXISTS kb_queries_select ON public.kb_queries;
DROP POLICY IF EXISTS kb_queries_insert ON public.kb_queries;
CREATE POLICY kb_queries_select ON public.kb_queries
  FOR SELECT TO authenticated
  USING (created_by = auth.uid() AND public.is_staff());
CREATE POLICY kb_queries_insert ON public.kb_queries
  FOR INSERT TO authenticated
  WITH CHECK (public.is_staff() AND created_by = auth.uid());

-- Settings: staff read, approved admins write.
DROP POLICY IF EXISTS settings_select ON public.app_settings;
DROP POLICY IF EXISTS settings_update ON public.app_settings;
CREATE POLICY settings_select ON public.app_settings
  FOR SELECT TO authenticated USING (public.is_staff());
CREATE POLICY settings_update ON public.app_settings
  FOR UPDATE TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Patient interactions contain patient workflow data: approved staff only.
DROP POLICY IF EXISTS interactions_select ON public.patient_interactions;
DROP POLICY IF EXISTS interactions_insert ON public.patient_interactions;
DROP POLICY IF EXISTS interactions_update ON public.patient_interactions;
CREATE POLICY interactions_select ON public.patient_interactions
  FOR SELECT TO authenticated USING (public.is_staff());
CREATE POLICY interactions_insert ON public.patient_interactions
  FOR INSERT TO authenticated WITH CHECK (public.is_staff());
CREATE POLICY interactions_update ON public.patient_interactions
  FOR UPDATE TO authenticated USING (public.is_staff())
  WITH CHECK (public.is_staff());

-- These tables are provisioned outside the checked-in migrations in some environments.
-- The cron uses the service-role key, which bypasses RLS; browser/authenticated access is denied.
DO $$
BEGIN
  IF to_regclass('public.competitor_clinics') IS NOT NULL THEN
    EXECUTE 'ALTER TABLE public.competitor_clinics ENABLE ROW LEVEL SECURITY';
  END IF;
  IF to_regclass('public.competitor_prices') IS NOT NULL THEN
    EXECUTE 'ALTER TABLE public.competitor_prices ENABLE ROW LEVEL SECURITY';
  END IF;
END;
$$;

COMMIT;
