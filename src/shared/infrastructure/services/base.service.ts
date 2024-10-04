import {BaseEntity, BaseEntityToPersist} from "../../domain/entities/base.entity";
import {IBaseService} from "../../domain/interfaces/services/base.service.interface";
import {IBaseRepository} from "../../domain/interfaces/repositories/base.repository.interface";

export class BaseService<T extends BaseEntity, U extends BaseEntityToPersist<T>> implements IBaseService<T, U> {
    protected readonly repository: IBaseRepository<T, U>;

    constructor(repository: IBaseRepository<T, U>) {
        this.repository = repository
    }

    create(fields: Omit<U, 'created_at' | 'updated_at' | 'deleted_at'>): Promise<T> {
        const currentTimestamp = new Date();
        const fieldsToCreate = {
            ...fields,
            created_at: currentTimestamp,
            updated_at: currentTimestamp,
            deleted_at: null
        };
        return this.repository.create(fieldsToCreate as unknown as U)
    }

    findOne(query: Partial<U>): Promise<T | null> {
        return this.repository.findOne(query)
    }

    getById(id: string): Promise<T | null> {
        return this.repository.getById(id)
    }
}