import {IBaseRepository} from "../../../../../shared/domain/interfaces/repositories/base.repository.interface";
import {WorkspaceEntity, WorkspaceEntityToPersist} from "../../entities/workspace.entity";

export interface IWorkspaceRepository extends IBaseRepository<WorkspaceEntity, WorkspaceEntityToPersist>{}