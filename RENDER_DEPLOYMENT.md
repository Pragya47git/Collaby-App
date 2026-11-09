# Deploying Collaby on Render

You can deploy Collaby on Render either as a **Web Service (Full-Stack with Live AI)** or as a **Static Site**.

---

## Recommended: Render Web Service (Full-Stack with Live Gemini AI)

This runs the full Node.js server (`server.ts`) with live Gemini 3.8 Flash AI.

### 1. Create a New Web Service on Render
- In your Render Dashboard, click **New +** → **Web Service**.
- Connect your GitHub repository (`https://github.com/pragya47git/Collaby-App` or your fork).

### 2. Configure Service Settings
- **Name**: `collaby` (or your choice)
- **Runtime**: `Node`
- **Branch**: `main` (or `master`)
- **Build Command**:
  ```bash
  npm install && npm run build
  ```
- **Start Command**:
  ```bash
  npm start
  ```

### 3. Add Environment Variables
In the **Environment Variables** section on Render, add:

| Key | Value | Description |
| :--- | :--- | :--- |
| `NODE_ENV` | `production` | Enables production mode and static serving of the `dist` bundle. |
| `GEMINI_API_KEY` | `AIzaSy...` | Your Google Gemini API Key from Google AI Studio. |

*(Note: Render automatically injects `PORT` into your service, which `server.ts` adopts automatically).*

---

## Alternative: Render Static Site (Frontend Only)

If you only want to host the static frontend without running a Node server:

- **Service Type**: **Static Site**
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`
- **Environment Variables**: None required (the app uses its built-in client-side fallback engine for UI interactions).
