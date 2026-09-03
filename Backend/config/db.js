const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,

    ssl: process.env.DB_SSL === "true"
        ? {
            ca: fs.readFileSync(
                path.join(__dirname, "..", "ca.pem")
            )
        }
        : undefined
});

db.getConnection((err, connection) => {
    if (err) {
        console.error("Database connection failed:", err.message);
    } else {
        console.log("MySQL connected successfully");
        connection.release();
    }
});

module.exports = db;