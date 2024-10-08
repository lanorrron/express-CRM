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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_service_1 = require("../infrastructure/auth.service");
const auth_controller_1 = require("../controller/auth.controller");
const verifyToken_middleware_1 = require("../middlewares/verifyToken.middleware");
const router = express_1.default.Router();
const authService = new auth_service_1.AuthService();
const authController = new auth_controller_1.AuthController(authService);
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return authController.login(req, res); }));
router.get('/verifyMe', verifyToken_middleware_1.verifyToken, verifyToken_middleware_1.verifyMe);
exports.default = router;
