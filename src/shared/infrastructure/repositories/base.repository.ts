import {BaseEntity, BaseEntityFields, BaseEntityToPersist} from "../../domain/entities/base.entity";
import {IBaseRepository} from "../../domain/interfaces/repositories/base.repository.interface";
import {Model, ModelStatic, WhereOptions} from "sequelize";

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
    async findOne(query: Partial<U>): Promise<T | null> {
        try {
            const result = await this.model.findOne({ where: query as WhereOptions });
            return result ? this.parser(result.toJSON()) : null;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw new Error('An error occurred while trying to find the item');
        }
    }

}