# Backend API Documentation

## 1. Overview

This document provides an overview of the backend API for the application. The backend is a Node.js application built using the Express.js framework. It handles user authentication, data management (summaries, flashcards, user information), file uploads, payment processing, and subscription management. It uses Supabase for database and authentication services.

## 2. Architecture

The backend follows a RESTful API architecture, with a structure similar to the Model-View-Controller (MVC) pattern, adapted for an API:

*   **Routes (`routes/`)**: Define the API endpoints.
*   **Controllers (`controllers/`)**: Handle incoming requests, process data (often by interacting with services or the database), and send responses.
*   **Database (Supabase)**: Acts as the data persistence layer.
*   **Middlewares (`middlewares/`)**: Provide functions for request processing, authentication, authorization, and error handling.
*   **Utils (`utils/`)**: Contain helper functions for various tasks.

## 3. Key Components

### 3.1. `server.js`

*   The main entry point of the application.
*   Initializes Express.js application.
*   Sets up essential middleware:
    *   `cors`: Enables Cross-Origin Resource Sharing.
    *   `express.json()`: Parses incoming JSON payloads.
*   Mounts the main API router (`routes/index.route.js`) under the `/api/` prefix.
*   Includes a global error handling middleware, which catches errors (including `multer` file upload errors) and sends a standardized JSON error response.

### 3.2. `config/`

*   **`supabaseClient.js`**:
    *   Initializes and configures the Supabase client.
    *   Reads `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` from environment variables.
    *   Exports the initialized Supabase client instance for use throughout the application (e.g., in CRUD operations, authentication).

### 3.3. `routes/`

*   **`index.route.js`**:
    *   Acts as the primary router.
    *   Aggregates all feature-specific routers (e.g., `auth.route.js`, `users.route.js`, `uploads.route.js`) and mounts them under their respective base paths (e.g., `/api/auth`, `/api/user`).
*   **Feature Routers (e.g., `users.route.js`, `uploads.route.js`)**:
    *   Define specific endpoints for each feature.
    *   Utilize controllers to handle requests for these endpoints.
    *   Employ middleware (e.g., `protect` for authentication, `adminOnly` for authorization) to secure routes.

### 3.4. `controllers/`

*   Responsible for handling the logic for each API endpoint.
*   Receive `req` (request) and `res` (response) objects from Express.
*   Interact with the database (via Supabase client or abstraction layers like `crudFactory.js`).
*   Perform data validation and manipulation.
*   Send JSON responses to the client.
*   Many controllers use:
    *   **`utils/asyncWrapper.js`**: A higher-order function that wraps asynchronous route handlers to catch errors and pass them to the Express error handling middleware, avoiding repetitive try-catch blocks.
    *   **`utils/crudFactory.js`**: A utility that likely generates generic CRUD (Create, Read, Update, Delete) handlers for specified Supabase tables, promoting code reuse.

### 3.5. `middlewares/`

*   **`authMiddleware.js` (exports `protect`)**:
    *   Secures routes by verifying JWTs.
    *   Expects a `Bearer <token>` in the `Authorization` header.
    *   Uses `supabase.auth.getUser(token)` to validate the token with Supabase.
    *   If the token is valid, it fetches the full user details from the application's `users` table (using `crudFactory`) and attaches this user object to `req.user`.
    *   If authentication fails, it sends an appropriate error response.
*   **`adminOnly.js`**:
    *   Restricts access to certain routes to users with administrative privileges.
    *   It likely checks a property on the `req.user` object (e.g., `req.user.role === 'admin'`) that is set during login or fetched by `authMiddleware.js`.
*   **`verifyTokensAndParse.js`**:
    *   (Purpose inferred from name) Likely involved in verifying different types of tokens (perhaps not just auth tokens) or parsing token-related data from requests. This needs further inspection if a detailed workflow involving it is required.
*   **Error Handling Middleware (in `server.js`)**:
    *   Catches errors passed by `next(err)` from route handlers or other middlewares.
    *   Formats errors into a consistent JSON structure: `{ success: false, message: "Error message" }`.
    *   Handles specific `multer.MulterError` instances, like `LIMIT_FILE_SIZE`.

### 3.6. `utils/`

This directory contains various helper functions used across the application. Examples include:

*   `asyncWrapper.js`: For handling errors in async functions.
*   `createError.js`: A utility to create custom error objects with status codes.
*   `crudFactory.js`: For generating generic database operation handlers.
*   `chunkText.js`: Possibly for breaking down large texts for processing.
*   `deductTokens.js`, `estimateTokens.js`: Related to managing a token-based usage system.
*   `downloadCaptions.js`, `parseVttToText.js`: Utilities for handling video captions.
*   `safeJsonArrayExtract.js`: For safely parsing JSON arrays, possibly from database text fields.

## 4. Workflow Examples

### 4.1. User Authentication (Login/Signup)

1.  **Signup**:
    *   User provides credentials (e.g., email, password) to a `/api/auth/signup` endpoint.
    *   `auth.controller.js` handles the request.
    *   It likely uses `supabase.auth.signUp()` to create a new user in Supabase Auth.
    *   Upon successful Supabase signup, a corresponding user record might be created in the application's public `users` table (potentially using `crudFactory`).
    *   A JWT (and possibly a refresh token) is returned to the client.
2.  **Login**:
    *   User provides credentials to a `/api/auth/login` endpoint.
    *   `auth.controller.js` handles the request.
    *   It uses `supabase.auth.signInWithPassword()` to authenticate against Supabase.
    *   If successful, Supabase returns user session information including a JWT.
    *   The JWT is sent back to the client.
3.  **Authenticated Request**:
    *   Client sends a request to a protected endpoint (e.g., `/api/user/me`) with the JWT in the `Authorization: Bearer <token>` header.
    *   The `protect` middleware (`middlewares/authMiddleware.js`) intercepts the request.
    *   It validates the token with Supabase.
    *   It fetches the full user profile from the local `users` table and attaches it to `req.user`.
    *   If valid, the request proceeds to the controller (e.g., `usersController.getUser`).
    *   The controller uses `req.user` to access authenticated user data and perform actions.

### 4.2. File Upload & Processing (e.g., Summarization)

1.  **Upload**:
    *   User uploads a file (e.g., a text document or VTT file for summarization) to an endpoint like `/api/upload/`. This route is likely configured with `multer` for handling `multipart/form-data`.
    *   `uploads.controller.js` receives the file.
    *   The file might be temporarily stored or directly processed. It could also be uploaded to Supabase Storage.
    *   Information about the uploaded file (e.g., path, name, user ID) is stored in the database.
2.  **Processing (e.g., Summarization Trigger)**:
    *   After successful upload, the client might make a request to `/api/summarize/` with an identifier for the uploaded content.
    *   The request is protected, so `authMiddleware.js` verifies the user.
    *   `summaries.controller.js` handles the request.
    *   It might involve:
        *   Fetching the file content or path from the database.
        *   Using utility functions (e.g., `parseVttToText.js` if it's a caption file, `chunkText.js` for large texts).
        *   Interacting with an external AI/ML service for summarization (details not visible in current file structure, but implied by "summaries").
        *   Deducting processing tokens from the user's account using `deductTokens.js`.
        *   Storing the generated summary in the database, linked to the user and the original content.
    *   A response is sent to the client, possibly with the summary or a job ID to poll for results.

## 5. Database

*   **Supabase** is used as the primary backend-as-a-service (BaaS).
*   **Supabase Auth**: Manages user authentication (signup, login, token verification).
*   **Supabase Database (PostgreSQL)**: Stores application data such as user profiles, uploaded content, summaries, flashcards, subscription details, etc. The `crudFactory.js` utility simplifies interactions with Supabase tables.
*   **Supabase Storage**: Likely used for storing user-uploaded files (though not explicitly confirmed in the explored files, it's a common Supabase feature).
*   The `assets/` directory contains ERD (Entity Relationship Diagram) images (`ERD-V1.png`, `ERD-V2.png`, `ERD-V3.png`) which might provide a visual representation of the database schema. These should be consulted for detailed table structures and relationships.

## 6. Setup & Running the Project

To set up and run the project locally, refer to the instructions in `ENV_SETUP.md`. This will typically involve:

1.  Cloning the repository.
2.  Installing dependencies (`npm install`).
3.  Setting up environment variables in a `.env` file (e.g., Supabase URL, Supabase Service Key, frontend URL, port).
4.  Running the application (`npm start` or `npm run dev`).

---
