import express, { Request, Response } from 'express';
import {AccountService} from "../infrastructure/services/account.service";
import {AccountRepository} from "../infrastructure/respositories/account.repository";
import {AccountController} from "../controllers/account.controller";

const accountService = new AccountService(new AccountRepository());
const accountController = new AccountController(accountService)
const router = express.Router();

router.post('/register', async (req: Request, res:Response) => accountController.registerAccountAndCreateUser(req,res))

export default router;
