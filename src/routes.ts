import express from "express";
import accountRoute from "./modules/account/routes/account.route";
import authRoutes from "./modules/auth/routes/auth.routes";

const router = express.Router()
router.use('/accounts', accountRoute)
router.use('/auth', authRoutes)

export default router

