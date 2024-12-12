export class GError extends Error {
    readonly statusCode: number
    readonly errors?:String[]

    constructor(message: string, statusCode: number, errors?:String[]) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors
    }
}