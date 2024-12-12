import {BaseService} from "../../../../shared/infrastructure/services/base.service";
import {RoleEntity, RoleEntityToPersist} from "../../domain/entities/role.entity";
import {IRoleService} from "../../domain/interfaces/services/role.service.interface";
import {IRoleRepository} from "../../domain/interfaces/repositories/role.repository.interface";

export class RoleService extends BaseService<RoleEntity, RoleEntityToPersist> implements IRoleService{

    constructor(protected repository: IRoleRepository) {
        super(repository);
    }
}