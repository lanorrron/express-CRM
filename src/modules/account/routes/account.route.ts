import express, { Request, Response } from 'express';
import {AccountService} from "../infrastructure/services/account.service";
import {AccountEntityToPersist} from "../domain/entities/account.entity";
import {AccountRepository} from "../infrastructure/respositories/account.repository";
import {AccountController} from "../controllers/account.controller";

const accountRepository = new AccountRepository();
const accountService = new AccountService(accountRepository);
const accountController = new AccountController(accountService)
const router = express.Router();

router.post('/register', async (req: Request, res: Response) => accountController.registerAccount(req,res));

export default router;
