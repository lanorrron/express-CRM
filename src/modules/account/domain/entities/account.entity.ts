import {BaseEntity, BaseEntityFields, BaseEntityToPersist} from "../../../../shared/domain/entities/base.entity";

export class AccountEntity extends BaseEntity {
    name_organization: string
    owner_user_id?: string


    constructor(id: string, created_at: Date | string, updated_at: Date | string, deleted_at: Date | string | null, name_organization: string, owner_user_id: string | undefined) {
        super(id, created_at, updated_at, deleted_at);
        this.name_organization = name_organization;
        this.owner_user_id = owner_user_id
    }

    static fromDataBase(field: AccountEntityFields): AccountEntity {
        return new AccountEntity(
            field.id,
            field.created_at,
            field.updated_at,
            field.deleted_at,
            field.name_organization,
            field.owner_user_id
        );
    }
}

export type AccountEntityToPersist = BaseEntityToPersist<AccountEntity>
export type AccountEntityFields = BaseEntityFields<AccountEntity>