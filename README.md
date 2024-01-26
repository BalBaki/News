## Project Setup Stages

-   You need to add the values of the following data names to the environment file(.env).
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

## For Backend

```bash
  cd frontend
  npm install
  npm run start
```

## Project Functions

-   You can register and log in using the buttons at the top right of the screen.
-   You can search for news by selecting the API you want and the filtering options specific to this API.
-   You can search for news using the search term you entered, start and end dates, the APIs you want, and filtering options specific to each selected API.
-   When you click on the news, it directs you to its source on a new page.
-   If you are logged in, you can save your filtering options, excluding the search word, by using the "Save Settings" button and automatically find them back when you log in again.
