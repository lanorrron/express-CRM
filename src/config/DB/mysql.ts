import config from '../config'
import {Sequelize} from 'sequelize'

const mainSequelize = new Sequelize(config.dbName!, config.dbUser!, config.dbPassword, {
    host: config.dbHost,
    dialect: 'mysql',
});

const syncDatabase = async () => {
    try {
        await mainSequelize.sync(); // `force: true` recrea las tablas en cada inicio
        console.log('Database synchronized');
    } catch (error) {
        console.error('Unable to synchronize the database:', error);
    }
};

export {mainSequelize, syncDatabase}