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
          fts: unknown | null;
          id: number;
          link: string;
          pub_date: string;
          site_id: number;
          slug: string;
          summary: string | null;
          title: string;
        };
        Insert: {
          fts?: unknown | null;
          id?: number;
          link: string;
          pub_date: string;
          site_id: number;
          slug?: string;
          summary?: string | null;
          title: string;
        };
        Update: {
          fts?: unknown | null;
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
      topic: {
        Row: {
          id: number;
          name: string;
          post_id: number;
        };
        Insert: {
          id?: number;
          name: string;
          post_id: number;
        };
        Update: {
          id?: number;
          name?: string;
          post_id?: number;
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
      get_random_posts: {
        Args: Record<PropertyKey, never>;
        Returns: {
          slug: string;
          title: string;
          pub_date: string;
          siteslug: string;
          sitename: string;
        }[];
      };
      get_random_topics: {
        Args: {
          amount: number;
        };
        Returns: {
          name: string;
        }[];
      };
      get_recent_posts: {
        Args: Record<PropertyKey, never>;
        Returns: {
          slug: string;
          title: string;
          pub_date: string;
          siteslug: string;
          sitename: string;
        }[];
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
      get_summary: {
        Args: Record<PropertyKey, never>;
        Returns: Database['public']['CompositeTypes']['summary'];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      summary: {
        totalposts: number;
        totalsites: number;
        postweek: number;
      };
    };
  };
}
