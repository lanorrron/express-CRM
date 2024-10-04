import express from "express";
import {AuthService} from "../infrastructure/auth.service";
import {AuthController} from "../controller/auth.controller";
import {Request, Response} from 'express'
import {LoginRequest} from "../domain/types/auth.types";

const router = express.Router()
const authService = new AuthService()
const authController = new AuthController(authService)

router.post('/login', async(req:Request<LoginRequest>, res: Response)=>authController.login(req, res))

export  default router