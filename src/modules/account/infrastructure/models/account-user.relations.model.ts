import {getUserModel} from "../../../users/infrastructure/models/user.model";
import {getAccountModel} from "./account.model";

 let relationsInitialized = false;
export const AccountUserRelationsModel = () => {
    if(relationsInitialized){
        return;
    }

    const UserModel = getUserModel();
    const AccountModel = getAccountModel();

    if (!UserModel || !AccountModel) {
        console.error('Models not init correctly.');
        return;
    }

    AccountModel.belongsTo(UserModel, {
        foreignKey: 'owner_user_id',
        as: 'owner',
        onDelete: 'SET NULL',
        onUpdate:'CASCADE'
    });

    // A user  belongs to one account
    AccountModel.hasMany(UserModel,{
        foreignKey: 'account_id',
        as: 'members',
        onDelete: 'CASCADE',
        onUpdate:'CASCADE'
    });

    UserModel.belongsTo(AccountModel,{
        foreignKey: 'account_id',
        as:'account',
        onDelete: 'SET NULL',
        onUpdate:'CASCADE'
    })
    relationsInitialized = true;
};