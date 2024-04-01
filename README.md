# News Tracking

-   [About The Project](#about-the-project)
    -   [Built With](#built-with)
-   [Getting Started](#getting-started)
    -   [Installation](#installation)
        -   [Backend](#backend)
        -   [Frontend](#frontend)

## About The Project

![bothv2](https://github.com/BalBaki/News/assets/20540044/1c58566a-a118-43e0-a84d-abc30e381d4f)

-   You can search for news using the search term you entered, start and end dates, sort order, the APIs you want, and filtering options specific to each selected API.
-   When you click on the news, it directs you to its source on a new page.
-   You can register and log in. If you are logged in, you can add news to your favorites, save your filtering options, excluding the search word, by using the "Save Settings" button and automatically find them back when you log in again.

### Built With

-   ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
-   ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
-   ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
-   ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
-   ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

## Getting Started

-   You need to take free api keys from these links:

    -   News Api: https://newsapi.org/
    -   The Guardians: https://open-platform.theguardian.com/
    -   NY Times: https://developer.nytimes.com/

### Installation

#### Backend

-   You need to add the following variables to environment file(.env).

    | Name                         | Type   | Example                  |
    | ---------------------------- | ------ | ------------------------ |
    | API_PORT                     | number | 8080                     |
    | CORS_ORIGIN                  | string | http://localhost:3000    |
    | JWT_ACCESS_TOKEN_SECRET_KEY  | string | jwtAccessTokenSecretKey  |
    | JWT_REFRESH_TOKEN_SECRET_KEY | string | jwtRefreshTokenSecretKey |
    | DB_CONNECTION_STRING         | string | mongodb+srv://.........  |
    | NEWS_API_KEY                 | string | newsapikey               |
    | GUARDIANS_API_KEY            | string | guardiansapikey          |
    | NY_TIMES_API_KEY             | string | nytimesapikey            |

```bash
  cd backend
  npm install
  node server.js
```

#### Frontend

-   You need to add the following variables to environment file(.env).

    | Name              | Type   | Example               |
    | ----------------- | ------ | --------------------- |
    | REACT_APP_API_URL | string | http://localhost:8080 |

```bash
  cd frontend
  npm install
  npm run start
```
