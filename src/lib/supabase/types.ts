export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      post: {
        Row: {
          id: number;
          link: string;
          pub_date: string;
          site_id: number;
          slug: string;
          summary: string | null;
          title: string;
        };
        Insert: {
          id?: number;
          link: string;
          pub_date: string;
          site_id: number;
          slug?: string;
          summary?: string | null;
          title: string;
        };
        Update: {
          id?: number;
          link?: string;
          pub_date?: string;
          site_id?: number;
          slug?: string;
          summary?: string | null;
          title?: string;
        };
      };
      site: {
        Row: {
          id: number;
          name: string;
          slug: string;
          url: string;
        };
        Insert: {
          id?: number;
          name: string;
          slug?: string;
          url: string;
        };
        Update: {
          id?: number;
          name?: string;
          slug?: string;
          url?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      add_url_and_feed: {
        Args: {
          _title: string;
          _url: string;
        };
        Returns: undefined;
      };
      bulk_update_summaries: {
        Args: {
          summaries: Json;
        };
        Returns: undefined;
      };
      get_root_summary: {
        Args: Record<PropertyKey, never>;
        Returns: {
          totalposts: number;
          totalsites: number;
          postweek: number;
        }[];
      };
      get_sites_summary: {
        Args: Record<PropertyKey, never>;
        Returns: {
          name: string;
          count: number;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
