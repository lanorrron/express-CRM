import {BaseEntity, BaseEntityToPersist} from "../../entities/base.entity";
import {IPagedResponse, PagedType} from "../../types/pageResponse.interface";


export type NonUpdatableFields<T> = Omit<T, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>

export interface IBaseRepository<T extends BaseEntity, U extends BaseEntityToPersist<T>> {

    create(fields: U, options?: Object): Promise<T>;

    findOne(field: Partial<U>): Promise<T | null>

    getById(id: string): Promise<T | null>;

    updateById(id: string, fields: Partial<NonUpdatableFields<T>>): Promise<T | null>;

    deleteById(id: string): Promise<T | null | number>;

    getManyPages(params: PagedType): Promise<IPagedResponse<Array<T>>>;

    findAll(params?: { where?: Partial<U>; order?: Array<[keyof T, 'ASC' | 'DESC']>; attributes?: Array<keyof T>}): Promise<Array<T>>;

}