import {BaseEntity, BaseEntityToPersist} from "../../entities/base.entity";
import {NonUpdatableFields} from "../repositories/base.repository.interface";
import {IPagedResponse, PagedType} from "../../types/pageResponse.interface";

export interface IBaseService<T extends BaseEntity, U extends BaseEntityToPersist<T>> {

    create(fields: U, options?: Object): Promise<T>;

    findOne(query: Partial<U>): Promise<T | null>

    getById(id: string): Promise<T | null>;

    updateById(id: string, fields: Partial<NonUpdatableFields<T>>, options?: Object): Promise<T | null>;

    deleteById(id: string): Promise<T | null | number >;

    getById(id: string): Promise<T | null>;

    getManyPaged(params: PagedType): Promise<IPagedResponse<Array<T>>>

    findAll(params?: { where?: Partial<U>; order?: Array<[keyof T, 'ASC' | 'DESC']>; attributes?: Array<keyof T>}): Promise<Array<T>>;
}