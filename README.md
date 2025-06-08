# 📨 Gmail API Integration with Node.js

## 📚 Description

This project is a Node.js-based backend application that securely enables users to grant permission and view emails from their Gmail account using the Google Gmail API. It serves as an excellent example for developers interested in understanding how to integrate with the Gmail service while adhering to best practices in security and code structure.

---

## 🛠️ Key Technologies

* **Node.js & Express.js:** The powerful backend of the application is built on Node.js, leveraging the Express.js framework for creating API endpoints and efficiently handling requests.
* **PostgreSQL:** Utilized as the database for securely storing **refresh tokens** obtained via Google OAuth2. This ensures users remain logged in without constant re-authentication, while also safeguarding sensitive data.
* **Google APIs Node.js Client:** Provides seamless integration with the Google Gmail API, simplifying email retrieval.
* **dotenv:** Employed for managing sensitive environment variables (`CLIENT_ID`, `CLIENT_SECRET`, DB credentials) separately from the codebase, enhancing security.

---

## 🏗️ Modular Architecture

The project is structured following modular architecture principles, significantly improving code readability, understandability, and extensibility. The codebase is divided into five core logical parts (modules), each responsible for specific functionality, contributing to clean code and easy maintenance.

* **`src/app.js` - Main Application & Server Bootstrap:** The primary entry point of the application. It initializes the Express server, orchestrates initial database setup, and integrates all modular routes.
* **`src/config/database.js` - Database Configuration:** Centralizes all PostgreSQL connection settings and includes a function to ensure the existence of the `single_token` table.
* **`src/services/db.js` - Refresh Token Management Service:** Provides a modular service for securely saving and retrieving refresh tokens from the database, isolating DB interactions.
* **`src/routes/authRoutes.js` - OAuth2 Authentication Routes:** Defines the Express routes responsible for user authentication via Google OAuth2, including sign-in and callback mechanisms.
* **`src/routes/emailRoutes.js` / `src/services/gmail.js` - Email Retrieval & Display Logic:** Handles the Express routes and service logic for fetching, processing, and displaying user emails from the Gmail API.

---

## 🚀 Getting Started

Follow the instructions below to set up and run this project.

### Prerequisites

* [Node.js](https://nodejs.org/) (v14 or higher recommended)
* [npm](https://www.npmjs.com/) (comes with Node.js)
* [PostgreSQL](https://www.postgresql.org/download/)
* [Google Cloud Platform](https://cloud.google.com/) Account

### Google Cloud Platform Setup

1.  Log in to your [Google Cloud Console](https://console.cloud.google.com/).
2.  Create a new project or select an existing one.
3.  Navigate to **APIs & Services > Library**.
4.  Search for and enable the **Gmail API**.
5.  Go to **APIs & Services > Credentials**.
6.  Click **"CREATE CREDENTIALS"** and choose **"OAuth client ID"**.
7.  Select **"Web application"** as the application type.
8.  In the **"Authorized redirect URIs"** field, add your redirect URL, e.g., `http://localhost:3000/google-callback` (if running locally).
9.  You will be provided with your **`CLIENT_ID`** and **`CLIENT_SECRET`**. Keep them in a secure place.

### Database Setup (PostgreSQL)

1.  Ensure PostgreSQL is installed and running on your system.
2.  Create a new database for this project (e.g., `gmail_app_db`).
    ```bash
    psql -U your_username -c "CREATE DATABASE gmail_app_db;"
    ```

### Project Installation

1.  Clone this repository:
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```
2.  Install the required npm packages:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the project's root directory and add the following variables, replacing `your_...` values with your own:
    ```env
    PORT=3000
    CLIENT_ID=your_google_client_id
    CLIENT_SECRET=your_google_client_secret
    REDIRECT_URL=http://localhost:3000/google-callback

    DB_USER=your_pg_user
    DB_HOST=localhost
    DB_DATABASE=gmail_app_db
    DB_PASSWORD=your_pg_password
    DB_PORT=5432
    ```

### Running the Server

To start the server: http://localhost:3000

```bash
node src/app.js
