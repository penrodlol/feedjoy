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
      summary_topic: {
        Row: {
          id: number;
          items: Database['public']['CompositeTypes']['summary_topic_item'][];
          type: Database['public']['Enums']['summary_topic_type'];
          updated_at: string;
        };
        Insert: {
          id?: number;
          items: Database['public']['CompositeTypes']['summary_topic_item'][];
          type: Database['public']['Enums']['summary_topic_type'];
          updated_at?: string;
        };
        Update: {
          id?: number;
          items?: Database['public']['CompositeTypes']['summary_topic_item'][];
          type?: Database['public']['Enums']['summary_topic_type'];
          updated_at?: string;
        };
        Relationships: [];
      };
      summary_total: {
        Row: {
          id: number;
          total: number;
          type: Database['public']['Enums']['summary_total_type'];
          updated_at: string;
        };
        Insert: {
          id?: number;
          total: number;
          type: Database['public']['Enums']['summary_total_type'];
          updated_at?: string;
        };
        Update: {
          id?: number;
          total?: number;
          type?: Database['public']['Enums']['summary_total_type'];
          updated_at?: string;
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
      get_top_topics: {
        Args: {
          pub_date_limit: unknown;
        };
        Returns: {
          topic: string;
          count: number;
        }[];
      };
      summary_topics_ordered: {
        Args: Record<PropertyKey, never>;
        Returns: {
          id: number;
          items: Database['public']['CompositeTypes']['summary_topic_item'][];
          type: Database['public']['Enums']['summary_topic_type'];
          updated_at: string;
        }[];
      };
      summary_totals_ordered: {
        Args: Record<PropertyKey, never>;
        Returns: {
          id: number;
          total: number;
          type: Database['public']['Enums']['summary_total_type'];
          updated_at: string;
        }[];
      };
    };
    Enums: {
      summary_topic_type: 'past month' | 'past year' | 'all time';
      summary_total_type: 'total posts' | 'total sites' | 'posts this week';
    };
    CompositeTypes: {
      summary: {
        totalposts: number;
        totalsites: number;
        postweek: number;
      };
      summary_topic_item: {
        topic: string;
        total: number;
      };
    };
  };
}
