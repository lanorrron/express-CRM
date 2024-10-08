"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountEntity = void 0;
const base_entity_1 = require("../../../../shared/domain/entities/base.entity");
class AccountEntity extends base_entity_1.BaseEntity {
    constructor(id, created_at, updated_at, deleted_at, name_organization, phone_number, user_id) {
        super(id, created_at, updated_at, deleted_at);
        this.name_organization = name_organization;
        this.phone_number = phone_number;
        this.user_id = user_id;
    }
    static fromDataBase(field) {
        return new AccountEntity(field.id, field.created_at, field.updated_at, field.deleted_at, field.name_organization, field.phone_number, field.user_id);
    }
}
exports.AccountEntity = AccountEntity;
