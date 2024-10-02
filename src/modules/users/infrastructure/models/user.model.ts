import {DataTypes, Model, UUID, UUIDV4} from "sequelize";
import {UserEntity} from "../../domain/entities/user.entity";
import {mainSequelize} from "../../../../config/DB/mysql";
import {AccountModel} from "../../../account/infrastructure/models/account.model";

export class UserModel extends Model<UserEntity> implements UserEntity {
    created_at!: Date | string;
    deleted_at!: Date | string | null;
    email!: string;
    first_name!: string;
    id!: string;
    last_name!: string;
    password!: string;
    role!: string;
    updated_at!: Date | string;

}

let isInitialized = false;

export const getUserModel = () => {
    if (!isInitialized) {
        UserModel.init({
            id: {
                type: UUID,
                defaultValue: UUIDV4,
                primaryKey: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            first_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: false,
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
            },
        }, {
            sequelize : mainSequelize,
            modelName: 'user',
            tableName: 'users',
            timestamps: true,
            paranoid: true,
            defaultScope:{
                attributes: {exclude:['password']}
            }
        });
        isInitialized = true;
        UserModel.hasOne(AccountModel, { foreignKey: 'user_id', as: 'Account' });

    }
    return UserModel;
};