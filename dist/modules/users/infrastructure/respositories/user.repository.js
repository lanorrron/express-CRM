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
exports.UserRepository = void 0;
const base_repository_1 = require("../../../../shared/infrastructure/repositories/base.repository");
const user_entity_1 = require("../../domain/entities/user.entity");
const user_model_1 = require("../models/user.model");
const gError_entity_1 = require("../../../../shared/domain/entities/gError.entity");
const bcrypt_1 = require("bcrypt");
class UserRepository extends base_repository_1.BaseRepository {
    constructor() {
        super((0, user_model_1.getUserModel)(), user_entity_1.UserEntity.fromDataBase);
    }
    create(fields) {
        const _super = Object.create(null, {
            findOne: { get: () => super.findOne },
            create: { get: () => super.create }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = fields;
            const existEmail = yield _super.findOne.call(this, { email });
            if (existEmail) {
                throw new gError_entity_1.GError('Email already exist', 409);
            }
            if (fields.password) {
                fields.password = yield (0, bcrypt_1.hash)(fields.password, 10);
            }
            return yield _super.create.call(this, fields);
        });
    }
}
exports.UserRepository = UserRepository;
