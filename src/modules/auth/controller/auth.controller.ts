import {AuthService} from "../infrastructure/auth.service";
import {Request, Response} from 'express'
import {sendError, sendSuccess} from "../../../shared/utils/responseHandlers";
import {GError} from "../../../shared/domain/entities/gError.entity";
import {LoginRequest} from "../domain/types/auth.types";



export class AuthController {

    constructor(protected authService: AuthService) {
    }

    async login(req: Request<LoginRequest>, res: Response): Promise<Response> {
        try {
            const {email, password} = req.body;
            const tokenResponse = await this.authService.login(email, password)
           return  res.status(200).json(sendSuccess('logging successfully', tokenResponse))
        } catch (error) {
            console.log(error)
            if (error instanceof GError){
                return res.status(error.statusCode).json(sendError(error.message, error.statusCode))
            } else {
                return res.status(500).json(sendError('Internal server error', 500))
            }

        }
    }


}