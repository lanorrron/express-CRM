import {BaseEntity, BaseEntityToPersist} from "../../domain/entities/base.entity";
import {IBaseService} from "../../domain/interfaces/services/base.service.interface";
import {IBaseRepository, NonUpdatableFields} from "../../domain/interfaces/repositories/base.repository.interface";
import {IPagedResponse, PagedType} from "../../domain/types/pageResponse.interface";
import {GError} from "../../domain/entities/gError.entity";
import {CreateOptions, Transaction} from "sequelize";

export class BaseService<T extends BaseEntity, U extends BaseEntityToPersist<T>> implements IBaseService<T, U> {
    protected readonly repository: IBaseRepository<T, U>;

    constructor(repository: IBaseRepository<T, U>) {
        this.repository = repository
    }

    create(fields: Omit<U, 'created_at' | 'updated_at' | 'deleted_at'>, options?: Object): Promise<T> {
        const currentTimestamp = new Date();
        const fieldsToCreate = {
            ...fields,
            created_at: currentTimestamp,
            updated_at: currentTimestamp,
            deleted_at: null
        };
        return this.repository.create(fieldsToCreate as unknown as U, options)
    }

    findOne(query: Partial<U>): Promise<T | null> {
        return this.repository.findOne(query)
    }

    getById(id: string): Promise<T | null> {
        return this.repository.getById(id)
    }

    async updateById(id: string, fields: Partial<NonUpdatableFields<T>>): Promise<T | null> {
        const entityUpdated = await this.repository.updateById(id, fields)
        if(!entityUpdated){
            throw new GError('Account not found', 404)
        }
        return entityUpdated
    }

    async deleteById(id: string): Promise<T | null | number> {
       const result = await this.repository.deleteById(id)
        if(!result){
            throw new GError('role not found', 404)
        }
        return result
    }

    getManyPaged(params: PagedType): Promise<IPagedResponse<Array<T>>> {
        return this.repository.getManyPages(params)
    }
    findAll(params?: { where?: Partial<U>; order?: Array<[keyof T, ("ASC" | "DESC")]>; attributes?: Array<keyof T> }): Promise<Array<T>> {
        const queryOptions: any = {
            where: params?.where,
        };

        if (params?.order) {
            queryOptions.order = params.order;
        }

        if (params?.attributes) {
            queryOptions.attributes = params.attributes;
        }
        return this.repository.findAll(queryOptions)
    }
}