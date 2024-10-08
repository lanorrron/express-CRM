"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const base_service_1 = require("../../../../shared/infrastructure/services/base.service");
const user_repository_1 = require("../respositories/user.repository");
class UserService extends base_service_1.BaseService {
    constructor(repository = new user_repository_1.UserRepository()) {
        super(repository);
        this.repository = repository;
    }
}
exports.UserService = UserService;
