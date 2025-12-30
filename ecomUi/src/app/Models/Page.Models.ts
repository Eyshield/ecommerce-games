export interface Page<T> {
  content: T[];
  page: number;
  Size: number;
  totalElements: number;
  totalPages: number;
  isFirst: boolean;
  isLast: boolean;
}
