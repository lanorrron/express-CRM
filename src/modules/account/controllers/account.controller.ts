import {AccountService} from "../infrastructure/services/account.service";
import {AccountEntity} from "../domain/entities/account.entity";
import {sendError, sendSuccess} from "../../../shared/utils/responseHandlers";
import {GError} from "../../../shared/domain/entities/gError.entity";
import {Response, Request} from "express";

import {sign} from 'jsonwebtoken'
import {UserService} from "../../users/infrastructure/services/user.service";
import {UserRepository} from "../../users/infrastructure/respositories/user.repository";
import {mainSequelize} from "../../../config/DB/mysql";


const JWT_SECRET = process.env.JWT_SECRET
export class AccountController {
    userService = new UserService(new UserRepository())

    constructor(private accountService: AccountService) {
    }


    async registerAccountAndCreateUser(req: Request, res: Response): Promise<void> {
        const transaction =  await mainSequelize.transaction()
        try {
            const {account, user} = req.body;

            const createdUser = await this.userService.create(user);

            const accountWithUserId: AccountEntity = {...account, user_id: createdUser.id};
            await this.accountService.create(accountWithUserId);
            const token = sign({ createdUser }, JWT_SECRET!, { expiresIn: '1h' });


            await transaction.commit()
            res.status(200).json(sendSuccess('Account created', {token}));
        } catch (error: any) {

            await transaction.rollback()
            console.log(error);
            if (error instanceof GError && error.statusCode === 409) {
                res.status(409).json(sendError(error.message, error.statusCode));
            } else {
                res.status(500).json(sendError('Internal Server Error', 500));
            }
        }
    }
}
