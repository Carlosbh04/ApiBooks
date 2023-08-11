const mysql = require('mysql2');

const pool = mysql.createPool(
    {
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "X29513321x@",
        database: process.env.DB_NAME || "AppBooks",
        port: process.env.DB_PORT || 3306,
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10,
        idleTimeout: 60000,
        queueLimit: 0
    }
).promise();

console.log("Conexión con la BBDD creada");

module.exports = {pool};