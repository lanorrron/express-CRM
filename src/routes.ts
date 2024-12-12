import express from "express";
import AccountRoute from "./modules/account/routes/account.route";
import AuthRoute from "./modules/auth/routes/auth.route";
import RoleRoute from "./modules/role/routes/role.route";

const router = express.Router()
router.use('/accounts', AccountRoute)
router.use('/auth', AuthRoute)
router.use('/role', RoleRoute)

export default router

