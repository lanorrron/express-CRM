import mysql from 'mysql2/promise'
import config from '../config'
import {Sequelize} from 'sequelize'
import {AccountUserRelationsModel} from "../../modules/account/infrastructure/models/account-user.relations.model";

const mainSequelize = new Sequelize(config.dbName!, config.dbUser!, config.dbPassword, {
    host: config.dbHost,
    dialect: 'mysql',
});

const syncDatabase = async () => {
    try {
        await mainSequelize.sync( ); // `force: true` recrea las tablas en cada inicio
        AccountUserRelationsModel()
        console.log('Database synchronized');
    } catch (error) {
        console.error('Unable to synchronize the database:', error);
    }
};

export {mainSequelize, syncDatabase}