const { Pool } = require('pg'); // We are pulling the pg(PostgreSQL) library

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

async function createTable() {  // We create a table for the database
    try {
        const client = await pool.connect();
        await client.query(`
            CREATE TABLE IF NOT EXISTS single_token(
                id SERIAL PRIMARY KEY,
                token_value TEXT NOT NULL
            );
        `);
        client.release();
        console.log("The Single Token Has Been verified/created");
    } catch (err) {
        console.error("Error creating Single Token table.", err);
    }
}

module.exports = {
    pool,
    createTable
};  