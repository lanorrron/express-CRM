import express, { Request, Response } from 'express';
import {AccountService} from "../infrastructure/services/account.service";
import {AccountEntityToPersist} from "../domain/entities/account.entity";
import {AccountRepository} from "../infrastructure/respositories/account.repository";

const accountRepository = new AccountRepository();
const accountService = new AccountService(accountRepository);
const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
    try {
        const accountData: Omit<AccountEntityToPersist, 'created_at' | 'updated_at' | 'deleted_at' > = req.body;
        const newAccount = await accountService.create(accountData);
        res.status(201).json({message:'success',newAccount});
    } catch (error) {
        res.status(500).json({ error:'algo falló' });
    }
});

export default router;
