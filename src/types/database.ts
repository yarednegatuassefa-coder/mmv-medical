export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type LeadStage = 'new' | 'contacted' | 'plan_sent' | 'deposit_paid' | 'confirmed' | 'completed' | 'lost'
export type UserRole = 'admin' | 'manager'
export type SourceType = 'article' | 'review' | 'report' | 'clinic_profile' | 'regulation' | 'price_data' | 'other'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: { id: string; full_name: string; role: UserRole; avatar_url: string | null; created_at: string; updated_at: string }
        Insert: { id: string; full_name?: string; role?: UserRole; avatar_url?: string | null }
        Update: { full_name?: string; role?: UserRole; avatar_url?: string | null }
      }
      leads: {
        Row: {
          id: string; full_name: string; email: string; whatsapp: string
          country: string; treatment_interest: string; budget_range: string | null
          preferred_travel_month: string | null; notes: string | null
          stage: LeadStage; source: string; estimated_value: number | null
          follow_up_date: string | null; assigned_to: string | null
          created_by: string | null; deleted_at: string | null
          created_at: string; updated_at: string
        }
        Insert: {
          full_name: string; email: string; whatsapp: string
          country: string; treatment_interest: string; budget_range?: string | null
          preferred_travel_month?: string | null; notes?: string | null
          stage?: LeadStage; source?: string; estimated_value?: number | null
          follow_up_date?: string | null; assigned_to?: string | null; created_by?: string | null
        }
        Update: Partial<Database['public']['Tables']['leads']['Insert']> & { deleted_at?: string | null }
      }
      lead_activities: {
        Row: { id: string; lead_id: string; type: string; title: string; metadata: Json; created_by: string | null; created_at: string }
        Insert: { lead_id: string; type: string; title: string; metadata?: Json; created_by?: string | null }
        Update: never
      }
      lead_notes: {
        Row: { id: string; lead_id: string; content: string; created_by: string | null; deleted_at: string | null; created_at: string; updated_at: string }
        Insert: { lead_id: string; content: string; created_by?: string | null }
        Update: { content?: string; deleted_at?: string | null }
      }
      kb_sources: {
        Row: { id: string; title: string; url: string | null; source_type: SourceType; language: string; tags: string[]; raw_content: string; word_count: number; compiled: boolean; created_by: string | null; deleted_at: string | null; created_at: string; updated_at: string }
        Insert: { title: string; url?: string | null; source_type?: SourceType; language?: string; tags?: string[]; raw_content: string; compiled?: boolean; created_by?: string | null }
        Update: Partial<Database['public']['Tables']['kb_sources']['Insert']> & { deleted_at?: string | null }
      }
      kb_articles: {
        Row: { id: string; source_id: string | null; title: string; content: string; summary: string | null; tags: string[]; key_facts: string[]; sentiment: string | null; risks: string[]; opportunities: string[]; created_by: string | null; deleted_at: string | null; created_at: string; updated_at: string }
        Insert: { source_id?: string | null; title: string; content: string; summary?: string | null; tags?: string[]; key_facts?: string[]; sentiment?: string | null; risks?: string[]; opportunities?: string[] }
        Update: Partial<Database['public']['Tables']['kb_articles']['Insert']> & { deleted_at?: string | null }
      }
      kb_queries: {
        Row: { id: string; question: string; answer: string; citations: Json; created_by: string | null; created_at: string }
        Insert: { question: string; answer: string; citations?: Json; created_by?: string | null }
        Update: never
      }
      app_settings: {
        Row: { id: string; key: string; value: Json; updated_by: string | null; updated_at: string }
        Insert: { key: string; value: Json; updated_by?: string | null }
        Update: { value?: Json; updated_by?: string | null }
      }
    }
  }
}

// Convenience types
export type Profile       = Database['public']['Tables']['profiles']['Row']
export type Lead          = Database['public']['Tables']['leads']['Row']
export type LeadActivity  = Database['public']['Tables']['lead_activities']['Row']
export type LeadNote      = Database['public']['Tables']['lead_notes']['Row']
export type KbSource      = Database['public']['Tables']['kb_sources']['Row']
export type KbArticle     = Database['public']['Tables']['kb_articles']['Row']
export type KbQuery       = Database['public']['Tables']['kb_queries']['Row']
