import {DataTypes, Model, UUID, UUIDV4} from "sequelize";
import {UserEntityToPersist} from "../../domain/entities/user.entity";
import {mainSequelize} from "../../../../config/DB/mysql";

export class UserModel extends Model<UserEntityToPersist> {
    declare id:string;
    email!: string;
    first_name!: string;
    full_name!: string;
    last_name!: string;
    password!: string;
    phone_number!: string;
}

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
            },
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