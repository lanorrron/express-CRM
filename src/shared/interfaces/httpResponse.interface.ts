export interface IHttpResponse<T extends any>{
    success: boolean;
    status_code: number;
    data?: T;
    error?: boolean;
}