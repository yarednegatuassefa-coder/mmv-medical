-- ============================================================
-- MMV Medical — Migration 003: Treatment-Agnostic Schema
-- Adds treatment_category to leads
-- Adds patient_interactions table for agent workflow tracking
-- ============================================================

-- Add treatment_category to leads
alter table public.leads
  add column if not exists treatment_category text
    check (treatment_category in (
      'dental','hair','cosmetic','ivf','orthopedic','oncology','other'
    ));

-- Backfill existing leads as dental (all current leads are dental)
update public.leads set treatment_category = 'dental'
  where treatment_category is null;

-- Add index
create index if not exists leads_treatment_category_idx
  on public.leads(treatment_category) where deleted_at is null;

-- ============================================================
-- PATIENT INTERACTIONS
-- Tracks every agent-patient touchpoint for follow-up sequencer
-- ============================================================
create table if not exists public.patient_interactions (
  id                  uuid primary key default uuid_generate_v4(),
  lead_id             uuid not null references public.leads(id) on delete cascade,
  treatment_category  text not null
                        check (treatment_category in (
                          'dental','hair','cosmetic','ivf','orthopedic','oncology','other'
                        )),
  message_date        timestamptz not null default now(),
  sequence_position   int not null default 1, -- 1=first contact, 2=day3, 3=day7, 4=day14
  direction           text not null check (direction in ('inbound','outbound')),
  channel             text not null default 'whatsapp'
                        check (channel in ('whatsapp','email','instagram','other')),
  language            text not null default 'en',
  reply_classification text
                        check (reply_classification in (
                          'positive','neutral','objection','ooo','negative',null
                        )),
  pipeline_stage      text not null,
  stage_entry_date    timestamptz,
  booking_confirmed   boolean not null default false,
  approved_by         uuid references public.profiles(id),
  notes               text,
  created_at          timestamptz not null default now()
);

create index patient_interactions_lead_idx
  on public.patient_interactions(lead_id, message_date desc);
create index patient_interactions_sequence_idx
  on public.patient_interactions(lead_id, sequence_position);
create index patient_interactions_category_idx
  on public.patient_interactions(treatment_category);

-- RLS
alter table public.patient_interactions enable row level security;

create policy "interactions_select" on public.patient_interactions
  for select to authenticated using (true);
create policy "interactions_insert" on public.patient_interactions
  for insert to authenticated with check (true);
create policy "interactions_update" on public.patient_interactions
  for update to authenticated using (true);
