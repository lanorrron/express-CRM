import express from "express";
import accountRoute from "./modules/accounts/routes/account.route";

const router = express.Router()
router.use('/accounts', accountRoute)

export default router