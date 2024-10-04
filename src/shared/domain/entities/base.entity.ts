export class BaseEntity {
    id: string;
    created_at: Date | string;
    updated_at: Date | string;
    deleted_at: Date | string | null;

    protected constructor(id: string, created_at: Date | string, updated_at: Date | string, deleted_at: Date | string | null) {
        this.id = id;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }

    static fromDataBase(fields: any): any {
        throw new Error('This method must be overridden in subclasses.');
    }
}

export type BaseEntityToPersist<T extends BaseEntity> = Omit<T,'id'| 'created_at' | 'updated_at' | 'deleted_at'> & {id?:string};
export type BaseEntityFields<T extends BaseEntity> = T