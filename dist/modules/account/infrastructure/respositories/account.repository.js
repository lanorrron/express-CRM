"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRepository = void 0;
const base_repository_1 = require("../../../../shared/infrastructure/repositories/base.repository");
const account_entity_1 = require("../../domain/entities/account.entity");
const account_model_1 = require("../models/account.model");
class AccountRepository extends base_repository_1.BaseRepository {
    constructor() {
        super((0, account_model_1.getAccountModel)(), account_entity_1.AccountEntity.fromDataBase);
    }
}
exports.AccountRepository = AccountRepository;
