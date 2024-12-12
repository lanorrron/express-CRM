// src/modules/account/infrastructure/models/account.model.ts
import {Model, DataTypes, Sequelize} from 'sequelize';
import { mainSequelize } from '../../../../config/DB/mysql';
import {getUserModel, UserModel} from "../../../users/infrastructure/models/user.model";
import {AccountEntityToPersist} from "../../domain/entities/account.entity";

export class AccountModel extends Model<AccountEntityToPersist > implements AccountEntityToPersist {
     declare id: string;
     name_organization!: string;
     owner_user_id!: string;
}

let isInitialized = false;
let relationsInitialized = false;
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
                allowNull: false,
                references: {
                    model: getUserModel(),
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
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at'

        }, );

        isInitialized = true;
        if(!relationsInitialized){
            defineRelations()
            relationsInitialized = true
        }


    }
    return AccountModel;
};

export const defineRelations = () => {
    const UserModel = getUserModel();
    const AccountModel = getAccountModel();

    if (!UserModel || !AccountModel) {
        console.error('Modelos no inicializados correctamente.');
        return;
    }

    // Definir asociaciones solo si los modelos están inicializados
    UserModel.hasOne(AccountModel, {
        foreignKey: 'owner_user_id',
        as: 'account',
    });

    AccountModel.belongsTo(UserModel, {
        foreignKey: 'owner_user_id',
        as: 'user',
    });
};