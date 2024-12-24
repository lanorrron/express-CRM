import {DataTypes, Model, UUID, UUIDV4} from "sequelize";
import {mainSequelize} from "../../../../config/DB/mysql";
import {UserModel} from "./user.model";
import {AccountModel} from "../../../account/infrastructure/models/account.model";

export class UserAccountModel extends Model {
    declare id: string;
    declare account_id: string;
    declare user_id: string;
}

UserAccountModel.init({
    id: {
        type: UUID,
        defaultValue:UUIDV4,
        primaryKey: true
    },
    account_id: {
        type: DataTypes.UUID,
        defaultValue:UUIDV4,
        allowNull: false,
        references:{
            model:'accounts',
            key:'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    },
    user_id: {
        type: DataTypes.UUID,
        defaultValue:UUIDV4,
        allowNull: false,
        references:{
            model:'users',
            key:'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    }
}, {
    sequelize: mainSequelize,
    modelName:'user-account',
    tableName:'user-accounts',
    timestamps:true,
    createdAt:'created_at',
    updatedAt:'updated_at',
    deletedAt:'deleted_at'
})
UserModel.belongsToMany(AccountModel, {through:UserAccountModel, foreignKey:'user_id', otherKey:'account_id'})
AccountModel.belongsToMany(UserModel,{through:UserAccountModel, foreignKey:'account_id', otherKey:'user_id'})