"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountController = void 0;
const responseHandlers_1 = require("../../../shared/utils/responseHandlers");
const gError_entity_1 = require("../../../shared/domain/entities/gError.entity");
const jsonwebtoken_1 = require("jsonwebtoken");
const user_service_1 = require("../../users/infrastructure/services/user.service");
const user_repository_1 = require("../../users/infrastructure/respositories/user.repository");
const mysql_1 = require("../../../config/DB/mysql");
const JWT_SECRET = process.env.JWT_SECRET;
class AccountController {
    constructor(accountService) {
        this.accountService = accountService;
        this.userService = new user_service_1.UserService(new user_repository_1.UserRepository());
    }
    registerAccountAndCreateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield mysql_1.mainSequelize.transaction();
            try {
                const { account, user } = req.body;
                const createdUser = yield this.userService.create(user);
                const accountWithUserId = Object.assign(Object.assign({}, account), { user_id: createdUser.id });
                yield this.accountService.create(accountWithUserId);
                const token = (0, jsonwebtoken_1.sign)({ createdUser }, JWT_SECRET, { expiresIn: '1h' });
                yield transaction.commit();
                res.status(200).json((0, responseHandlers_1.sendSuccess)('Account created', { token }));
            }
            catch (error) {
                yield transaction.rollback();
                console.log(error);
                if (error instanceof gError_entity_1.GError && error.statusCode === 409) {
                    res.status(409).json((0, responseHandlers_1.sendError)(error.message, error.statusCode));
                }
                else {
                    res.status(500).json((0, responseHandlers_1.sendError)('Internal Server Error', 500));
                }
            }
        });
    }
}
exports.AccountController = AccountController;
