import {DataTypes, Model, UUID, UUIDV4} from "sequelize";
import {WorkspaceEntityToPersist} from "../../domain/entities/workspace.entity";
import {mainSequelize} from "../../../../config/DB/mysql";
import {getAccountModel} from "../../../account/infrastructure/models/account.model";

export class WorkspaceModel extends Model<WorkspaceEntityToPersist> implements WorkspaceEntityToPersist {
    declare id: string;
    name!: string;
    account_id!: string;
}
let isInitialized = false
export const getWorkspaceModel = () =>{
    if(!isInitialized){
        WorkspaceModel.init({
            id:{
                type:UUID,
                defaultValue: UUIDV4,
                primaryKey: true
            },
            name:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            account_id:{
                type: DataTypes.UUID,
                allowNull: false,
                references:{
                    model:'accounts',
                    key:'id'
        }
            }
        },{
            sequelize: mainSequelize,
            modelName: 'workspace',
            tableName: 'workspaces',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at',
            paranoid: true,
        })
        const accountModel = getAccountModel();
        WorkspaceModel.belongsTo(accountModel, { foreignKey: "account_id", as: "account" });

        // Relación: Account tiene muchos Workspaces
        accountModel.hasMany(WorkspaceModel, { foreignKey: "account_id", as: "workspace" });
        isInitialized = true
    }
    return WorkspaceModel
}