export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      address: {
        Row: {
          city: string
          complement: string | null
          country: string
          created_at: string | null
          id: string
          street: string
          zipcode: string
        }
        Insert: {
          city: string
          complement?: string | null
          country: string
          created_at?: string | null
          id?: string
          street: string
          zipcode: string
        }
        Update: {
          city?: string
          complement?: string | null
          country?: string
          created_at?: string | null
          id?: string
          street?: string
          zipcode?: string
        }
      }
      point_of_interest: {
        Row: {
          address_id: string | null
          coordinates: string | null
          created_at: string | null
          id: string
          name: string
          photo_id: string | null
          place_id: string | null
          user_id: string
        }
        Insert: {
          address_id?: string | null
          coordinates?: string | null
          created_at?: string | null
          id?: string
          name: string
          photo_id?: string | null
          place_id?: string | null
          user_id: string
        }
        Update: {
          address_id?: string | null
          coordinates?: string | null
          created_at?: string | null
          id?: string
          name?: string
          photo_id?: string | null
          place_id?: string | null
          user_id?: string
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
