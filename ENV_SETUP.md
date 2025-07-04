# Environment Setup Guide

## Required Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Frontend URL for CORS and OAuth redirects
FRONTEND_URL=http://localhost:5173

# Server Configuration
PORT=3000
```

## How to Get Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the following values:
    - **Project URL** → `SUPABASE_URL`
    - **anon public** → `SUPABASE_ANON_KEY`
    - **service_role secret** → `SUPABASE_SERVICE_ROLE_KEY`

## Important Notes

-   The `SUPABASE_SERVICE_ROLE_KEY` has admin privileges and should be kept secret
-   Never commit the `.env` file to version control
-   Make sure your Supabase project has Google OAuth configured
-   The `FRONTEND_URL` should match your frontend development server URL
