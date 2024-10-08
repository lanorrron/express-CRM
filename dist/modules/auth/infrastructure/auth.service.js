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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const user_service_1 = require("../../users/infrastructure/services/user.service");
const user_repository_1 = require("../../users/infrastructure/respositories/user.repository");
const bcrypt_1 = require("bcrypt");
const gError_entity_1 = require("../../../shared/domain/entities/gError.entity");
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthService {
    constructor() {
        this.userService = new user_service_1.UserService(new user_repository_1.UserRepository());
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findOne({ email });
            if (!user || !(yield (0, bcrypt_1.compare)(password, user.password))) {
                throw new gError_entity_1.GError('Invalid credentials', 401);
            }
            const token = (0, jsonwebtoken_1.sign)(user, process.env.JWT_SECRET, { expiresIn: '1h' });
            const { password: _ } = user, userWithoutPassword = __rest(user, ["password"]);
            return Promise.resolve({ token, user: userWithoutPassword });
        });
    }
    logout(userId) {
        return Promise.resolve(undefined);
    }
}
exports.AuthService = AuthService;
