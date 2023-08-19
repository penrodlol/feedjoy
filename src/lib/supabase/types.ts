export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

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
          title_topic_summary_fts: unknown | null;
          topic: string | null;
        };
        Insert: {
          id?: number;
          link: string;
          pub_date: string;
          site_id: number;
          slug?: string;
          summary?: string | null;
          title: string;
          title_topic_summary_fts?: unknown | null;
          topic?: string | null;
        };
        Update: {
          id?: number;
          link?: string;
          pub_date?: string;
          site_id?: number;
          slug?: string;
          summary?: string | null;
          title?: string;
          title_topic_summary_fts?: unknown | null;
          topic?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'post_site_id_fkey';
            columns: ['site_id'];
            referencedRelation: 'site';
            referencedColumns: ['id'];
          },
        ];
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
        Relationships: [];
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
        Args: Record<PropertyKey, never>;
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
