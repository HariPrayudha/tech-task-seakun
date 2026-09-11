export interface ApiResponse<T> {
  success: true;
  data: T;
}

export interface PaginatedApiResponse<T, M> {
  success: true;
  data: T[];
  meta: M;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}
