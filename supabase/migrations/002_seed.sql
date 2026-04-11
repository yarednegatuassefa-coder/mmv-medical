-- ============================================================
-- MMV Medical V3 — Seed: Demo Data
-- Run AFTER creating an admin user via Supabase Auth UI
-- Replace 'YOUR_USER_ID' with actual auth.users.id
-- ============================================================

-- Update the first user to admin
update public.profiles set role = 'admin', full_name = 'Jared MMV'
where id = (select id from auth.users limit 1);

-- Demo leads
insert into public.leads (full_name, email, whatsapp, country, treatment_interest, stage, source, estimated_value, follow_up_date, notes) values
('Brian Roberts',   'brian.roberts@gmail.com',    '+447911223344', 'UK',          'All-on-6',                  'confirmed',    'website',  9200,  current_date + 4,  'Full mouth All-on-6. Flying SAW. Deposit paid.'),
('Sarah Connor',    'sarah.c@hotmail.co.uk',      '+447899001122', 'UK',          'Veneers',                   'plan_sent',    'website',  3200,  current_date + 1,  '10 Emax veneers. Comparing with another clinic.'),
('Patrick Murphy',  'pat.murphy@eircom.net',      '+353871234567', 'Ireland',     'Dental Implants (1-3)',     'contacted',    'whatsapp', 1800,  current_date,      '3 implants upper jaw. Has X-rays from Dublin dentist.'),
('Lena Visser',     'lena.visser@gmail.com',      '+31612345678',  'Netherlands', 'Full Smile Makeover',       'new',          'website',  5500,  current_date + 2,  'Full makeover. Interested in combined implants + veneers.'),
('Marc Dupont',     'marc.d@proximus.be',         '+32471234567',  'Belgium',     'All-on-4',                  'deposit_paid', 'referral', 7800,  current_date + 14, 'All-on-4 lower arch. Deposit €1,500 received.'),
('Elena Ionescu',   'elena.i@yahoo.com',          '+40721234567',  'Romania',     'Veneers',                   'completed',    'instagram',2100,  null,              '8 veneers. Treatment completed. Excellent result.'),
('James O''Brien',  'james.obrien@gmail.com',     '+353851234567', 'Ireland',     'Multiple Implants (4+)',    'new',          'google',   4800,  current_date + 1,  '5 implants. Quoted €14k in Dublin. Very motivated.'),
('Tom Bakker',      't.bakker@nl.com',            '+31698765432',  'Netherlands', 'Crowns / Bridges',          'plan_sent',    'referral', 2400,  current_date + 3,  '4 crowns. Referred by Marc D.'),
('Claire Walsh',    'claire.walsh@gmail.com',     '+353861234567', 'Ireland',     'Dental Implants (1-3)',     'contacted',    'website',  2200,  current_date + 5,  'Single implant front tooth. Nervous patient.'),
('Dirk Janssen',    'dirk.j@outlook.com',         '+31623456789',  'Netherlands', 'All-on-6',                  'new',          'website',  11000, current_date + 2,  'Both arches. Researching heavily. Very informed.');
