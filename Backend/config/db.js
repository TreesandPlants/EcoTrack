const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const getSslConfig = () => {
    if (process.env.DB_SSL !== "true") {
        return undefined;
    }

    if (process.env.DB_SSL_CA) {
        return {
            ca: process.env.DB_SSL_CA.replace(/\\n/g, "\n")
        };
    }

    const localCaPath = path.join(__dirname, "..", "ca.pem");

    if (!fs.existsSync(localCaPath)) {
        throw new Error(
            "Database SSL is enabled, but DB_SSL_CA or Backend/ca.pem is missing."
        );
    }

    return {
        ca: fs.readFileSync(localCaPath, "utf8")
    };
};

const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: getSslConfig()
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