-- ============================================================
-- MMV Medical — Treatment Plans Schema
-- ============================================================

-- Treatments / Pricing Catalogue
CREATE TABLE IF NOT EXISTS treatments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('implant','crown','diagnostic','consultation','other')),
  brand TEXT,
  origin TEXT,
  price_eur NUMERIC(10,2) NOT NULL DEFAULT 0,
  description TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Treatment Plans (linked to a patient/contact)
CREATE TABLE IF NOT EXISTS treatment_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  plan_name TEXT NOT NULL DEFAULT 'Treatment Plan',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','sent','accepted','rejected')),
  notes TEXT,
  total_eur NUMERIC(10,2) DEFAULT 0,
  currency TEXT DEFAULT 'EUR',
  created_by TEXT,
  valid_until DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Treatment Plan Line Items
CREATE TABLE IF NOT EXISTS treatment_plan_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id UUID NOT NULL REFERENCES treatment_plans(id) ON DELETE CASCADE,
  treatment_id UUID REFERENCES treatments(id) ON DELETE SET NULL,
  custom_name TEXT,              -- fallback if treatment deleted
  quantity INT NOT NULL DEFAULT 1,
  unit_price_eur NUMERIC(10,2) NOT NULL,
  subtotal_eur NUMERIC(10,2) GENERATED ALWAYS AS (quantity * unit_price_eur) STORED,
  notes TEXT,
  sort_order INT DEFAULT 0
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON treatment_plans
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- SEED: Treatments & Pricing (from MMV Medical pricing sheet)
-- ============================================================

INSERT INTO treatments (name, category, brand, origin, price_eur, description) VALUES
-- Implants
('Implant – Macros',        'implant', 'Macros',        'Turkey',                   180.00, 'Mid-range Turkish brand. Price range €160–€200. Seed uses midpoint.'),
('Implant – Implant Swiss', 'implant', 'Implant Swiss', 'Switzerland',              235.00, 'Swiss brand. Price range €220–€250.'),
('Implant – Medigma',       'implant', 'Medigma',       'Germany',                  300.00, 'German brand. Price range €250–€350.'),
('Implant – Neodent',       'implant', 'Neodent',       'Brazil (Straumann Group)', 325.00, 'Straumann Group. Price range €300–€350.'),
('Implant – Medentika',     'implant', 'Medentika',     'Germany (Straumann Group)',425.00, 'Straumann Group. Price range €400–€450.'),
('Implant – Nobel Biocare', 'implant', 'Nobel Biocare', 'Switzerland',              550.00, 'Premium Swiss. Price range €500–€600.'),
('Implant – Straumann',     'implant', 'Straumann',     'Switzerland',              750.00, 'Top-tier Swiss. Price range €700–€800.'),

-- Crowns
('Dental Crown (Zirconia)',  'crown',   NULL,            'Turkey',                   150.00, 'Per unit, standard zirconia crown.'),

-- Diagnostics
('Panoramic X-Ray / CBCT Scan', 'diagnostic', NULL, 'Turkey', 50.00, 'Full dental imaging.'),
('Initial Consultation',        'consultation', NULL, 'Turkey', 0.00,  'Free patient consultation.')

ON CONFLICT DO NOTHING;

-- ============================================================
-- RLS: Enable row-level security (adjust policies as needed)
-- ============================================================
ALTER TABLE treatments         ENABLE ROW LEVEL SECURITY;
ALTER TABLE treatment_plans    ENABLE ROW LEVEL SECURITY;
ALTER TABLE treatment_plan_items ENABLE ROW LEVEL SECURITY;

-- Allow authenticated CRM users to read/write
CREATE POLICY "auth_users_all" ON treatments         FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth_users_all" ON treatment_plans    FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth_users_all" ON treatment_plan_items FOR ALL TO authenticated USING (true) WITH CHECK (true);
