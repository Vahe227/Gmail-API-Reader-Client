const express = require('express');
const router = express.Router();
const db = require('../services/db');
const { readEmails } = require('../services/gmail'); // Import readEmails
const { oauth2Client } = require('./authRoutes'); // Import oauth2Client from authRoutes

// Endpoint for reading emails
router.get("/read-emails", async (req, res) => {
    try {
        const refreshToken = await db.getRefreshToken();

        if (!refreshToken) {
            return res.status(401).send("Refresh token not found. Please validate again.");
        }

        oauth2Client.setCredentials({
            refresh_token: refreshToken,
        });
        
        const { credentials } = await oauth2Client.refreshAccessToken();
        oauth2Client.setCredentials(credentials);

        if (credentials.refresh_token && credentials.refresh_token !== refreshToken){
            await db.saveRefreshToken(credentials.refresh_token);
        }

        await readEmails(oauth2Client, res); // Call readEmails
    } catch (err) {
        console.error("Error loading emails using refresh token.", err);
        res.status(500).send("Error loading emails.");
    }
});

module.exports = router;