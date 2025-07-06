# Toppify API Documentation

## Overview

The Toppify API is a comprehensive backend service for educational content processing, including PDF summarization, YouTube video analysis, and flashcard generation. The API uses Supabase for authentication and database management.

**Base URL:** `http://localhost:3000/api` (Use locally until we host it)

## Authentication

Most endpoints require authentication using Supabase access tokens.

**Header Required:**

```
Authorization: Bearer {supabase_access_token}
```

## Error Responses

All endpoints may return the following error format:

```json
{
    "success": false,
    "message": "Error description"
}
```

Common HTTP Status Codes:

-   `200` - Success
-   `201` - Created
-   `400` - Bad Request
-   `401` - Unauthorized
-   `403` - Forbidden
-   `404` - Not Found
-   `500` - Internal Server Error

---

## 🔐 Authentication Routes

### Register User

**POST** `/auth/register`

Creates a new user account.

**Request Body:**

```json
{
    "email": "user@example.com",
    "password": "securepassword123",
    "username": "john_doe"
}
```

**Response:**

```json
{
  "status": "success",
  "data": {
    "registeredUser": {
      "id": "uuid",
      "aud": "authenticated",
      "role": "authenticated",
      "email": "user@example.com",
      "email_confirmed_at": "2024-01-01T00:00:00.000Z",
      "phone": null,
      "app_metadata": {
        "provider": "email",
        "providers": ["email"]
      },
      "user_metadata": {
        "username": "john_doe"
      },
      "identities": [...],
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z",
      "is_anonymous": false
    }
  }
}
```

### Login User

**POST** `/auth/login`

Authenticates a user and returns session data.

**Request Body:**

```json
{
    "email": "user@example.com",
    "password": "securepassword123"
}
```

**Response:**

```json
{
    "status": "success",
    "session": {
        "access_token": "eyJ...",
        "refresh_token": "eyJ...",
        "expires_in": 3600,
        "token_type": "bearer"
    },
    "user": {
        "id": "uuid",
        "email": "user@example.com"
        // ... other user properties
    }
}
```

### Google OAuth

**POST** `/auth/google`

Initiates Google OAuth authentication flow.

**Request Body:**

```json
{
    "redirectTo": "http://localhost:5173/auth/callback"
}
```

**Response:**

```json
{
    "url": "https://accounts.google.com/oauth/authorize?..."
}
```

### Google OAuth Callback

**GET** `/auth/callback`

Handles Google OAuth callback and redirects with tokens.

**Query Parameters:**

-   `code` - OAuth authorization code

**Response:** Redirects to frontend with tokens in URL parameters.

---

## 👤 User Routes

### Get Current User

**GET** `/user/me/`

**Headers:** `Authorization: Bearer {token}`

**Response:**

```json
{
    "status": "success",
    "data": {
        "msg": "Authorized user retrieved successfully.",
        "user": {
            "id": "uuid",
            "email": "user@example.com",
            "available_tokens": 1000,
            "created_at": "2024-01-01T00:00:00.000Z",
            "updated_at": "2024-01-01T00:00:00.000Z"
        }
    }
}
```

### Update Current User

**PATCH** `/user/me/`

**Headers:** `Authorization: Bearer {token}`

**Request Body:**

```json
{
    "email": "newemail@example.com",
    "username": "new_username"
}
```

**Response:**

```json
{
    "status": "success",
    "data": {
        "msg": "Authorized user updated successfully.",
        "user": {
            "id": "uuid",
            "email": "newemail@example.com",
            "username": "new_username",
            "updated_at": "2024-01-01T00:00:00.000Z"
        }
    }
}
```

### Delete Current User

**DELETE** `/user/me/`

**Headers:** `Authorization: Bearer {token}`

**Response:**

```json
{
    "status": "success",
    "data": {
        "msg": "User deleted successfully.",
        "id": "uuid"
    }
}
```

---

## 🛠️ Admin Routes

### Create User (Admin Only)

**POST** `/admin/users/`

**Headers:** `Authorization: Bearer {token}`

**Request Body:**

```json
{
    "email": "newuser@example.com",
    "username": "new_user",
    "password": "securepassword123"
}
```

**Response:**

```json
{
    "status": "success",
    "data": {
        "msg": "User created successfully.",
        "user": {
            "id": "uuid",
            "email": "newuser@example.com",
            "username": "new_user",
            "created_at": "2024-01-01T00:00:00.000Z"
        }
    }
}
```

### Get All Users (Admin Only)

**GET** `/admin/users/`

**Headers:** `Authorization: Bearer {token}`

**Response:**

```json
{
    "status": "success",
    "data": {
        "msg": "All users retrieved successfully.",
        "users": [
            {
                "id": "uuid",
                "email": "user@example.com",
                "created_at": "2024-01-01T00:00:00.000Z"
            }
        ]
    }
}
```

### Get User by ID (Admin Only)

**GET** `/admin/users/{id}`

**Headers:** `Authorization: Bearer {token}`

**Response:**

```json
{
    "status": "success",
    "data": {
        "msg": "User retrieved successfully.",
        "id": "uuid",
        "user": {
            "id": "uuid",
            "email": "user@example.com",
            "created_at": "2024-01-01T00:00:00.000Z"
        }
    }
}
```

### Update User by ID (Admin Only)

**PATCH** `/admin/users/{id}`

**Headers:** `Authorization: Bearer {token}`

**Request Body:**

```json
{
    "email": "updated@example.com"
}
```

**Response:**

```json
{
    "status": "success",
    "data": {
        "msg": "User updated successfully.",
        "updatedUser": {
            "id": "uuid",
            "email": "updated@example.com"
        }
    }
}
```

### Delete User by ID (Admin Only)

**DELETE** `/admin/users/{id}`

**Headers:** `Authorization: Bearer {token}`

**Response:**

```json
{
    "status": "success",
    "data": {
        "msg": "User deleted successfully.",
        "id": "uuid"
    }
}
```

---

## 🪙 Token Management Routes

### Get User Tokens

**GET** `/user/tokens/`

**Headers:** `Authorization: Bearer {token}`

**Response:**

```json
{
    "status": "success",
    "data": {
        "userId": "uuid",
        "availableTokens": 1000
    }
}
```

### Use User Tokens

**PATCH** `/user/tokens/use?amount=100`

**Headers:** `Authorization: Bearer {token}`

**Query Parameters:**

-   `amount` - Number of tokens to use

**Response:**

```json
{
    "status": "success",
    "data": {
        "userId": "uuid",
        "previousTokensAmount": 1000,
        "amountUsed": 100,
        "currentTokensAmount": 900,
        "tokensUsedLog": {
            "id": "uuid",
            "user_id": "uuid",
            "amount_used": 100,
            "usage_date": "2024-01-01T00:00:00.000Z"
        }
    }
}
```

### Add User Tokens

**PATCH** `/user/tokens/add?amount=500`

**Headers:** `Authorization: Bearer {token}`

**Query Parameters:**

-   `amount` - Number of tokens to add

**Response:**

```json
{
    "status": "success",
    "data": {
        "userId": "uuid",
        "previousTokensAmount": 900,
        "amountAdded": 500,
        "currentTokensAmount": 1400
    }
}
```

---

## 📤 Upload Routes

### Upload PDF File

**POST** `/upload/pdf`

**Headers:** `Authorization: Bearer {token}`

**Request:** Multipart form data

-   `pdf` - PDF file (max 50MB)

**Response:**

```json
{
    "status": "success",
    "data": {
        "msg": "File uploaded successfully",
        "filename": "user-uuid-timestamp",
        "path": "user-uuid-timestamp",
        "uploadLog": {
            "id": "uuid",
            "user_id": "uuid",
            "content_type": "pdf",
            "content_url": "https://storage.supabase.co/...",
            "uploaded_at": "2024-01-01T00:00:00.000Z"
        }
    }
}
```

### Upload YouTube Video

**POST** `/upload/youtube`

**Headers:** `Authorization: Bearer {token}`

**Request Body:**

```json
{
    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}
```

**Response:**

```json
{
    "status": "success",
    "data": {
        "msg": "YouTube video added successfully",
        "record": {
            "id": "uuid",
            "user_id": "uuid",
            "content_type": "youtube",
            "content_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            "uploaded_at": "2024-01-01T00:00:00.000Z"
        }
    }
}
```

---

## 📝 Summary Routes

### Generate PDF Summary

**GET** `/summarize/pdf/{id}`

**Headers:** `Authorization: Bearer {token}`

**Path Parameters:**

-   `id` - ID of the uploaded PDF file

**Response:**

```json
{
    "status": "success",
    "data": {
        "summary_url": "https://storage.supabase.co/summaries/uuid.txt.gz",
        "record_id": "uuid"
    }
}
```

### Generate YouTube Summary

**GET** `/summarize/youtube/{id}`

**Headers:** `Authorization: Bearer {token}`

**Path Parameters:**

-   `id` - ID of the uploaded YouTube video

**Response:**

```json
{
    "status": "success",
    "data": {
        "summary_url": "https://storage.supabase.co/summaries/uuid.txt.gz",
        "record_id": "uuid"
    }
}
```

### Get All Summaries

**GET** `/summarize/`

**Headers:** `Authorization: Bearer {token}`

**Response:**

```json
{
    "status": "success",
    "data": {
        "msg": "Summaries retrieved successfully.",
        "PDFSummaries": [
            {
                "id": "uuid",
                "user_id": "uuid",
                "upload_id": "uuid",
                "content_type": "pdf",
                "tokens_used": 1800,
                "summary_url": "https://storage.supabase.co/summaries/uuid.txt.gz",
                "created_at": "2024-01-01T00:00:00.000Z"
            }
        ],
        "youtubeSummaries": [
            {
                "id": "uuid",
                "user_id": "uuid",
                "upload_id": "uuid",
                "content_type": "youtube",
                "tokens_used": 1800,
                "summary_url": "https://storage.supabase.co/summaries/uuid.txt.gz",
                "created_at": "2024-01-01T00:00:00.000Z"
            }
        ]
    }
}
```

---

## 🃏 Flashcard Routes

### Generate PDF Flashcards

**GET** `/flashcards/pdf/{id}`

**Headers:** `Authorization: Bearer {token}`

**Path Parameters:**

-   `id` - ID of the uploaded PDF file

**Response:**

```json
{
    "status": "success",
    "data": {
        "flashcards_url": "https://storage.supabase.co/flashcards/uuid.json.gz",
        "record": {
            "id": "uuid",
            "user_id": "uuid",
            "upload_id": "uuid",
            "content_type": "pdf",
            "tokens_used": 1800,
            "flashcards_url": "https://storage.supabase.co/flashcards/uuid.json.gz",
            "created_at": "2024-01-01T00:00:00.000Z"
        }
    }
}
```

### Generate YouTube Flashcards

**GET** `/flashcards/youtube/{id}`

**Headers:** `Authorization: Bearer {token}`

**Path Parameters:**

-   `id` - ID of the uploaded YouTube video

**Response:**

```json
{
    "status": "success",
    "data": {
        "flashcards_url": "https://storage.supabase.co/flashcards/uuid.json.gz",
        "record": {
            "id": "uuid",
            "user_id": "uuid",
            "upload_id": "uuid",
            "content_type": "youtube",
            "tokens_used": 1800,
            "flashcards_url": "https://storage.supabase.co/flashcards/uuid.json.gz",
            "created_at": "2024-01-01T00:00:00.000Z"
        }
    }
}
```

### Get All Flashcards

**GET** `/flashcards/`

**Headers:** `Authorization: Bearer {token}`

**Response:**

```json
{
    "status": "success",
    "data": {
        "msg": "Flashcards retrieved successfully.",
        "PDFFlashcards": [
            {
                "id": "uuid",
                "user_id": "uuid",
                "upload_id": "uuid",
                "content_type": "pdf",
                "tokens_used": 1800,
                "flashcards_url": "https://storage.supabase.co/flashcards/uuid.json.gz",
                "created_at": "2024-01-01T00:00:00.000Z"
            }
        ],
        "youtubeFlashcards": [
            {
                "id": "uuid",
                "user_id": "uuid",
                "upload_id": "uuid",
                "content_type": "youtube",
                "tokens_used": 1800,
                "flashcards_url": "https://storage.supabase.co/flashcards/uuid.json.gz",
                "created_at": "2024-01-01T00:00:00.000Z"
            }
        ]
    }
}
```

---

## 💳 Payment Routes

### Create Payment

**POST** `/payment/`

**Headers:** `Authorization: Bearer {token}`

**Request Body:**

```json
{
    "amount": 29.99,
    "currency": "USD",
    "payment_method": "stripe",
    "status": "pending"
}
```

**Response:**

```json
{
    "status": "success",
    "data": {
        "msg": "Payment record created successfully.",
        "payment": {
            "id": "uuid",
            "user_id": "uuid",
            "amount": 29.99,
            "currency": "USD",
            "payment_method": "stripe",
            "status": "pending",
            "created_at": "2024-01-01T00:00:00.000Z"
        }
    }
}
```

### Get Payment

**GET** `/payment/{id}`

**Headers:** `Authorization: Bearer {token}`

**Response:**

```json
{
    "status": "success",
    "data": {
        "msg": "Payment retrieved successfully.",
        "payment": {
            "id": "uuid",
            "user_id": "uuid",
            "amount": 29.99,
            "currency": "USD",
            "payment_method": "stripe",
            "status": "completed",
            "created_at": "2024-01-01T00:00:00.000Z"
        }
    }
}
```

### Get All Payments

**GET** `/payment/`

**Headers:** `Authorization: Bearer {token}`

**Response:**

```json
{
    "status": "success",
    "data": {
        "msg": "All Payments retrieved successfully.",
        "payments": [
            {
                "id": "uuid",
                "user_id": "uuid",
                "amount": 29.99,
                "currency": "USD",
                "payment_method": "stripe",
                "status": "completed",
                "created_at": "2024-01-01T00:00:00.000Z"
            }
        ]
    }
}
```

### Update Payment

**PATCH** `/payment/{id}`

**Headers:** `Authorization: Bearer {token}`

**Request Body:**

```json
{
    "status": "completed",
    "transaction_id": "txn_123456789"
}
```

**Response:**

```json
{
    "status": "success",
    "data": {
        "msg": "Payment updated successfully.",
        "updatedPayment": {
            "id": "uuid",
            "status": "completed",
            "transaction_id": "txn_123456789"
        }
    }
}
```

### Delete Payment

**DELETE** `/payment/{id}`

**Headers:** `Authorization: Bearer {token}`

**Response:**

```json
{
    "status": "success",
    "data": {
        "msg": "Payment deleted successfully.",
        "id": "uuid"
    }
}
```

---

## 📋 Subscription Routes

### Create Subscription

**POST** `/subscription/`

**Headers:** `Authorization: Bearer {token}`

**Request Body:**

```json
{
    "plan_type": "premium",
    "status": "active",
    "start_date": "2024-01-01T00:00:00.000Z",
    "end_date": "2024-02-01T00:00:00.000Z"
}
```

**Response:**

```json
{
    "status": "success",
    "data": {
        "msg": "Subscription record created successfully.",
        "Subscription": {
            "id": "uuid",
            "user_id": "uuid",
            "plan_type": "premium",
            "status": "active",
            "start_date": "2024-01-01T00:00:00.000Z",
            "end_date": "2024-02-01T00:00:00.000Z",
            "created_at": "2024-01-01T00:00:00.000Z"
        }
    }
}
```

### Get Subscription

**GET** `/subscription/{id}`

**Headers:** `Authorization: Bearer {token}`

**Response:**

```json
{
    "status": "success",
    "data": {
        "msg": "Subscription retrieved successfully.",
        "Subscription": {
            "id": "uuid",
            "user_id": "uuid",
            "plan_type": "premium",
            "status": "active",
            "start_date": "2024-01-01T00:00:00.000Z",
            "end_date": "2024-02-01T00:00:00.000Z",
            "created_at": "2024-01-01T00:00:00.000Z"
        }
    }
}
```

### Get All Subscriptions

**GET** `/subscription/`

**Headers:** `Authorization: Bearer {token}`

**Response:**

```json
{
    "status": "success",
    "data": {
        "msg": "All Subscriptions retrieved successfully.",
        "Subscriptions": [
            {
                "id": "uuid",
                "user_id": "uuid",
                "plan_type": "premium",
                "status": "active",
                "start_date": "2024-01-01T00:00:00.000Z",
                "end_date": "2024-02-01T00:00:00.000Z",
                "created_at": "2024-01-01T00:00:00.000Z"
            }
        ]
    }
}
```

### Update Subscription

**PATCH** `/subscription/{id}`

**Headers:** `Authorization: Bearer {token}`

**Request Body:**

```json
{
    "status": "cancelled",
    "end_date": "2024-01-15T00:00:00.000Z"
}
```

**Response:**

```json
{
    "status": "success",
    "data": {
        "msg": "Subscription updated successfully.",
        "updatedSubscription": {
            "id": "uuid",
            "status": "cancelled",
            "end_date": "2024-01-15T00:00:00.000Z"
        }
    }
}
```

### Delete Subscription

**DELETE** `/subscription/{id}`

**Headers:** `Authorization: Bearer {token}`

**Response:**

```json
{
    "status": "success",
    "data": {
        "msg": "Subscription deleted successfully.",
        "id": "uuid"
    }
}
```

---

## 📊 Token Usage Guidelines

### Token Requirements

-   **PDF Summary:** ~1800 tokens per 3000 characters
-   **YouTube Summary:** ~1800 tokens per 3000 characters
-   **PDF Flashcards:** ~1800 tokens per 3000 characters
-   **YouTube Flashcards:** ~1800 tokens per 3000 characters

### File Size Limits

-   **PDF Files:** Maximum 50MB
-   **YouTube Videos:** Must have English auto-generated captions

### Processing Notes

-   PDFs are processed in chunks of 3000 characters
-   YouTube videos require English captions to be available
-   Generated summaries and flashcards are stored as compressed files
-   Token costs are calculated before processing and deducted upon completion

---

## 🔧 Frontend Integration Examples

### JavaScript/TypeScript Examples

#### Authentication Flow

```javascript
// Register user
const registerUser = async (email, password, username) => {
    const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username }),
    });
    return response.json();
};

// Login user
const loginUser = async (email, password) => {
    const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    // Store tokens in localStorage or secure storage
    localStorage.setItem("accessToken", data.session.access_token);
    return data;
};
```

#### Upload and Process PDF

```javascript
// Upload PDF
const uploadPDF = async (file, token) => {
    const formData = new FormData();
    formData.append("pdf", file);

    const response = await fetch("/api/upload/pdf", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
    });
    return response.json();
};

// Generate summary
const generateSummary = async (uploadId, token) => {
    const response = await fetch(`/api/summarize/pdf/${uploadId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
};
```

#### Handle Token Management

```javascript
// Check available tokens
const getTokens = async (token) => {
    const response = await fetch("/api/user/tokens/", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
};

// Use tokens
const useTokens = async (amount, token) => {
    const response = await fetch(`/api/user/tokens/use?amount=${amount}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
};
```

#### Payment and Subscription Management

```javascript
// Create payment
const createPayment = async (paymentData, token) => {
    const response = await fetch("/api/payment/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(paymentData),
    });
    return response.json();
};

// Create subscription
const createSubscription = async (subscriptionData, token) => {
    const response = await fetch("/api/subscription/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(subscriptionData),
    });
    return response.json();
};
```

---

## 🚨 Important Notes

1. **Authentication:** Always include the Bearer token in the Authorization header for protected routes
2. **File Uploads:** PDF files must be under 50MB and in PDF format
3. **YouTube Videos:** Must have English auto-generated captions available
4. **Token Management:** Check available tokens before processing large files. 1 user credit = 1800 LLM tokens
5. **Error Handling:** Always handle potential errors and check response status codes
6. **Rate Limiting:** Be mindful of API usage and implement appropriate retry logic
7. **Storage:** Generated files (summaries/flashcards) are stored as compressed files and need to be decompressed when downloaded
8. **Admin Routes:** Some user management routes require admin privileges
9. **Payment & Subscription:** Payment and subscription routes are available for managing user billing and subscription status
