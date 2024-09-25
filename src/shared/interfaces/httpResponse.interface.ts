export interface IHttpResponse{
    success: boolean;
    status_code: number;
    message:string;
    data?: any;
    error?: boolean;
}