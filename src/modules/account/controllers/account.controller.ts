import {AccountService} from "../infrastructure/services/account.service";
import {AccountEntity} from "../domain/entities/account.entity";
import {sendError, sendSuccess} from "../../../shared/utils/responseHandlers";
import {GError} from "../../../shared/domain/entities/gError.entity";
import {Response, Request} from "express";
import {sign} from 'jsonwebtoken'

export class AccountController {
    constructor(private accountService: AccountService) {
    }

    async registerAccount(req: Request, res: Response): Promise<void> {
        try {
            const accountBody: AccountEntity = req.body;
            const account = await this.accountService.createAccount(accountBody)
            const token = sign({accountId: account.id, email: account.email},
                process.env.JWT_SECRET || '',
                {expiresIn: '1h'}
            )

            res.json(sendSuccess('account created', {token, account}))
        } catch (error: any) {
            console.log(error)
            if (error instanceof GError && error.statusCode === 409) {
                res.json(sendError(error.message, error.statusCode))
            } else {
                res.json(sendError('Internal Server Error', 500))
            }
        }
    }
}