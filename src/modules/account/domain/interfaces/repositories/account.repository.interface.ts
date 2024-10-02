import {IBaseRepository} from "../../../../../shared/domain/interfaces/repositories/base.repository.interface";
import {AccountEntity, AccountEntityToPersist} from "../../entities/account.entity";

export interface IAccountRepository extends IBaseRepository<AccountEntity, AccountEntityToPersist>{
    
}
