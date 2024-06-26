import {Response} from 'express';

export const sendSuccess = (response: Response, message: string, data: any) => {
    response.send({
        error: false,
        statusCode: 200,
        message,
        data
    })
}

export const sendError = (response: Response, message: string, statusCode: number) => {
    const messageError = message?? 'internal server error'
    response.send({
        error: true,
        statusCode,
        message: messageError
    })
}