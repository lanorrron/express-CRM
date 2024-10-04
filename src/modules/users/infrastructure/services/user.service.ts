import {BaseService} from "../../../../shared/infrastructure/services/base.service";
import {UserEntity, UserEntityToPersist} from "../../domain/entities/user.entity";
import {IUserService} from "../../domain/interfaces/services/user.service.interface";
import {IUserRepository} from "../../domain/interfaces/repositories/user.repository.interface";
import {UserRepository} from "../respositories/user.repository";

export class UserService extends BaseService<UserEntity, UserEntityToPersist> implements IUserService {

    constructor(protected  repository: IUserRepository = new UserRepository()) {
        super(repository)

    }
}