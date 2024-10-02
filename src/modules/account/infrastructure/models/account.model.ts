// src/modules/account/infrastructure/models/account.model.ts
import { Model, DataTypes } from 'sequelize';
import { AccountEntity } from '../../domain/entities/account.entity';
import { mainSequelize } from '../../../../config/DB/mysql';
import {UserModel} from "../../../users/infrastructure/models/user.model";

export class AccountModel extends Model<AccountEntity> implements AccountEntity {
    public id!: string;
    public created_at!: Date;
    public updated_at!: Date;
    public deleted_at!: Date | null;
    public name_organization!: string;
    public phone_number!: string;
    public user_id!: string;
}

let isInitialized = false;

export const getAccountModel = () => {
    if (!isInitialized) {
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
            name_organization: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            phone_number: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            user_id: {
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                    model: UserModel,
                    key: 'id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            }
        }, {
            sequelize: mainSequelize,
            modelName: 'account',
            tableName: 'accounts',
            timestamps: true,
            paranoid: true,
        });

        isInitialized = true;

        AccountModel.belongsTo(UserModel, {
            foreignKey: 'user_id',
            as: 'User',
        });
    }
    return AccountModel;
};
