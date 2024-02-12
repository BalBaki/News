## Project Setup Stages

-   You need to add the values of the following data names to the Backend environment file(.env).
    -   DB_CONNECTION_STRING
    -   NEWS_API_KEY
    -   GUARDIANS_API_KEY
    -   NY_TIMES_API_KEY

## For Backend

```bash
  cd backend
  npm install
  node server.js
```

## For Frontend

```bash
  cd frontend
  npm install
  npm run start
```

## Project Functions

-   You can search for news using the search term you entered, start and end dates, sort order, the APIs you want, and filtering options specific to each selected API.
-   When you click on the news, it directs you to its source on a new page.
-   You can register and log in. If you are logged in, you can add news to your favorites, save your filtering options, excluding the search word, by using the "Save Settings" button and automatically find them back when you log in again.
