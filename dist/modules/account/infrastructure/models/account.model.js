"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineRelations = exports.getAccountModel = exports.AccountModel = void 0;
// src/modules/account/infrastructure/models/account.model.ts
const sequelize_1 = require("sequelize");
const mysql_1 = require("../../../../config/DB/mysql");
const user_model_1 = require("../../../users/infrastructure/models/user.model");
class AccountModel extends sequelize_1.Model {
}
exports.AccountModel = AccountModel;
let isInitialized = false;
let relationsInitialized = false;
const getAccountModel = () => {
    if (!isInitialized) {
        AccountModel.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                defaultValue: sequelize_1.DataTypes.UUIDV4,
                primaryKey: true,
            },
            name_organization: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            phone_number: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            user_id: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
                references: {
                    model: (0, user_model_1.getUserModel)(),
                    key: 'id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            }
        }, {
            sequelize: mysql_1.mainSequelize,
            modelName: 'account',
            tableName: 'accounts',
            timestamps: true,
            paranoid: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at'
        });
        isInitialized = true;
        if (!relationsInitialized) {
            (0, exports.defineRelations)();
            relationsInitialized = true;
        }
    }
    return AccountModel;
};
exports.getAccountModel = getAccountModel;
const defineRelations = () => {
    const UserModel = (0, user_model_1.getUserModel)();
    const AccountModel = (0, exports.getAccountModel)();
    if (!UserModel || !AccountModel) {
        console.error('Modelos no inicializados correctamente.');
        return;
    }
    // Definir asociaciones solo si los modelos están inicializados
    UserModel.hasOne(AccountModel, {
        foreignKey: 'user_id',
        as: 'account',
    });
    AccountModel.belongsTo(UserModel, {
        foreignKey: 'user_id',
        as: 'user',
    });
};
exports.defineRelations = defineRelations;
