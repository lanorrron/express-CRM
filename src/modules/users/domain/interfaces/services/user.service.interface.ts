import {IBaseService} from "../../../../../shared/domain/interfaces/services/base.service.interface";
import {UserEntity, UserEntityToPersist} from "../../entities/user.entity";

export interface IUserService extends IBaseService<UserEntity, UserEntityToPersist>{}