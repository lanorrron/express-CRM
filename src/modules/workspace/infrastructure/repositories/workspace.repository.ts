import {BaseRepository} from "../../../../shared/infrastructure/repositories/base.repository";
import {WorkspaceEntity, WorkspaceEntityToPersist} from "../../domain/entities/workspace.entity";
import {IWorkspaceRepository} from "../../domain/interfaces/repositories/workspace.repository.interface";
import {WorkspaceModel} from "../model/workspace.model";

export class WorkspaceRepository extends BaseRepository<WorkspaceEntity, WorkspaceEntityToPersist> implements IWorkspaceRepository{
    constructor() {
        super(WorkspaceModel, WorkspaceEntity.fromDataBase);
    }
}