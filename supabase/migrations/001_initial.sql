-- ============================================================
-- MMV Medical V3 — Migration 001: Initial Schema
-- ============================================================

-- Enable extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm";

-- ============================================================
-- PROFILES
-- ============================================================
create table public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  full_name     text not null default '',
  role          text not null default 'manager' check (role in ('admin','manager')),
  avatar_url    text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name',''), 'manager');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- LEADS
-- ============================================================
create table public.leads (
  id                      uuid primary key default uuid_generate_v4(),
  full_name               text not null,
  email                   text not null,
  whatsapp                text not null,
  country                 text not null,
  treatment_interest      text not null,
  budget_range            text,
  preferred_travel_month  text,
  notes                   text,
  stage                   text not null default 'new'
                            check (stage in ('new','contacted','plan_sent','deposit_paid','confirmed','completed','lost')),
  source                  text not null default 'website',
  estimated_value         numeric(10,2),
  follow_up_date          date,
  assigned_to             uuid references public.profiles(id),
  created_by              uuid references public.profiles(id),
  deleted_at              timestamptz,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);

create index leads_stage_idx        on public.leads(stage) where deleted_at is null;
create index leads_country_idx      on public.leads(country) where deleted_at is null;
create index leads_created_idx      on public.leads(created_at desc) where deleted_at is null;
create index leads_treatment_idx    on public.leads(treatment_interest) where deleted_at is null;
create index leads_follow_up_idx    on public.leads(follow_up_date) where deleted_at is null;
create index leads_email_idx        on public.leads(email);
create index leads_whatsapp_idx     on public.leads(whatsapp);
create index leads_search_idx       on public.leads using gin(
  (to_tsvector('english', full_name || ' ' || email || ' ' || coalesce(notes,'')))
);

-- ============================================================
-- LEAD ACTIVITIES
-- ============================================================
create table public.lead_activities (
  id           uuid primary key default uuid_generate_v4(),
  lead_id      uuid not null references public.leads(id) on delete cascade,
  type         text not null, -- lead_created, stage_changed, note_added, whatsapp_sent, etc.
  title        text not null,
  metadata     jsonb default '{}',
  created_by   uuid references public.profiles(id),
  created_at   timestamptz not null default now()
);

create index activities_lead_idx on public.lead_activities(lead_id, created_at desc);

-- ============================================================
-- LEAD NOTES
-- ============================================================
create table public.lead_notes (
  id          uuid primary key default uuid_generate_v4(),
  lead_id     uuid not null references public.leads(id) on delete cascade,
  content     text not null,
  created_by  uuid references public.profiles(id),
  deleted_at  timestamptz,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index notes_lead_idx on public.lead_notes(lead_id, created_at desc) where deleted_at is null;

-- ============================================================
-- KB SOURCES
-- ============================================================
create table public.kb_sources (
  id           uuid primary key default uuid_generate_v4(),
  title        text not null,
  url          text,
  source_type  text not null default 'article'
                 check (source_type in ('article','review','report','clinic_profile','regulation','price_data','other')),
  language     text not null default 'en',
  tags         text[] default '{}',
  raw_content  text not null,
  word_count   int generated always as (array_length(string_to_array(raw_content,' '),1)) stored,
  compiled     boolean not null default false,
  created_by   uuid references public.profiles(id),
  deleted_at   timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index kb_sources_created_idx on public.kb_sources(created_at desc) where deleted_at is null;
create index kb_sources_compiled_idx on public.kb_sources(compiled) where deleted_at is null;
create index kb_sources_search_idx on public.kb_sources using gin(
  (to_tsvector('english', title || ' ' || raw_content))
);

-- ============================================================
-- KB ARTICLES
-- ============================================================
create table public.kb_articles (
  id           uuid primary key default uuid_generate_v4(),
  source_id    uuid references public.kb_sources(id) on delete set null,
  title        text not null,
  content      text not null,
  summary      text,
  tags         text[] default '{}',
  key_facts    text[] default '{}',
  sentiment    text check (sentiment in ('positive','neutral','negative','mixed')),
  risks        text[] default '{}',
  opportunities text[] default '{}',
  created_by   uuid references public.profiles(id),
  deleted_at   timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index kb_articles_created_idx on public.kb_articles(created_at desc) where deleted_at is null;
create index kb_articles_search_idx on public.kb_articles using gin(
  (to_tsvector('english', title || ' ' || content))
);

-- ============================================================
-- KB QUERIES
-- ============================================================
create table public.kb_queries (
  id          uuid primary key default uuid_generate_v4(),
  question    text not null,
  answer      text not null,
  citations   jsonb default '[]',
  created_by  uuid references public.profiles(id),
  created_at  timestamptz not null default now()
);

create index kb_queries_created_idx on public.kb_queries(created_at desc);

-- ============================================================
-- APP SETTINGS
-- ============================================================
create table public.app_settings (
  id         uuid primary key default uuid_generate_v4(),
  key        text not null unique,
  value      jsonb not null,
  updated_by uuid references public.profiles(id),
  updated_at timestamptz not null default now()
);

insert into public.app_settings (key, value) values
  ('kb_topic', '"Turkish dental and medical tourism for European patients"'),
  ('wa_number', '"905527827698"'),
  ('site_name', '"MMV Medical"');

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger set_updated_at before update on public.profiles       for each row execute procedure public.set_updated_at();
create trigger set_updated_at before update on public.leads          for each row execute procedure public.set_updated_at();
create trigger set_updated_at before update on public.lead_notes     for each row execute procedure public.set_updated_at();
create trigger set_updated_at before update on public.kb_sources     for each row execute procedure public.set_updated_at();
create trigger set_updated_at before update on public.kb_articles    for each row execute procedure public.set_updated_at();

-- ============================================================
-- RLS POLICIES
-- ============================================================
alter table public.profiles        enable row level security;
alter table public.leads           enable row level security;
alter table public.lead_activities enable row level security;
alter table public.lead_notes      enable row level security;
alter table public.kb_sources      enable row level security;
alter table public.kb_articles     enable row level security;
alter table public.kb_queries      enable row level security;
alter table public.app_settings    enable row level security;

-- Profiles: users can read all, update own
create policy "profiles_select" on public.profiles for select to authenticated using (true);
create policy "profiles_update" on public.profiles for update to authenticated using (auth.uid() = id);

-- Leads: authenticated read/write, service role for public insert
create policy "leads_select"  on public.leads for select  to authenticated using (deleted_at is null);
create policy "leads_insert"  on public.leads for insert  to authenticated with check (true);
create policy "leads_update"  on public.leads for update  to authenticated using (deleted_at is null);
create policy "leads_delete"  on public.leads for update  to authenticated
  using (deleted_at is null and exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- Activities: authenticated read, insert
create policy "activities_select" on public.lead_activities for select to authenticated using (true);
create policy "activities_insert" on public.lead_activities for insert to authenticated with check (true);

-- Notes: authenticated read/write
create policy "notes_select" on public.lead_notes for select to authenticated using (deleted_at is null);
create policy "notes_insert" on public.lead_notes for insert to authenticated with check (true);
create policy "notes_update" on public.lead_notes for update to authenticated using (created_by = auth.uid());
create policy "notes_delete" on public.lead_notes for update to authenticated using (created_by = auth.uid());

-- KB: authenticated only
create policy "kb_sources_select"  on public.kb_sources  for select to authenticated using (deleted_at is null);
create policy "kb_sources_insert"  on public.kb_sources  for insert to authenticated with check (true);
create policy "kb_sources_update"  on public.kb_sources  for update to authenticated using (deleted_at is null);
create policy "kb_articles_select" on public.kb_articles for select to authenticated using (deleted_at is null);
create policy "kb_articles_insert" on public.kb_articles for insert to authenticated with check (true);
create policy "kb_articles_update" on public.kb_articles for update to authenticated using (deleted_at is null);
create policy "kb_queries_select"  on public.kb_queries  for select to authenticated using (created_by = auth.uid());
create policy "kb_queries_insert"  on public.kb_queries  for insert to authenticated with check (true);

-- Settings: authenticated read, admin write
create policy "settings_select" on public.app_settings for select to authenticated using (true);
create policy "settings_update" on public.app_settings for update to authenticated
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
