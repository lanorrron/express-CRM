import {BaseEntity, BaseEntityFields, BaseEntityToPersist} from "../../../../shared/domain/entities/base.entity";

export class AccountEntity extends BaseEntity {
    name_organization: string
    phone_number: string;
    user_id: string


    constructor(id: string, created_at: Date | string, updated_at: Date | string, deleted_at: Date | string | null, name_organization: string, phone_number: string, user_id: string) {
        super(id, created_at, updated_at, deleted_at);
        this.name_organization = name_organization;
        this.phone_number = phone_number;
        this.user_id = user_id

    }

    static fromDataBase(fields: AccountEntityFields): AccountEntity {
        return new AccountEntity(
            fields.id,
            fields.created_at,
            fields.updated_at,
            fields.deleted_at,
            fields.name_organization,
            fields.phone_number,
            fields.user_id
        );
    }
}

export type AccountEntityToPersist = BaseEntityToPersist<AccountEntity>
export type AccountEntityFields = BaseEntityFields<AccountEntity>