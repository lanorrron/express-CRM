"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEntity = void 0;
class BaseEntity {
    constructor(id, created_at, updated_at, deleted_at) {
        this.id = id;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }
    static fromDataBase(fields) {
        throw new Error('This method must be overridden in subclasses.');
    }
}
exports.BaseEntity = BaseEntity;
