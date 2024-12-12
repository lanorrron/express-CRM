import {RoleRepository} from "../infrastructure/repositories/role.repository";
import {RoleService} from "../infrastructure/services/role.service";
import express from "express";
import {RoleController} from "../controller/role.controller";

const roleService = new RoleService(new RoleRepository())
const roleController = new RoleController(roleService)
const router = express.Router()

router.post('/', roleController.createRole.bind(roleController))
router.put('/:id', roleController.updateRoleById.bind(roleController))
router.delete('/:id',roleController.deleteById.bind(roleController))
router.get('/', roleController.getAll.bind(roleController))

export default router