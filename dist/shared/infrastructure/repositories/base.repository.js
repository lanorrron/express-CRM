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
exports.BaseRepository = void 0;
class BaseRepository {
    constructor(model, parser) {
        this.model = model;
        this.parser = parser;
    }
    create(fields) {
        return __awaiter(this, void 0, void 0, function* () {
            const newItem = yield this.model.create(fields);
            return this.parser(newItem.get({ plain: true }));
        });
    }
    findOne(field) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.model.findOne({ where: field });
            return result ? result.toJSON() : null;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.model.findOne({ where: { id } });
            return result ? this.parser(result.toJSON()) : null;
        });
    }
}
exports.BaseRepository = BaseRepository;
