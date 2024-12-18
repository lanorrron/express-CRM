import {RoleRepository} from "../infrastructure/repositories/role.repository";
import {RoleService} from "../infrastructure/services/role.service";
import express from "express";
import {RoleController} from "../controller/role.controller";
import {verifyToken} from "../../../shared/middlewares/verifyToken.middleware";

const roleService = new RoleService(new RoleRepository())
const roleController = new RoleController(roleService)
const router = express.Router()

router.post('/', verifyToken, roleController.createRole.bind(roleController))
router.put('/:id', verifyToken, roleController.updateRoleById.bind(roleController))
router.delete('/:id', verifyToken, roleController.deleteById.bind(roleController))
router.get('/', verifyToken, roleController.getAll.bind(roleController))

export default router