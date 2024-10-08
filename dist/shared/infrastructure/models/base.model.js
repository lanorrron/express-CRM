"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModel = void 0;
const sequelize_1 = require("sequelize");
class BaseModel extends sequelize_1.Model {
    static initializeBaseModel() {
        return {
            id: {
                type: sequelize_1.DataTypes.UUID,
                defaultValue: sequelize_1.DataTypes.UUIDV4,
                primaryKey: true,
            },
            created_at: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
            updated_at: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
            deleted_at: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
            }
        };
    }
}
exports.BaseModel = BaseModel;
