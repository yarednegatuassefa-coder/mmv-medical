export const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER ?? '905527827698'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mmvmedical.org'
export const COUNTRIES = [
 {value:'UK',label:'🇬🇧 United Kingdom',currency:'GBP',symbol:'£'},
 {value:'Ireland',label:'🇮🇪 Ireland',currency:'EUR',symbol:'€'},
 {value:'Netherlands',label:'🇳🇱 Netherlands',currency:'EUR',symbol:'€'},
 {value:'Belgium',label:'🇧🇪 Belgium',currency:'EUR',symbol:'€'},
 {value:'Romania',label:'🇷🇴 Romania',currency:'EUR',symbol:'€'},
 {value:'Other',label:'🌍 Other',currency:'EUR',symbol:'€'},
] as const
export const ENQUIRY_TOPICS = [
 {value:'understand_process',label:'Understand the coordination process'},
 {value:'provider_information',label:'Learn how to evaluate provider information'},
 {value:'travel_planning',label:'Understand practical travel planning'},
 {value:'coordination_support',label:'Ask about non-clinical coordination support'},
 {value:'not_sure',label:'I am not sure yet'},
] as const
export const STAGES = [
 {value:'new',label:'New Lead',color:'#4a9eff'},
 {value:'contacted',label:'Contacted',color:'#a78bfa'},
 {value:'plan_sent',label:'Plan Sent',color:'#f0a844'},
 {value:'deposit_paid',label:'Deposit Paid',color:'#1fb896'},
 {value:'confirmed',label:'Confirmed',color:'#c8a45a'},
 {value:'completed',label:'Completed',color:'#6bde9e'},
 {value:'lost',label:'Lost',color:'#e05252'},
] as const
export type StageName = typeof STAGES[number]['value']
export const SOURCE_TYPES = [
 {value:'article',label:'Article'},{value:'review',label:'Patient Review'},{value:'report',label:'Market Report'},{value:'clinic_profile',label:'Clinic Profile'},{value:'regulation',label:'Regulation'},{value:'price_data',label:'Price Data'},{value:'other',label:'Other'},
] as const

/**
 * Legacy internal CRM taxonomy. Retained for existing staff workflows and historical
 * lead records. These options are intentionally not exposed in the public enquiry form
 * while MMV's provider network is still being established.
 */
export const TREATMENTS = [
 {value:'single_implant',label:'Single Dental Implant'},
 {value:'multiple_implants',label:'Multiple Implants (4+)'},
 {value:'all_on_4',label:'Full Arch — All-on-4'},
 {value:'all_on_6',label:'Full Arch — All-on-6'},
 {value:'veneers_single',label:'Single Veneer'},
 {value:'veneers_full',label:'Full Veneers (10 teeth)'},
 {value:'crowns_bridges',label:'Crowns / Bridges'},
 {value:'smile_makeover',label:'Full Smile Makeover'},
 {value:'not_sure',label:'Not sure — need advice'},
] as const
export const BUDGET_RANGES=['£1,000 – £3,000','£3,000 – £6,000','£6,000 – £12,000','£12,000+','Not sure yet']
export const TRAVEL_MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December','Flexible','As soon as possible']
