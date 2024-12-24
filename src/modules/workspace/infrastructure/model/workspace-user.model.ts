import {DataTypes, Model, UUIDV4} from "sequelize";
import {mainSequelize} from "../../../../config/DB/mysql";
import {UserModel} from "../../../users/infrastructure/models/user.model";
import {WorkspaceModel} from "./workspace.model";

export class WorkspaceUserModel extends Model {
    declare id: string;
    declare workspace_id: string;
    declare user_id: string;
}
WorkspaceUserModel.init({
    id:{
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
    },
    workspace_id: {
        type:DataTypes.UUID,
        defaultValue:UUIDV4,
        allowNull: false,
    },
    user_id:{
        type:DataTypes.STRING,
        allowNull: false
    }

},{
    sequelize: mainSequelize,
    modelName: 'workspace-user',
    tableName:'workspace-users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt:'updated_at',
    deletedAt:'deleted_at'
})
UserModel.belongsToMany(WorkspaceModel,{through:WorkspaceUserModel, foreignKey:'user_id'})
WorkspaceModel.belongsToMany(UserModel,{through:WorkspaceUserModel, foreignKey:'workspace_id'})