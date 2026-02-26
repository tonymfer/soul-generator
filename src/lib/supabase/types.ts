// ============================================================
// Supabase Database Types (manually defined to match schema)
// Mirrors the SQL migrations — keep in sync when schema changes.
// ============================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// ============================================================
// Database interface — used by Supabase client generics
// ============================================================

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          display_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username: string;
          display_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          display_name?: string | null;
          avatar_url?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      souls: {
        Row: {
          id: string;
          slug: string;
          user_id: string;
          title: string;
          tagline: string | null;
          personality_data: Json;
          soul_md: string;
          system_prompt: string;
          sample_conversations: Json;
          avatar_config: Json;
          avatar_url: string | null;
          og_image_url: string | null;
          is_public: boolean;
          forked_from: string | null;
          likes_count: number;
          forks_count: number;
          views_count: number;
          tags: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          user_id: string;
          title: string;
          tagline?: string | null;
          personality_data?: Json;
          soul_md: string;
          system_prompt: string;
          sample_conversations?: Json;
          avatar_config?: Json;
          avatar_url?: string | null;
          og_image_url?: string | null;
          is_public?: boolean;
          forked_from?: string | null;
          likes_count?: number;
          forks_count?: number;
          views_count?: number;
          tags?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          slug?: string;
          user_id?: string;
          title?: string;
          tagline?: string | null;
          personality_data?: Json;
          soul_md?: string;
          system_prompt?: string;
          sample_conversations?: Json;
          avatar_config?: Json;
          avatar_url?: string | null;
          og_image_url?: string | null;
          is_public?: boolean;
          forked_from?: string | null;
          likes_count?: number;
          forks_count?: number;
          views_count?: number;
          tags?: string[];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "souls_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "souls_forked_from_fkey";
            columns: ["forked_from"];
            isOneToOne: false;
            referencedRelation: "souls";
            referencedColumns: ["id"];
          },
        ];
      };
      quiz_responses: {
        Row: {
          id: string;
          soul_id: string;
          user_id: string;
          phase1_data: Json;
          phase2_data: Json;
          phase3_text: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          soul_id: string;
          user_id: string;
          phase1_data?: Json;
          phase2_data?: Json;
          phase3_text?: string | null;
          created_at?: string;
        };
        Update: {
          soul_id?: string;
          user_id?: string;
          phase1_data?: Json;
          phase2_data?: Json;
          phase3_text?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "quiz_responses_soul_id_fkey";
            columns: ["soul_id"];
            isOneToOne: false;
            referencedRelation: "souls";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "quiz_responses_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      soul_likes: {
        Row: {
          user_id: string;
          soul_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          soul_id: string;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          soul_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "soul_likes_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "soul_likes_soul_id_fkey";
            columns: ["soul_id"];
            isOneToOne: false;
            referencedRelation: "souls";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

// ============================================================
// Convenience type aliases for use throughout the app
// ============================================================

/** A row from the profiles table */
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

/** A row from the souls table */
export type Soul = Database["public"]["Tables"]["souls"]["Row"];

/** Data needed to insert a new soul */
export type SoulInsert = Database["public"]["Tables"]["souls"]["Insert"];

/** Data for updating an existing soul */
export type SoulUpdate = Database["public"]["Tables"]["souls"]["Update"];

/** A row from the quiz_responses table */
export type QuizResponse = Database["public"]["Tables"]["quiz_responses"]["Row"];

/** A row from the soul_likes table */
export type SoulLike = Database["public"]["Tables"]["soul_likes"]["Row"];
