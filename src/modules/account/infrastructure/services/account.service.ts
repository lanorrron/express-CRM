import {BaseService} from "../../../../shared/infrastructure/services/base.service";
import {AccountEntity, AccountEntityToPersist} from "../../domain/entities/account.entity";
import {IAccountService} from "../../domain/interfaces/services/account.service.interface";
import {IBaseRepository} from "../../../../shared/domain/interfaces/repositories/base.repository.interface";

export class AccountService extends BaseService<AccountEntity, AccountEntityToPersist> implements IAccountService {
    constructor(repository: IBaseRepository<AccountEntity, AccountEntityToPersist>) {
        super(repository)
    }
}