import {BaseService} from "../../../../shared/infrastructure/services/base.service";
import {WorkspaceEntity, WorkspaceEntityToPersist} from "../../domain/entities/workspace.entity";
import {IWorkspaceService} from "../../domain/interfaces/services/workspace.service.interface";
import {IWorkspaceRepository} from "../../domain/interfaces/repositories/workspace.repository.interface";

export class WorkspaceService extends BaseService<WorkspaceEntity, WorkspaceEntityToPersist> implements IWorkspaceService{
    constructor(protected repository: IWorkspaceRepository) {
        super(repository);
    }
}