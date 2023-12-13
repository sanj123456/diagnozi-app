export interface Ratings {
  isLoading: boolean;
  isLoadingMore: boolean;
  data?: RatingsData[];
  meta: Meta;
  status?: boolean;
  code?: number;
  message?: string;
}

export interface RatingsData {
  id: string;
  full_name: string;
  profile_image: string;
  comment_count: number;
  avg_vote: number;
}

export interface Meta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}
