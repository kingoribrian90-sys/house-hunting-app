# Broto house hunting

## Run locally

1. Configure MongoDB by creating `server/src/.env` with a `MONGO_URI` value. The backend uses port `5000` by default.
2. Start the backend from the `server` directory:

   ```sh
   npm install
   npm run dev
   ```

3. In a second terminal, start the frontend from the repository root:

   ```sh
   npm install
   npm run dev
   ```

Vite proxies `/api` requests to `http://localhost:5000`, so the frontend can use the backend without a separate CORS setup during local development. To point the frontend directly at another API host, set `VITE_API_BASE_URL` to that host's `/api` URL.

The frontend currently uses the backend for account signup/login, listing creation and browsing, tenant search submission, M-Pesa listing-fee requests, and virtual-tour requests. The server records listing-fee requests as pending; it does not currently confirm or process payments, and tenant search-pass payments are not implemented.
