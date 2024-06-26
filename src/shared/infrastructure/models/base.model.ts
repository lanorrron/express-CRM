import {DataTypes, Model} from "sequelize";

export class BaseModel extends Model {
    public id!: string;
    public created_at!: Date;
    public updated_at!: Date;
    public deleted_at!: null | Date

    static initializeBaseModel() {
        return {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            deleted_at: {
                type: DataTypes.DATE,
                allowNull: true,

            }
        }
    }
}