import {NextFunction, Request, Response} from "express";
import {verify} from 'jsonwebtoken'
import {sendError} from "../../../shared/utils/responseHandlers";

export const VerifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json(sendError('No token provided', 401));
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json(sendError('No token provided', 401));
    }

    try {
        (req as any).user = verify(token, process.env.JWT_SECRET || 'default_secret');

        next();
    } catch (err) {
        return res.status(401).json(sendError('Invalid token', 401))
    }
};