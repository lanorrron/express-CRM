import {IBaseService} from "../../../../../shared/domain/interfaces/services/base.service.interface";
import {WorkspaceEntity, WorkspaceEntityToPersist} from "../../entities/workspace.entity";

export interface IWorkspaceService extends IBaseService<WorkspaceEntity, WorkspaceEntityToPersist>{}