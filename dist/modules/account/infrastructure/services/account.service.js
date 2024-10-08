"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountService = void 0;
const base_service_1 = require("../../../../shared/infrastructure/services/base.service");
class AccountService extends base_service_1.BaseService {
    constructor(repository) {
        super(repository);
        this.repository = repository;
    }
}
exports.AccountService = AccountService;
