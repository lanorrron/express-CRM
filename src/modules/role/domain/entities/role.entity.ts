import {BaseEntity, BaseEntityFields, BaseEntityToPersist} from "../../../../shared/domain/entities/base.entity";

export class RoleEntity extends BaseEntity{
    name: string;

    constructor(id: string, created_at: Date | string, updated_at: Date | string, deleted_at: Date | string | null, name: string) {
        super(id, created_at, updated_at, deleted_at);
        this.name = name;
    }
    static fromDatabase(field: RoleEntityFields): RoleEntity{
        return new RoleEntity(field.id, field.created_at, field.updated_at, field.deleted_at, field.name)
    }
}
export type RoleEntityToPersist = BaseEntityToPersist<RoleEntity>
export type RoleEntityFields = BaseEntityFields<RoleEntity>