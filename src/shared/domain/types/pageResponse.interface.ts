export interface IPagedResponse<T> {
    items: T;
    limit: number;
    currentPage: number;
    total: number;
    totalPages: number;
}

export type PagedType = {
    page: number;
    size: number;
    search?: Record<string, string | number>;
} & { [key: string]: string | number | Record<string, string | number> };