import {BaseRepository} from "../../../../shared/infrastructure/repositories/base.repository";
import {AccountEntity, AccountEntityToPersist} from "../../domain/entities/account.entity";
import {IAccountRepository} from "../../domain/interfaces/repositories/account.repository.interface";
import {getAccountModel} from "../models/account.model";
import {hash} from "bcrypt";
import {GError} from "../../../../shared/domain/entities/gError.entity";

export class AccountRepository extends BaseRepository<AccountEntity, AccountEntityToPersist> implements IAccountRepository {

    constructor() {
        super(getAccountModel(), AccountEntity.fromDataBase);
    }

    async createAccount(fields: AccountEntityToPersist): Promise<Omit<AccountEntity, 'password'> > {

        const existAccount = await this.findOne({email: fields.email});
        if (existAccount) {
            throw new GError('An account with this email already exists', 409)
        }

        // Hash te password
        if (fields.password) {
            fields.password = await hash(fields.password, 10);
        }

        // create account
        const newItem = await super.create(fields);
        const {password, ...accountWithoutPassword} = newItem


        return accountWithoutPassword
    }

}