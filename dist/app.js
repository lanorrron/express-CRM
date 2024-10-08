"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use('/api', routes_1.default); // Esto usará las rutas en /api/accounts
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
});
exports.default = app;
