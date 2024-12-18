import {Model, DataTypes, Sequelize} from 'sequelize';
import { mainSequelize } from '../../../../config/DB/mysql';
import {AccountEntityToPersist} from "../../domain/entities/account.entity";

export class AccountModel extends Model<AccountEntityToPersist > implements AccountEntityToPersist {
     declare id: string;
     name_organization!: string;
     owner_user_id?: string;
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
            name_organization: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            owner_user_id: {
                type: DataTypes.UUID,
                allowNull: true,
            }
        }, {
            sequelize: mainSequelize,
            modelName: 'account',
            tableName: 'accounts',
            timestamps: true,
            paranoid: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at'

        }, );

        isInitialized = true;

    }
    return AccountModel;
};