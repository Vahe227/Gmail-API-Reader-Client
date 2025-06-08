const { pool } = require('../config/database'); // Import pool from database.js

const db = {
    saveRefreshToken: async (token) => {
        try {
            const client = await pool.connect();
            const query = `
                INSERT INTO single_token (id, token_value)
                VALUES (1, $1)
                ON CONFLICT (id) DO UPDATE
                SET token_value = EXCLUDED.token_value 
            `;
            await client.query(query, [token]);
            client.release();
            console.log(`Refresh token is saved.`);
            return true;
        } catch (err) {
            console.error("Error saving refresh token.", err);
            throw err;
        }
    },
    getRefreshToken: async () => {
        try {
            const client = await pool.connect();
            const query = `SELECT token_value FROM single_token WHERE id = 1`;
            const result = await client.query(query);
            client.release();
            if(result.rows.length > 0){
                console.log(`Refresh token has been taken.`);
                return result.rows[0].token_value;
            }
            return null;
        } catch (err) {
            console.error("Error retrieving refresh token.", err);
            throw err;
        }
    },
};

module.exports = db;