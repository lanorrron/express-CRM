import express from 'express';
import {AccountService} from "../infrastructure/services/account.service";
import {AccountRepository} from "../infrastructure/respositories/account.repository";
import {AccountController} from "../controllers/account.controller";
import {verifyToken} from "../../../shared/middlewares/verifyToken.middleware";

const accountService = new AccountService(new AccountRepository());
const accountController = new AccountController(accountService)
const router = express.Router();

router.post('/', accountController.registerAccountAndCreateUser.bind(accountController))
router.get('/', verifyToken, accountController.getList.bind(accountController))
router.put('/:id', verifyToken, accountController.updateById.bind(accountController))

export default router;
