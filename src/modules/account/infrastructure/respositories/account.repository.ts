import {BaseRepository} from "../../../../shared/infrastructure/repositories/base.repository";
import {AccountEntity, AccountEntityToPersist} from "../../domain/entities/account.entity";
import {IAccountRepository} from "../../domain/interfaces/repositories/account.repository.interface";
import {AccountModel} from "../models/account.model";

export class AccountRepository extends BaseRepository<AccountEntity, AccountEntityToPersist> implements IAccountRepository {

    constructor() {
        super(AccountModel, AccountEntity.fromDataBase);
    }
}