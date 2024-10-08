"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserModel = exports.UserModel = void 0;
const sequelize_1 = require("sequelize");
const mysql_1 = require("../../../../config/DB/mysql");
class UserModel extends sequelize_1.Model {
}
exports.UserModel = UserModel;
let isInitialized = false;
const getUserModel = () => {
    if (!isInitialized) {
        UserModel.init({
            id: {
                type: sequelize_1.UUID,
                defaultValue: sequelize_1.UUIDV4,
                primaryKey: true,
            },
            email: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            role: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            first_name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            last_name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize: mysql_1.mainSequelize,
            modelName: 'user',
            tableName: 'users',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at',
            paranoid: true,
        });
        isInitialized = true;
    }
    return UserModel;
};
exports.getUserModel = getUserModel;
