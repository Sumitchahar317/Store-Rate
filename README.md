# StorePulse - Full-Stack Store Rating & Management Platform

[![Live Application](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge&logo=vercel)](https://your-frontend-deployment-url.vercel.app)
[![API Endpoint](https://img.shields.io/badge/API-Live-green?style=for-the-badge&logo=render)](https://your-backend-deployment-url.onrender.com/api/health)

StorePulse is a full-stack web application designed for registering stores and submitting ratings (1 to 5 stars). It features a unified authentication system providing role-based dashboard access, real-time input validations, and aggregate rating analytics across three user roles: System Administrator, Normal User, and Store Owner.

---

## 🌐 Live Deployments & Demo Access

| Service | Environment | Status | Link |
| :--- | :--- | :--- | :--- |
| **Frontend Application** | Production (Vercel) | 🟢 Active | [https://your-frontend-deployment-url.vercel.app](https://your-frontend-deployment-url.vercel.app) |
| **Backend REST API** | Production (Render) | 🟢 Active | [https://your-backend-deployment-url.onrender.com/api](https://your-backend-deployment-url.onrender.com/api) |
| **Database** | Serverless PostgreSQL | 🟢 Connected | Neon.tech Cloud |

### 🔑 Demo Credentials

Use these pre-seeded accounts to explore the role-specific dashboards:

| Role | Email | Password | Allowed Dashboards |
| :--- | :--- | :--- | :--- |
| **System Administrator** | `systemadmin@storepulse.com` | `Admin@12345` | `/admin` (Analytics, User/Store CRUD) |
| **Store Owner** | `john.owner@storepulse.com` | `Admin@12345` | `/owner` (Store Average, Reviews breakdown) |
| **Normal User** | `regular.customer@storepulse.com` | `Admin@12345` | `/stores` (Search stores, 1-5 Star Ratings) |

*(You can also use the public `/signup` page to register your own custom user account).*

---

## 🚀 Key Features

### 1. System Administrator
* **Analytics Cards:** Aggregate metric overview (Total Users, Total Stores, Total Ratings Submitted).
* **User Management:** Create new users with specific roles (`USER`, `STORE_OWNER`, `ADMIN`) with strict credential constraints[cite: 1].
* **Store Creation:** Register new stores and assign them directly to registered store owners[cite: 1].
* **Filterable & Sortable Tables:**
  * View all registered users with Name, Email, Address, Role, and Store Owner rating[cite: 1].
  * Filter users by search term and role[cite: 1].
  * View all stores with calculated average ratings[cite: 1].
  * Clickable table headers for dynamic ASC/DESC sorting on Name, Email, Role, etc.[cite: 1]

### 2. Normal User[cite: 1]
* **Public Registration & Login:** Direct signup through the registration page with automatic `USER` role assignment[cite: 1].
* **Store Directory:** Search stores in real-time by **Name** and **Address**[cite: 1].
* **Interactive 1–5 Star Rating:**
  * View overall store rating alongside your personal previously submitted score[cite: 1].
  * Submit or modify ratings seamlessly with composite unique constraints preventing duplicate reviews[cite: 1].
* **Security:** Change password from the navigation menu[cite: 1].

### 3. Store Owner[cite: 1]
* **Owner Dashboard:**
  * Live average score computation for their store[cite: 1].
  * Detailed review table listing customers who rated the store, their submitted score, and timestamps[cite: 1].
* **Security:** Change password from the navigation menu[cite: 1].

---

## 🔒 Form Validation Rules

Enforced across both frontend components and backend validation middleware layers[cite: 1]:
* **Name:** Min 20 characters, Max 60 characters[cite: 1].
* **Address:** Maximum 400 characters[cite: 1].
* **Password:** 8 to 16 characters, requiring $\ge 1$ uppercase letter and $\ge 1$ special character[cite: 1].
* **Email:** Standard RFC-compliant email pattern validation[cite: 1].
* **Rating:** Strict integer values between 1 and 5[cite: 1].

---

## 🛠️ Tech Stack

* **Frontend:** React.js (Vite), Tailwind CSS, React Router DOM, Lucide Icons[cite: 1]
* **Backend:** Node.js, Express.js (CommonJS)[cite: 1]
* **Database & ORM:** PostgreSQL (Neon.tech Serverless) with Prisma ORM[cite: 1]
* **Authentication:** JSON Web Tokens (JWT), Bcrypt.js password hashing

---

## 📂 Project Structure

```text
├── server/
│   ├── prisma/
│   │   ├── schema.prisma       # Database schema & relations
│   │   └── seed.js             # Initial seeder (Admin, Store Owner, Store, User)
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── adminController.js
│   │   │   ├── authController.js
│   │   │   └── userStore.controller.js
│   │   ├── middlewares/
│   │   │   ├── auth.js         # JWT validation & role verification
│   │   │   └── validate.js     # Character and regex rules via validator
│   │   ├── routes/
│   │   │   ├── adminRoute.js
│   │   │   ├── authRoute.js
│   │   │   └── storeRoute.js
│   │   ├── utils/
│   │   │   └── ratingHelper.js # Centralized rating average helper
│   │   ├── db.js               # Prisma Client instance
│   │   └── server.js           # Express app entry point
│   ├── .env
│   └── package.json
│
└── client/
    ├── src/
    │   ├── component/
    │   │   ├── Navbar.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx # Global user session & role state
    │   ├── pages/
    │   │   ├── AdminDashboard.jsx
    │   │   ├── ChangePassword.jsx
    │   │   ├── Login.jsx
    │   │   ├── OwnerDashboard.jsx
    │   │   ├── Signup.jsx
    │   │   └── UserStoreList.jsx
    │   ├── services/
    │   │   └── Api.jsx         # Fetch wrapper with JWT headers
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env
    └── package.json