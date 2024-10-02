import {BaseService} from "../../../../shared/infrastructure/services/base.service";
import {AccountEntity, AccountEntityToPersist} from "../../domain/entities/account.entity";
import {IAccountService} from "../../domain/interfaces/services/account.service.interface";
import {IAccountRepository} from "../../domain/interfaces/repositories/account.repository.interface";

export class AccountService extends BaseService<AccountEntity, AccountEntityToPersist> implements IAccountService {
    constructor( protected repository:IAccountRepository) {
        super(repository)
    }
}