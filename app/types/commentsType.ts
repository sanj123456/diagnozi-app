export interface Comments {
  isLoading: boolean;
  isLoadingMore: boolean;
  data?: CommentsData[];
  meta: Meta;
  status?: boolean;
  code?: number;
  message?: string;
}

export interface CommentsData {}

export interface Meta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}
