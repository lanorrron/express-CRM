import {AccountService} from "../infrastructure/services/account.service";
import {AccountEntity} from "../domain/entities/account.entity";
import {sendError, sendSuccess} from "../../../shared/utils/responseHandlers";
import {GError} from "../../../shared/domain/entities/gError.entity";
import {Response, Request} from "express";

import {sign} from 'jsonwebtoken'
import {UserService} from "../../users/infrastructure/services/user.service";
import {UserRepository} from "../../users/infrastructure/respositories/user.repository";

export class AccountController {
    userRepository = new UserRepository
    userService = new UserService(this.userRepository)

    constructor(private accountService: AccountService) {
    }


    async registerAccount(req: Request, res: Response): Promise<void> {
        try {
            const {account, user} = req.body;

            const createdUser = await this.userService.create(user);

            // Asegúrate de que el user_id se esté pasando correctamente
            const accountWithUserId: AccountEntity = {...account, user_id: createdUser.id}; // Asegúrate de que createdUser tenga el id
            const createdAccount = await this.accountService.create(accountWithUserId);

            res.status(200).json(sendSuccess('Account created', {createdAccount, createdUser}));
        } catch (error: any) {
            console.log(error);
            if (error instanceof GError && error.statusCode === 409) {
                res.status(409).json(sendError(error.message, error.statusCode));
            } else {
                res.status(500).json(sendError('Internal Server Error', 500));
            }
        }
    }
}
