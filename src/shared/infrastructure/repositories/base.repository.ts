import {BaseEntity, BaseEntityFields, BaseEntityToPersist} from "../../domain/entities/base.entity";
import {IBaseRepository, NonUpdatableFields} from "../../domain/interfaces/repositories/base.repository.interface";
import {CreateOptions, Model, ModelStatic, Op} from "sequelize";
import {IPagedResponse, PagedType} from "../../domain/types/pageResponse.interface";

type Parser<T extends BaseEntity> = (fields: BaseEntityFields<T>) => T;

export class BaseRepository<T extends BaseEntity, U extends BaseEntityToPersist<T>> implements IBaseRepository<T, U> {
    private readonly parser: Parser<T>;
    private model: ModelStatic<Model<any, any>>;

    constructor(model: ModelStatic<Model<any, any>>, parser: Parser<T>) {
        this.model = model;
        this.parser = parser;
    }

    async create(fields: U, options?: Object): Promise<T> {
        const optionsObject = (options || {}) as CreateOptions
        const newItem = await this.model.create(fields, optionsObject);

        return this.parser(newItem.get({plain: true}));
    }

    async findOne(field: Partial<U>): Promise<T | null> {
        const result = await this.model.findOne({where: field});
        return result ? result.toJSON() as T : null;
    }

    async getById(id: string): Promise<T | null> {
        const result = await this.model.findOne({where: {id}})
        return result ? this.parser(result.toJSON()) : null;
    }

    async updateById(id: string, fields: Partial<NonUpdatableFields<T>>): Promise<T | null> {
        const record = await this.model.findOne({where: {id}});
        if (!record) {
            return null;
        }

        await record.update(fields);

        return this.parser(record.toJSON())
    }

    async deleteById(id: string): Promise<T | null | number> {
        const record = await this.model.findOne({where: {id: id}})
        if(!record){
            return null
        }
        return this.model.destroy({where: {id: id}})
    }

    async getManyPages(params: PagedType): Promise<IPagedResponse<Array<T>>> {
        const {page, size, search, ...filters} = params
        const limit = size || 10;
        const currentPage = page || 1;
        const offset = (currentPage - 1) * limit;
        let where: Record<string, any> = {}

        await Object.entries(filters).forEach(([key, value]) => {
            where[key] = value;
        })
        const searchConditions = search ? await Object.entries(search).reduce((acc, [key, value]) => {
            acc[key] = {[Op.like]: `%${value}%`};
            return acc;
        }, {} as Record<string, any>) : {}
        if (Object.keys(searchConditions).length > 0) {
            where = {
                ...where,
                [Op.or]: searchConditions
            }
        }
        const {rows, count} = await this.model.findAndCountAll({where, limit, offset})
        const items: Array<T> = rows.map((item: any) => this.parser(item.toJSON()));
        const totalPages = Math.ceil(count / limit)

        return {
            items,
            currentPage: currentPage,
            limit: limit,
            totalPages,
            total: count
        }
    }
    async findAll(params?: { where?: Partial<U>; order?: Array<[keyof T, ("ASC" | "DESC")]>; attributes?: Array<keyof T> }): Promise<Array<T>> {
        const queryOptions: any = {
            where: params?.where,
        };

        if (params?.order) {
            queryOptions.order = params.order;
        }

        if (params?.attributes) {
            queryOptions.attributes = params.attributes;
        }
        const result =  await this.model.findAll(queryOptions)

        return result.map((item) => this.parser(item.toJSON()))

    }
}
