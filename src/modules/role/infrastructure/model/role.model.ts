import {DataTypes, Model} from "sequelize";
import {RoleEntity, RoleEntityToPersist} from "../../domain/entities/role.entity";
import {mainSequelize} from "../../../../config/DB/mysql";

export class RoleModel extends Model<RoleEntityToPersist> implements RoleEntityToPersist {
    declare id: string
    name!: string

}

        RoleModel.init({
            id:{
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,

            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            sequelize: mainSequelize,
            modelName: 'role',
            tableName: 'roles',
            timestamps: true,
            paranoid: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at'})
