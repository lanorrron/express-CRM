"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyMe = exports.verifyToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const responseHandlers_1 = require("../../../shared/utils/responseHandlers");
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json((0, responseHandlers_1.sendError)('No token provided', 401));
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json((0, responseHandlers_1.sendError)('No token provided', 401));
    }
    try {
        req.user = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET || 'default_secret');
        next();
    }
    catch (err) {
        return res.status(401).json((0, responseHandlers_1.sendError)('Invalid token', 401));
    }
};
exports.verifyToken = verifyToken;
function verifyMe(req, res) {
    return res.status(200).json((0, responseHandlers_1.sendSuccess)('user verified', { user: req.user }));
}
exports.verifyMe = verifyMe;
