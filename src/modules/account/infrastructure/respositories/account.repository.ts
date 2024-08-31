import {BaseRepository} from "../../../../shared/infrastructure/repositories/base.repository";
import {AccountEntity, AccountEntityToPersist} from "../../domain/entities/account.entity";
import {IAccountRepository} from "../../domain/interfaces/repositories/account.repository.interface";
import {getAccountModel} from "../models/account.model";
import {hash} from "bcrypt";

export class AccountRepository extends BaseRepository<AccountEntity, AccountEntityToPersist> implements IAccountRepository {

    constructor() {
        super(getAccountModel(), AccountEntity.fromDataBase);
    }

    async create(fields: AccountEntityToPersist): Promise<AccountEntity> {

        const existAccount = await this.findOne({ email: fields.email });
        if (existAccount) {
            throw new Error('An account with this email already exists');
        }

            // Hash te password
            if (fields.password) {
                fields.password = await hash(fields.password, 10);
                console.log('Hashed password:', fields.password);
            }

            // create account
            return super.create(fields);
    }
}