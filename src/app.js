require("dotenv").config();
const express = require("express");
const { createTable } = require('./config/database'); // Import createTable
const { authRouter } = require('./routes/authRoutes'); // Import authRouter
const emailRoutes = require('./routes/emailRoutes'); // Import emailRoutes


const app = express();
const port = process.env.PORT || 3000;

// Create the DB table at startup
createTable();

// Using our routes
app.use('/', authRouter); // All authRoutes will work from / main route

app.use('/', emailRoutes);  // All emailRoutes will also work / from the main route

// The server starts listening on the specified port
app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}`);
});