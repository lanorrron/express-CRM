import {IBaseRepository} from "../../../../../shared/domain/interfaces/repositories/base.repository.interface";
import {UserEntity, UserEntityToPersist} from "../../entities/user.entity";

export interface IUserRepository extends IBaseRepository<UserEntity, UserEntityToPersist>{}
