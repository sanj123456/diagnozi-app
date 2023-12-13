export interface SubscriptionHistory {
  isLoading: boolean;
  isLoadingMore: boolean;
  data?: SubscriptionHistoryData[];
  meta: Meta;
  status?: boolean;
  code?: number;
  message?: string;
}

export interface SubscriptionHistoryData {
  package_name: string;
  interval_type: string;
  price: string;
  currency: string;
  discount: string;
  start_date: string;
  end_date: string;
  status: string;
}

export interface Meta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}
