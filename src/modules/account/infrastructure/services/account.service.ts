import {BaseService} from "../../../../shared/infrastructure/services/base.service";
import {AccountEntity, AccountEntityToPersist} from "../../domain/entities/account.entity";
import {IAccountService} from "../../domain/interfaces/services/account.service.interface";
import {IAccountRepository} from "../../domain/interfaces/repositories/account.repository.interface";
import {UserEntity, UserEntityToPersist} from "../../../users/domain/entities/user.entity";
import {IUserRepository} from "../../../users/domain/interfaces/repositories/user.repository.interface";
import {UserRepository} from "../../../users/infrastructure/respositories/user.repository";
import {UserAccountModel} from "../../../users/infrastructure/models/user-account.model";
import {mainSequelize} from "../../../../config/DB/mysql";

export class AccountService extends BaseService<AccountEntity, AccountEntityToPersist> implements IAccountService {
    private repositoryUser = new UserRepository()

    constructor(protected repository: IAccountRepository) {
        super(repository)
    }

    async createAccountAndUser(fieldsUser: UserEntityToPersist, fieldsAccount: AccountEntityToPersist): Promise<Object> {
        const transaction = await mainSequelize.transaction()
        try {
            const account = await this.repository.create(fieldsAccount, {transaction})
            const user = await this.repositoryUser.create(fieldsUser, {transaction})
            await UserAccountModel.create({account_id: account.id, user_id: user.id}, {transaction})
            await transaction.commit()
            return {account, user}
        } catch (error) {
            await transaction.rollback()
            throw error
        }

    }
}