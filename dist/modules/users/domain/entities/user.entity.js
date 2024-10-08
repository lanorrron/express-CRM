"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const base_entity_1 = require("../../../../shared/domain/entities/base.entity");
class UserEntity extends base_entity_1.BaseEntity {
    constructor(id, created_at, updated_at, deleted_at, first_name, last_name, email, role, password) {
        super(id, created_at, updated_at, deleted_at);
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.role = role;
        this.password = password;
    }
    static fromDataBase(field) {
        return new UserEntity(field.id, field.created_at, field.updated_at, field.deleted_at, field.first_name, field.last_name, field.email, field.role, field.password);
    }
}
exports.UserEntity = UserEntity;
