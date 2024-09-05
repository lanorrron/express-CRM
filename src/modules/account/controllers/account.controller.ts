import {AccountService} from "../infrastructure/services/account.service";
import {Request, Response} from 'express';
import {AccountEntity} from "../domain/entities/account.entity";
import {IHttpRequest} from "../../../shared/interfaces/httpRequest.interface";
import {IHttpResponse} from "../../../shared/interfaces/httpResponse.interface";

export class AccountController {
    constructor(private accountService: AccountService) {
    }

    async registerAccount(req: IHttpRequest<any>, res: IHttpResponse<any>): Promise<void> {
        try {
            const accountBody: AccountEntity = req.body;
            const account = await this.accountService.create(accountBody)
            res.status(201).json(account)
        } catch (error: any) {
            if (error.message === 'An account with this email already exists') {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    }
}