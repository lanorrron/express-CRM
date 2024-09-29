import {BaseEntity, BaseEntityToPersist} from "../../entities/base.entity";
import {promises} from "dns";
import {IPagedResponse, PagedType} from "../../types/pageResponse.interface";


export type NonUpdatableFields<T> = Omit<T, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>

export interface IBaseRepository<T extends BaseEntity, U extends BaseEntityToPersist<T>> {

    create(fields: U): Promise<T>;
    findOne(field:U): Promise<T | null>
    getById(id: string): Promise<T | null>;

/*    updateById(id: string, fields: Partial<NonUpdatableFields<T>>): Promise<T> | null;

    deleteById(id: string): Promise<T> | null;



    getManyPages(params: PagedType): Promise<IPagedResponse<Array<T>>>;*/

}