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
exports.AuthController = void 0;
const responseHandlers_1 = require("../../../shared/utils/responseHandlers");
const gError_entity_1 = require("../../../shared/domain/entities/gError.entity");
class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const tokenResponse = yield this.authService.login(email, password);
                return res.status(200).json((0, responseHandlers_1.sendSuccess)('logging successfully', tokenResponse));
            }
            catch (error) {
                console.log(error);
                if (error instanceof gError_entity_1.GError) {
                    return res.status(error.statusCode).json((0, responseHandlers_1.sendError)(error.message, error.statusCode));
                }
                else {
                    return res.status(500).json((0, responseHandlers_1.sendError)('Internal server error', 500));
                }
            }
        });
    }
}
exports.AuthController = AuthController;
