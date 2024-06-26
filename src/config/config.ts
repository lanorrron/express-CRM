import { config } from 'dotenv';

config(); // Esto cargará las variables de entorno desde un archivo .env si existe

export default {
    port: process.env.PORT || 4000,
    jwtSecret: process.env.JWT_SECRET,
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME
};