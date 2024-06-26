import {BaseEntity, BaseEntityFields, BaseEntityToPersist} from "../../../../shared/domain/entities/base.entity";

export class AccountEntity extends BaseEntity {
    email: string;
    password: string;


    constructor(id: string, created_at: Date | string, updated_at: Date | string, deleted_at: Date | string | null, email: string, password: string) {
        super(id, created_at, updated_at, deleted_at);
        this.email = email;
        this.password = password;
    }
    static fromDataBase(fields: AccountEntityFields): AccountEntity {
        return new AccountEntity(
            fields.id,
            fields.created_at,
            fields.updated_at,
            fields.deleted_at,
            fields.email,
            fields.password
        );
    }
}

export type AccountEntityToPersist = BaseEntityToPersist<AccountEntity>
export type AccountEntityFields = BaseEntityFields<AccountEntity>