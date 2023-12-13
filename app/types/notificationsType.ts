export interface Notifications {
  isLoading: boolean;
  isLoadingMore: boolean;
  data?: NotificationsData[];
  meta: Meta;
  status?: boolean;
  code?: number;
  message?: string;
}

export interface NotificationsData {
  id: string;
  title: string;
  message: string;
  is_read: number;
  created_at: string;
  updated_at: string;
}

export interface Meta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}
