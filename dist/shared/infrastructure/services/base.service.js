"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
class BaseService {
    constructor(repository) {
        this.repository = repository;
    }
    create(fields) {
        const currentTimestamp = new Date();
        const fieldsToCreate = Object.assign(Object.assign({}, fields), { created_at: currentTimestamp, updated_at: currentTimestamp, deleted_at: null });
        return this.repository.create(fieldsToCreate);
    }
    findOne(query) {
        return this.repository.findOne(query);
    }
    getById(id) {
        return this.repository.getById(id);
    }
}
exports.BaseService = BaseService;
