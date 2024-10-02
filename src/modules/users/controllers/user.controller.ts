import {UserService} from "../infrastructure/services/user.service";
import {Request, Response} from "express";
import {sendError, sendSuccess} from "../../../shared/utils/responseHandlers";
import {GError} from "../../../shared/domain/entities/gError.entity";

export class UserController {

    constructor(private userService: UserService) {
    }

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const user = await this.userService.create(req.body)
            res.status(200).json(sendSuccess('User Created', {user}))
        } catch (error) {
            if (error instanceof GError) {
                res.status(error.statusCode).json(sendError(error.message, error.statusCode))
            }
            res.status(500).json(sendError('internal server error', 500))
        }
    }
}