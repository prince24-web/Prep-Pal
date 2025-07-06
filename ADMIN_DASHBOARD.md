# Preppal – Admin Dashboard Specification

## 🎯 Objective
The admin dashboard is a secure interface to:
- Monitor platform usage
- Manage users, plans, and subscriptions
- Handle token limits and abuse
- Manually override or assist with user issues
- Prepare for launch & growth with operational control

---

## 🧰 Features Overview

### 1. 🔒 Authentication & Role
- Admins must login using elevated credentials
- User roles: `admin`, `user`
- Middleware: `isAdmin` to protect all routes

---

### 2. 👥 Users Management
- View all registered users
- Search/filter by email, plan, date, token usage
- View individual user details:
  - Email, signup date, current plan
  - Tokens used / remaining
  - Usage history (PDFs, videos processed)
- Manually:
  - Reset tokens
  - Upgrade/downgrade plan
  - Suspend user
  - Delete user

#### Routes:
```
GET    /admin/users
GET    /admin/users/:id
PATCH  /admin/users/:id/tokens
PATCH  /admin/users/:id/plan
DELETE /admin/users/:id
```

---

### 3. 📦 Subscription & Plan Control
- View all subscription plans and prices
- Add/edit/remove plans (Starter, Pro, Team)
- Update token limits per plan
- Toggle plan visibility (for limited-time offers)

#### Routes:
```
GET    /admin/plans
POST   /admin/plans
PATCH  /admin/plans/:id
DELETE /admin/plans/:id
```

---

### 4. 📊 Platform Usage Reports
- Daily / Weekly / Monthly tokens consumed
- Top 10 users by activity
- Most uploaded PDF length / avg tokens used per file
- Export CSV or JSON

#### Routes:
```
GET /admin/reports/usage
GET /admin/reports/top-users
GET /admin/reports/export
```

---

### 5. 💬 Support & Feedback Panel
- View user feedback or bug reports
- Assign status: Open, In Progress, Resolved
- Respond via email or admin notes

#### Routes:
```
GET    /admin/feedback
PATCH  /admin/feedback/:id/status
```

---

## 🧑‍🤝‍🧑 User Roles
| Role   | Description         | Access                 |
|--------|---------------------|------------------------|
| User   | Normal platform use | Client-facing features |
| Admin  | Internal management | Full admin dashboard   |

---

## 🌱 Optional (Phase 2+) Features
- **Impersonate User**: Debug or help without login credentials
- **Activity Logs**: Who did what and when
- **AI Cost Tracker**: Estimate cost based on tokens used vs. OpenAI bills
- **Webhook Tester**: For Stripe events & notifications
- **Bulk Email Sender**: For updates or onboarding campaigns

---

## 🔐 Security Tips
- Rate-limit all admin endpoints
- Use `JWT + Role` or session-based authentication
- IP restrict access in production (optional)
- Audit logs for every admin action

---