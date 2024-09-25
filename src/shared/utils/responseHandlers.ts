import {IHttpResponse} from "../interfaces/httpResponse.interface";

export const sendSuccess = (message: string, data?: object): IHttpResponse => {
    return {success: true, status_code: 200, message, data, error: false,}
}

export const sendError = (message: string, statusCode: number, data?: object): IHttpResponse => {
    const messageError = message ?? 'internal server error'
    return {
        error: true, message:messageError, status_code: statusCode, data, success: false,
    }
}