import app from './app';
import config from './config/config';
import {syncDatabase} from "./config/DB/mysql";

const startServer = async () => {
    try {
        await syncDatabase(); // Sincronizar la base de datos antes de iniciar el servidor
        app.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

startServer();