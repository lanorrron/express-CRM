import {BaseEntity, BaseEntityToPersist} from "../../entities/base.entity";
import {NonUpdatableFields} from "../repositories/base.repository.interface";
import {IPagedResponse, PagedType} from "../../types/pageResponse.interface";

export interface IBaseService<T extends BaseEntity, U extends BaseEntityToPersist<T>> {

    create(fields: U): Promise<T>;
    findOne(field:U): Promise<T | null>
    getById(id: string): Promise<T | null>;
    /*
    updateById(id: string, fields: Partial<NonUpdatableFields<T>>): Promise<T | null>;

    deleteById(id: string): Promise<T | null>;

    getById(id: string): Promise<T | null>;

    getManyPaged(params: PagedType): Promise<IPagedResponse<Array<T>>>*/
}