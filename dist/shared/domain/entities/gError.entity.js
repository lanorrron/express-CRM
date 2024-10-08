"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GError = void 0;
class GError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.GError = GError;
