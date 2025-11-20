export interface ApiResponseMeta {
  timestamp: string;
  requestId: string;
  [key: string]: unknown;
}

export interface PaginationMeta {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export type ApiErrorPayload =
  | Record<string, string[]>
  | string[]
  | string
  | null;

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T | null;
  errors: ApiErrorPayload;
  meta: ApiResponseMeta;
  pagination?: PaginationMeta;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T = unknown> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
