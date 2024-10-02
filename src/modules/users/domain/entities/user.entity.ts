import {BaseEntity, BaseEntityFields, BaseEntityToPersist} from "../../../../shared/domain/entities/base.entity";

export class UserEntity extends BaseEntity {
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    password: string;

    constructor(id: string, created_at: Date | string, updated_at: Date | string, deleted_at: Date | string | null, first_name: string, last_name: string, email: string, role: string, password: string) {
        super(id, created_at, updated_at, deleted_at);
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.role = role;
        this.password = password;
    }

    static fromDataBase(field: UserEntityFields): UserEntity {
        return new UserEntity(field.id, field.created_at, field.updated_at, field.deleted_at, field.first_name, field.last_name, field.email, field.role, field.password)
    }

}

export type UserEntityFields = BaseEntityFields<UserEntity>
export type UserEntityToPersist = BaseEntityToPersist<UserEntity>
