import {BaseEntity, BaseEntityFields, BaseEntityToPersist} from "../../domain/entities/base.entity";
import {IBaseRepository} from "../../domain/interfaces/repositories/base.repository.interface";
import {Model, ModelStatic} from "sequelize";

type Parser<T extends BaseEntity> = (fields: BaseEntityFields<T>) => T;

export class BaseRepository<T extends BaseEntity, U extends BaseEntityToPersist<T>> implements IBaseRepository<T, U> {
    private readonly parser: Parser<T>;
    private model: ModelStatic<Model<any, any>>;

    constructor(model: ModelStatic<Model<any, any>>, parser: Parser<T>) {
        this.model = model;
        this.parser = parser;
    }
   async create(fields: U): Promise<T> {
        const newItem = await this.model.create(fields);

       return this.parser(newItem.get({ plain: true }));
    }
}