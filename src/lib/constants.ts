export const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER ?? '905527827698'
export const SITE_URL  = process.env.NEXT_PUBLIC_SITE_URL  ?? 'https://mmvmedical.health'

export const COUNTRIES = [
  { value: 'UK',          label: '🇬🇧 United Kingdom', currency: 'GBP', symbol: '£' },
  { value: 'Ireland',     label: '🇮🇪 Ireland',         currency: 'EUR', symbol: '€' },
  { value: 'Netherlands', label: '🇳🇱 Netherlands',     currency: 'EUR', symbol: '€' },
  { value: 'Belgium',     label: '🇧🇪 Belgium',         currency: 'EUR', symbol: '€' },
  { value: 'Romania',     label: '🇷🇴 Romania',         currency: 'EUR', symbol: '€' },
  { value: 'Other',       label: '🌍 Other',            currency: 'EUR', symbol: '€' },
] as const

export const TREATMENTS = [
  { value: 'single_implant',    label: 'Single Dental Implant' },
  { value: 'multiple_implants', label: 'Multiple Implants (4+)' },
  { value: 'all_on_4',          label: 'Full Arch — All-on-4' },
  { value: 'all_on_6',          label: 'Full Arch — All-on-6' },
  { value: 'veneers_single',    label: 'Single Veneer' },
  { value: 'veneers_full',      label: 'Full Veneers (10 teeth)' },
  { value: 'crowns_bridges',    label: 'Crowns / Bridges' },
  { value: 'smile_makeover',    label: 'Full Smile Makeover' },
  { value: 'not_sure',          label: 'Not sure — need advice' },
] as const

export const STAGES = [
  { value: 'new',          label: 'New Lead',     color: '#4a9eff' },
  { value: 'contacted',    label: 'Contacted',    color: '#a78bfa' },
  { value: 'plan_sent',    label: 'Plan Sent',    color: '#f0a844' },
  { value: 'deposit_paid', label: 'Deposit Paid', color: '#1fb896' },
  { value: 'confirmed',    label: 'Confirmed',    color: '#c8a45a' },
  { value: 'completed',    label: 'Completed',    color: '#6bde9e' },
  { value: 'lost',         label: 'Lost',         color: '#e05252' },
] as const

export type StageName = typeof STAGES[number]['value']

export const CALCULATOR_DATA: Record<string, Record<string, { home: number; istanbul: number }>> = {
  UK: {
    single_implant:    { home: 2500,  istanbul: 420  },
    multiple_implants: { home: 9200,  istanbul: 1600 },
    all_on_4:          { home: 20000, istanbul: 6500 },
    all_on_6:          { home: 26000, istanbul: 8500 },
    veneers_single:    { home: 900,   istanbul: 190  },
    veneers_full:      { home: 8500,  istanbul: 1800 },
    crowns_bridges:    { home: 1200,  istanbul: 280  },
    smile_makeover:    { home: 15000, istanbul: 4500 },
  },
  Ireland: {
    single_implant:    { home: 2800,  istanbul: 420  },
    multiple_implants: { home: 10500, istanbul: 1600 },
    all_on_4:          { home: 22000, istanbul: 6500 },
    all_on_6:          { home: 28000, istanbul: 8500 },
    veneers_single:    { home: 950,   istanbul: 190  },
    veneers_full:      { home: 9200,  istanbul: 1800 },
    crowns_bridges:    { home: 1300,  istanbul: 280  },
    smile_makeover:    { home: 16000, istanbul: 4500 },
  },
  Netherlands: {
    single_implant:    { home: 2400,  istanbul: 420  },
    multiple_implants: { home: 9000,  istanbul: 1600 },
    all_on_4:          { home: 20000, istanbul: 6500 },
    all_on_6:          { home: 25000, istanbul: 8500 },
    veneers_single:    { home: 850,   istanbul: 190  },
    veneers_full:      { home: 8000,  istanbul: 1800 },
    crowns_bridges:    { home: 1100,  istanbul: 280  },
    smile_makeover:    { home: 14000, istanbul: 4500 },
  },
  Belgium: {
    single_implant:    { home: 2200,  istanbul: 420  },
    multiple_implants: { home: 8500,  istanbul: 1600 },
    all_on_4:          { home: 19000, istanbul: 6500 },
    all_on_6:          { home: 24000, istanbul: 8500 },
    veneers_single:    { home: 800,   istanbul: 190  },
    veneers_full:      { home: 7500,  istanbul: 1800 },
    crowns_bridges:    { home: 1000,  istanbul: 280  },
    smile_makeover:    { home: 13000, istanbul: 4500 },
  },
  Romania: {
    single_implant:    { home: 1400,  istanbul: 420  },
    multiple_implants: { home: 5500,  istanbul: 1600 },
    all_on_4:          { home: 14000, istanbul: 6500 },
    all_on_6:          { home: 18000, istanbul: 8500 },
    veneers_single:    { home: 600,   istanbul: 190  },
    veneers_full:      { home: 5500,  istanbul: 1800 },
    crowns_bridges:    { home: 700,   istanbul: 280  },
    smile_makeover:    { home: 9000,  istanbul: 4500 },
  },
  Other: {
    single_implant:    { home: 2500,  istanbul: 420  },
    multiple_implants: { home: 9000,  istanbul: 1600 },
    all_on_4:          { home: 20000, istanbul: 6500 },
    all_on_6:          { home: 26000, istanbul: 8500 },
    veneers_single:    { home: 900,   istanbul: 190  },
    veneers_full:      { home: 8000,  istanbul: 1800 },
    crowns_bridges:    { home: 1100,  istanbul: 280  },
    smile_makeover:    { home: 14000, istanbul: 4500 },
  },
}

export const SOURCE_TYPES = [
  { value: 'article',        label: 'Article' },
  { value: 'review',         label: 'Patient Review' },
  { value: 'report',         label: 'Market Report' },
  { value: 'clinic_profile', label: 'Clinic Profile' },
  { value: 'regulation',     label: 'Regulation' },
  { value: 'price_data',     label: 'Price Data' },
  { value: 'other',          label: 'Other' },
] as const

export const BUDGET_RANGES = [
  '£1,000 – £3,000',
  '£3,000 – £6,000',
  '£6,000 – £12,000',
  '£12,000+',
  'Not sure yet',
]

export const TRAVEL_MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
  'Flexible','As soon as possible',
]
