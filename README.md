# House Hunting App

## Run locally

Install the frontend and backend dependencies:

```sh
npm install
npm --prefix server install
```

Set `MONGO_URI` in `server/src/.env` to a reachable MongoDB connection string, then run:

```sh
npm run dev
```

This starts both the Vite frontend and the Express API. Starting only Vite will leave API requests without a backend and can result in a 502 response.
