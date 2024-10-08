"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = exports.sendSuccess = void 0;
const sendSuccess = (message, data) => {
    return { success: true, status_code: 200, message, data, error: false, };
};
exports.sendSuccess = sendSuccess;
const sendError = (message, statusCode, data) => {
    const messageError = message !== null && message !== void 0 ? message : 'internal server error';
    return {
        error: true, message: messageError, status_code: statusCode, data, success: false,
    };
};
exports.sendError = sendError;
