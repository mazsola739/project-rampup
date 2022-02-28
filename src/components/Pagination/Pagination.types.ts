export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  paginate: (page: number) => void;
};
