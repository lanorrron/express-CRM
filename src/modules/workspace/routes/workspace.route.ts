import express from "express";
import {WorkspaceService} from "../infrastructure/services/workspace.service";
import {WorkspaceRepository} from "../infrastructure/repositories/workspace.repository";
import {WorkspaceController} from "../controller/workspace.controller";
import {verifyToken} from "../../../shared/middlewares/verifyToken.middleware";

const router = express.Router()
const workspaceService = new WorkspaceService(new WorkspaceRepository())
const workspaceController = new WorkspaceController(workspaceService)

router.post('/', verifyToken, workspaceController.createWorkspace.bind(workspaceController))

export default router