# Armenian

# 📨 Gmail API Ինտեգրում Node.js-ով

## 📚 Նկարագրություն

Այս նախագիծը Node.js-ով գրված backend հավելված է, որը թույլ է տալիս օգտատերերին անվտանգ կերպով թույլտվություն տրամադրել և դիտել իրենց Gmail հաշվի նամակները՝ օգտագործելով Google Gmail API-ը։ Այն հիանալի օրինակ է այն մշակողների համար, ովքեր ցանկանում են հասկանալ, թե ինչպես կարելի է ինտեգրվել Gmail ծառայությանը՝ պահպանելով անվտանգության և կոդի կառուցվածքի լավագույն փորձերը։

---

## 🛠️ Հիմնական Տեխնոլոգիաներ

* **Node.js & Express.js:** Հավելվածի հզոր backend-ը կառուցված է Node.js-ի վրա՝ օգտագործելով Express.js ֆրեյմվորքը API էնդփոինթների ստեղծման և հարցումների արդյունավետ մշակման համար։
* **PostgreSQL:** Օգտագործվում է որպես տվյալների բազա՝ Google OAuth2-ի միջոցով ստացված **refresh token**-ների անվտանգ պահպանման համար։ Սա ապահովում է, որ օգտատերերը մնան մուտքագրված՝ առանց անընդհատ վերաթույլտվության անհրաժեշտության, միաժամանակ պաշտպանելով գաղտնի տվյալները։
* **Google APIs Node.js Client:** Ապահովում է անխափան ինտեգրում Google Gmail API-ի հետ՝ հեշտացնելով նամակների ստացումը։
* **dotenv:** Կիրառվում է շրջակա միջավայրի զգայուն փոփոխականները (`CLIENT_ID`, `CLIENT_SECRET`, DB հավատարմագրեր) կոդից առանձին պահելու համար՝ բարձրացնելով անվտանգությունը։

---

## 🏗️ Մոդուլային Ճարտարապետություն

Նախագիծը կառուցված է մոդուլային ճարտարապետության սկզբունքներով, ինչը զգալիորեն բարելավում է կոդի ընթեռնելիությունը, հասկանալիությունը և ընդարձակելիությունը։ Կոդը բաժանված է հինգ հիմնական տրամաբանական մասերի (մոդուլների), որոնցից յուրաքանչյուրը պատասխանատու է կոնկրետ ֆունկցիոնալության համար՝ նպաստելով մաքուր կոդին և հեշտ պահպանմանը։

* **`src/app.js` - Հիմնական Հավելված և Սերվերի Գործարկում:** Հավելվածի մուտքի հիմնական կետը։ Այն նախաձեռնում է Express սերվերը, կառավարում է տվյալների բազայի սկզբնական կարգավորումները և ինտեգրում բոլոր մոդուլային երթուղիները։
* **`src/config/database.js` - Տվյալների Բազայի Կարգավորումներ:** Կենտրոնացնում է PostgreSQL-ի հետ կապի բոլոր կարգավորումները և ներառում է ֆունկցիա՝ `single_token` աղյուսակի գոյությունը ապահովելու համար։
* **`src/services/db.js` - Refresh Token-ների Կառավարման Ծառայություն:** Տրամադրում է մոդուլային ծառայություն՝ refresh token-ները տվյալների բազայում անվտանգ պահելու և ստանալու համար՝ մեկուսացնելով DB փոխգործակցությունը։
* **`src/routes/authRoutes.js` - OAuth2 Աուտենտիֆիկացիայի Երթուղիներ:** Սահմանում է Express երթուղիները Google OAuth2-ի միջոցով օգտատերերի աուտենտիֆիկացիայի համար, ներառյալ մուտքի և callback մեխանիզմները։
* **`src/routes/emailRoutes.js` / `src/services/gmail.js` - Էլեկտրոնային Նամակների Ստացում և Ցուցադրում:** Մշակում է Express երթուղիները և ծառայության տրամաբանությունը՝ Gmail API-ի միջոցով օգտատերերի նամակները ստանալու, մշակելու և ցուցադրելու համար։

---

## 🚀 Սկիզբը

Այս պրոյեկտը գործարկելու համար հետևեք ստորև ներկայացված հրահանգներին։

### Պահանջվող Ծրագրակազմեր

* [Node.js](https://nodejs.org/) (v14 կամ ավելի բարձր)
* [npm](https://www.npmjs.com/) (Node.js-ի հետ միասին է տեղադրվում)
* [PostgreSQL](https://www.postgresql.org/download/)
* [Google Cloud Platform](https://cloud.google.com/) հաշիվ

### Google Cloud Platform-ի Կարգավորումներ

1.  Մուտք գործեք ձեր [Google Cloud Console](https://console.cloud.google.com/)։
2.  Ստեղծեք նոր պրոյեկտ կամ ընտրեք առկա մեկը։
3.  Նավարկեք **APIs & Services > Library**։
4.  Որոնեք և միացրեք **Gmail API**-ը։
5.  Գնացեք **APIs & Services > Credentials**։
6.  Սեղմեք **"CREATE CREDENTIALS"** և ընտրեք **"OAuth client ID"**։
7.  Ընտրեք **"Web application"** հավելվածի տեսակը։
8.  **"Authorized redirect URIs"** դաշտում ավելացրեք ձեր redirect URL-ը, օրինակ՝ `http://localhost:3000/google-callback` (եթե տեղական եք գործարկում)։
9.  Ձեզ կտրամադրվեն **`CLIENT_ID`** և **`CLIENT_SECRET`**։ Պահեք դրանք անվտանգ վայրում։

### Տվյալների Բազայի Կարգավորումներ (PostgreSQL)

1.  Համոզվեք, որ PostgreSQL-ը տեղադրված և գործարկվում է ձեր համակարգում։
2.  Ստեղծեք նոր տվյալների բազա այս պրոյեկտի համար (օրինակ՝ `gmail_app_db`)։
    ```bash
    psql -U your_username -c "CREATE DATABASE gmail_app_db;"
    ```

### Պրոյեկտի Տեղադրում

1.  Կլոնավորեք այս repository-ն.
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```
2.  Տեղադրեք անհրաժեշտ npm փաթեթները.
    ```bash
    npm install
    ```
3.  Ստեղծեք `.env` ֆայլ պրոյեկտի հիմնական (root) գրացուցակում և ավելացրեք հետևյալ փոփոխականները՝ փոխարինելով `your_...` արժեքները ձեր սեփականով.
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

### Գործարկում

Սերվերը գործարկելու համար.

```bash
node src/app.js

## English

```markdown
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

To start the server:

```bash
node src/app.js