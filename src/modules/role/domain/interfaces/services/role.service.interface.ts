import {IBaseService} from "../../../../../shared/domain/interfaces/services/base.service.interface";
import {RoleEntity, RoleEntityToPersist} from "../../entities/role.entity";

export interface IRoleService extends IBaseService<RoleEntity, RoleEntityToPersist>{}