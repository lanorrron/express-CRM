import {BaseEntity, BaseEntityFields, BaseEntityToPersist} from "../../../../shared/domain/entities/base.entity";

export class WorkspaceEntity extends BaseEntity {
    name: string;
    account_id: string

    constructor(id: string, created_at: Date | string, updated_at: Date | string, deleted_at: Date | string | null, name: string, account_id: string) {
        super(id, created_at, updated_at, deleted_at);
        this.name = name;
        this.account_id = account_id;
    }
    static fromDataBase(field: WorkspaceEntityFields): WorkspaceEntity{
        return new WorkspaceEntity(field.id, field.created_at, field.updated_at, field.deleted_at, field.name, field.account_id)
    }
}

export type WorkspaceEntityToPersist = BaseEntityToPersist<WorkspaceEntity>
export type WorkspaceEntityFields = BaseEntityFields<WorkspaceEntity>