import {AccountService} from "../infrastructure/services/account.service";
import {AccountEntity} from "../domain/entities/account.entity";
import {sendError, sendSuccess} from "../../../shared/utils/responseHandlers";
import {GError} from "../../../shared/domain/entities/gError.entity";
import {Response, Request} from "express";

import {sign} from 'jsonwebtoken'
import {UserService} from "../../users/infrastructure/services/user.service";
import {UserRepository} from "../../users/infrastructure/respositories/user.repository";
import {mainSequelize} from "../../../config/DB/mysql";
import {UpdateAccountDto} from "../dtos/update.dto";
import {CreatedUserDto} from "../../users/dtos/createdUser.dto";
import {CreateAccountDto} from "../dtos/createAccount.dto";


const JWT_SECRET = process.env.JWT_SECRET

export class AccountController {
    userService = new UserService(new UserRepository())

    constructor(private accountService: AccountService) {
    }

    async registerAccountAndCreateUser(req: Request, res: Response): Promise<Response> {
        const transaction = await mainSequelize.transaction()
        try {
            const {account, user} = req.body;
            const dtoUser = new CreatedUserDto(user)
            const {isValid: isValidDtoUser, errors: errorsDtoUser} = dtoUser.validate()
            if (!isValidDtoUser) {

                throw new GError('validation erros', 400, errorsDtoUser)
            }
            const fullName = dtoUser.first_name + " " + dtoUser.last_name
            const paramsCreateUser = {...dtoUser, full_name: fullName}

            const createdUser = await this.userService.create(paramsCreateUser, {transaction});
            const dtoAccount = new CreateAccountDto(account)
            const {isValid: isValidAccountDto, errors: errorsAccountDto} = dtoAccount.validate()

            if (!isValidAccountDto) {
                throw new GError('validation erros', 400, errorsAccountDto)
            }

            const accountWithUserId: AccountEntity = {...account, owner_user_id: createdUser.id};
            await this.accountService.create(accountWithUserId, {transaction});
            const token = sign({createdUser}, JWT_SECRET!, {expiresIn: '1h'});

            await transaction.commit()
            return res.status(200).json(sendSuccess('Account created', {token}));
        } catch (error: any) {
            await transaction.rollback();
            if (error instanceof GError) {
                return res.status(error.statusCode).json(sendError(error.message, error.statusCode, error.errors ?? []));
            } else {
                return res.status(500).json(sendError('Internal Server Error', 500));
            }
        }
    }

    async updateById(req: Request, res: Response): Promise<Response> {
        const dto = new UpdateAccountDto(req.body)
        const {isValid, errors} = dto.validate()
        const id = req.params.id

        if (!id) {
            return res.status(400).json(sendError('id not found', 400))
        }
        if (!isValid) {
            return res.status(400).json(sendError('validations error', 400, errors))
        }
        try {
            const updatedAccount = await this.accountService.updateById(id, dto)
            return res.status(200).json(sendSuccess('Account updated', {updatedAccount}))
        } catch (error: any) {
            if (error instanceof GError) {
                return res.status(error.statusCode).json(sendError(error.message, error.statusCode))
            }
            return res.status(500).json(sendError('internal server error', 500))
        }
    }

    async getList(req: Request, res: Response): Promise<void> {
        try {
            const {size = 10, page = 1, search, ...filters} = req.query;
            const sizeNumber = Number(size);
            const pageNumber = Number(page)
            const processedFilters: Record<string, string | number> = {}
            Object.entries(filters).forEach(([key, value]) => {
                if (typeof value === 'string') {
                    processedFilters[key] = value;
                } else {
                    processedFilters[key] = String(value)
                }
            })
            let searchObj: Record<string, string | number> = {};
            if (typeof search === 'string') {
                searchObj = JSON.parse(search)
            }
            const paginatedList = await this.accountService.getManyPaged({
                size: sizeNumber,
                page: pageNumber,
                search: searchObj,
                ...processedFilters
            })
            res.status(200).json(sendSuccess('paginated list of Accounts', paginatedList))
        } catch (error: any) {
            res.status(500).json(sendError('internal server error', 500))
        }
    }


}

