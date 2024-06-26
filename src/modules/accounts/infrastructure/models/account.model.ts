import { Model, DataTypes } from 'sequelize';
import { AccountEntity } from '../../domain/entities/account.entity';
import {mainSequelize} from "../../../../config/DB/mysql";

export class AccountModel extends Model<AccountEntity> implements AccountEntity {
    public id!: string;
    public created_at!: Date;
    public updated_at!: Date;
    public deleted_at!: Date | null;
    public email!: string;
    public password!: string;
}

export const initAccountModel = () => {
    AccountModel.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize: mainSequelize, // Usa la instancia renombrada
        modelName: 'Account',
        tableName: 'accounts',
        timestamps: true,
        paranoid: true // This enables the `deletedAt` functionality
    });
};
