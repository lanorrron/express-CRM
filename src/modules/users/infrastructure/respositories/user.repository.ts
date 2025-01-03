import {BaseRepository} from "../../../../shared/infrastructure/repositories/base.repository";
import {UserEntity, UserEntityToPersist} from "../../domain/entities/user.entity";
import {IUserRepository} from "../../domain/interfaces/repositories/user.repository.interface";
import {UserModel} from "../models/user.model";
import {GError} from "../../../../shared/domain/entities/gError.entity";
import {hash} from "bcrypt";
import {CreateOptions} from "sequelize";

export class UserRepository extends BaseRepository<UserEntity, UserEntityToPersist> implements IUserRepository {

    constructor() {
        super(UserModel, UserEntity.fromDataBase);
    }

    override async create(fields: UserEntityToPersist, options?:Object): Promise<UserEntity> {
        const optionsObject = (options || {}) as CreateOptions
        const {email} = fields
        const existEmail = await super.findOne({email })
        if(existEmail){
            throw new GError('Email already exist',409)
        }
        if(fields.password){
            fields.password = await hash(fields.password, 10)
        }

        return await super.create(fields, optionsObject);
    }
}