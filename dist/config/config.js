"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)(); // Esto cargará las variables de entorno desde un archivo .env si existe
exports.default = {
    port: process.env.PORT || 4000,
    jwtSecret: process.env.JWT_SECRET,
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME
};
