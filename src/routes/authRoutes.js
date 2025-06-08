const express = require('express');
const router = express.Router(); // Creating an Express Router
const { google } = require('googleapis');
const db = require('../services/db');  // Importing db services
const { readEmails } = require('../services/gmail'); // Import readEmails

// Creating the OAuth2 client
const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
);

const scopes = ['https://www.googleapis.com/auth/gmail.readonly'];

// Main endpoint to show the user a link to sign in with Google

router.get("/", (req, res) => {
    try {
        const url = oauth2Client.generateAuthUrl({
            access_type: "offline",
            scope: scopes,
            prompt: "consent"
        });
        res.send(`<a href="${url}">Sign In With Google</a>`);
    } catch (err) {
        console.error("We Have An Error", err);
        res.status(404).send("We do not have user consent");
    }
});

// Callback endpoint from Google (callback URL)

router.get("/google-callback", async (req, res) => {
    try {
        const { code } = req.query;
        const { tokens } = await oauth2Client.getToken(code);
        if (tokens.refresh_token) {
            await db.saveRefreshToken(tokens.refresh_token);
        }
        oauth2Client.setCredentials(tokens);

        await readEmails(oauth2Client, res); // Call readEmails
    } catch (err) {
        console.error("Error while authenticating or loading emails.", err);
        res.status(500).send("Error while authenticating or loading emails.");
    }
});

module.exports = {
    authRouter: router,
    oauth2Client // Export the oauth2Client because it is needed in other endpoints   
};