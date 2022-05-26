export interface PaginateResponse<T> {
  totalPage: number;
  currentPage: number;
  total: number;
  records: T;
}
