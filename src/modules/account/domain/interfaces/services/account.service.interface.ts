import {IBaseService} from "../../../../../shared/domain/interfaces/services/base.service.interface";
import {AccountEntity, AccountEntityToPersist} from "../../entities/account.entity";

export interface IAccountService extends IBaseService<AccountEntity, AccountEntityToPersist> {

    createAccount(fields: AccountEntityToPersist):Promise<Omit<AccountEntity, 'password'>>
}