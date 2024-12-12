import {IBaseRepository} from "../../../../../shared/domain/interfaces/repositories/base.repository.interface";
import {RoleEntity, RoleEntityToPersist} from "../../entities/role.entity";

export interface IRoleRepository extends IBaseRepository<RoleEntity, RoleEntityToPersist>{}