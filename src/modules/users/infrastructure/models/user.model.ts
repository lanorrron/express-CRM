import {DataTypes, Model, UUID, UUIDV4} from "sequelize";
import {UserEntity, UserEntityToPersist} from "../../domain/entities/user.entity";
import {mainSequelize} from "../../../../config/DB/mysql";
import {AccountModel} from "../../../account/infrastructure/models/account.model";

export class UserModel extends Model<UserEntityToPersist> implements UserEntityToPersist {
    email!: string;
    first_name!: string;
    full_name!: string;
    id!: string;
    last_name!: string;
    password!: string;
    phone_number!: string;


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
            phone_number: {
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
            full_name:{
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            sequelize: mainSequelize,
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