# MBAASHUB-NEXT  
## Advanced Next.js 13+ App Router Admin Panel with Auth, Role Management and Local Persistence

> A production-ready, fully typed, RTL-friendly admin dashboard built with **Next.js App Router**, **TypeScript**, **Tailwind CSS**, and **localStorage-based auth**, including **role management**, **user management**, and a reusable **notification system**.

---

## Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-13%2B-000000?style=for-the-badge&logo=nextdotjs)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss)
![AppRouter](https://img.shields.io/badge/Next.js-App_Router-000000?style=for-the-badge&logo=nextdotjs)

---

## Screenshots



---

## Features

| Feature | Description |
|--------|-------------|
| **Auth System** | Register, login, logout with email/username and password stored in `localStorage`. |
| **Case-Insensitive Credentials** | Email and username comparisons are fully case-insensitive; password is case-sensitive. |
| **Protected Routes** | All `/main/*` pages are protected by a client-side layout that checks auth token and redirects unauthenticated users to `/auth?view=login`. |
| **Role Management** | Roles CRUD using `RolesContext` with local persistence and a modern UI (modals, dropdowns, multi-select permissions). |
| **User Management** | Users list synced with auth store; create, edit, delete with confirmation modal and special warning when deleting current user. |
| **Last Login Tracking** | Last successful login timestamp is stored in `localStorage` and displayed in the users page. |
| **Reusable Notification System** | Animated toast-like notifications (success / error / warning) with a `useNotification` hook and shared `Notification` component. |
| **RTL-Ready UI** | All pages support RTL (Farsi) layout with clean typography and responsive design using Tailwind. |
| **Modular Layout** | Global sidebar + header in `app/main/layout.tsx` with per-section pages for identity overview, users, and roles. |

---

## Project Structure


app/
├── auth/
│ ├── layout.tsx # Auth layout (centered card)
│ └── page.tsx # Auth entry – switch between register/login/forgot-password
│
├── components/
│ ├── Auth/
│ │ ├── AuthForms.tsx # RegisterForm, LoginForm, ForgotPasswordForm
│ │ └── IdentityTabs.tsx # Tabs for identity-related sections (if used)
│ ├── Layout/
│ │ ├── Header.tsx # Top app bar (user info, actions)
│ │ └── Sidebar.tsx # Main sidebar navigation
│ └── Shared/
│ ├── Button.tsx # Reusable button component
│ └── Notification.tsx # Animated notification (toast) component
│
├── contexts/
│ └── RolesContext.tsx # RolesProvider + useRoles hook (roles CRUD + localStorage sync)
│
├── hooks/
│ └── useNotification.ts # Notification hook: showNotification / hideNotification
│
├── lib/
│ └── auth.ts # Auth logic: registerUser, loginUser, userExists, token + currentUser helpers
│
├── main/
│ ├── identity-config/
│ │ └── page.tsx # Identity configuration page (if used)
│ ├── identity-overview/
│ │ └── page.tsx # Overview dashboard (summary of users/roles)
│ ├── identity-roles/
│ │ └── page.tsx # Roles management UI (table + modals)
│ ├── identity-users/
│ │ └── page.tsx # Users management UI (table + modals + delete confirmation)
│ └── layout.tsx # Protected layout for all /main/* pages (auth guard + sidebar/header)
│
├── layout.tsx # Root layout for the whole app
├── page.tsx # Landing page / home
└── globals.css # Global styles (Tailwind + custom)

public/
├── favicon.ico
└── ... # Static assets

hooks/
└── useNotification.ts # (Alias from app/hooks if needed)

lib/
└── auth.ts # (same as above, central auth store)


---

## Auth Flow

### Registration

- User fills **email**, **username**, **password** in `RegisterForm`.
- `registerUser(email, username, password)`:
  - Normalizes email/username to lowercase (`emailNorm`, `usernameNorm`).
  - Rejects if any existing user has same normalized email/username.
  - Saves user to `localStorage["users"]` with initial `lastLogin = "هرگز"`.
- On success:
  - Immediately logs in the user (`loginUser`) and navigates to `/main/identity-overview`.
  - Shows success notification.

### Login

- User can login with either **email** or **username** plus password.
- `loginUser(emailOrUsername, password)`:
  - Normalizes `emailOrUsername` and matches against `emailNorm` / `usernameNorm`.
  - Password comparison is case-sensitive.
  - On success:
    - Updates `lastLogin` with localized Farsi date-time.
    - Stores `authToken` and `currentUser` in `localStorage`.
    - Navigates to `/main/identity-overview`.
    - Shows success notification.

### Auth Guard on `/main/*`

- `app/main/layout.tsx` runs on client:
  - Reads token using `getAuthToken()` from `lib/auth`.
  - If no token:
    - Shows error notification: “شما وارد نشده‌اید. لطفا ابتدا وارد شوید.”
    - Redirects to `/auth?view=login` using `router.replace`.
  - If token exists:
    - Renders `Sidebar`, `Header`, and the requested page.

---

## Role Management

- Backed by `RolesProvider` in `contexts/RolesContext.tsx`.
- Roles are stored in `localStorage["roles"]` with a default seed list on first load.
- Features:
  - Add new role (with permissions multi-select and access level).
  - Edit role (modals with validation).
  - Persist role changes to localStorage.
- The roles list is used in user creation/edit forms to select user roles.

---

## User Management

- Users in `/main/identity-users` are fully synced with `lib/auth`:
  - On load, `authGetAllUsers()` is mapped to the dashboard user list.
  - Creating a user in the dashboard adds to this shared store.
  - Deleting a user removes it from both the dashboard list and auth store.
- Features:
  - Search by id, email, username, role.
  - Add user (email, username, password, role) with validation and notifications.
  - Edit user email/username/role with case-insensitive uniqueness.
  - Delete user with confirmation modal:
    - If deleting the current logged-in user:
      - Shows a stronger warning.
      - Removes auth token and logs user out.
      - Redirects to `/auth?view=register`.

Currently, actions **Deactivate Account** and **Reset Password** are placeholders that only show a warning notification indicating these features are not implemented yet.

---

## Notification System

The notification system is globally reusable and consists of:

- `Notification` component (top-right animated toast).
- `useNotification` hook:

const { notification, showNotification, hideNotification } = useNotification();
showNotification('success', 'Operation completed successfully');


- Supports three types: `success`, `error`, `warning`.
- Uses CSS animations for enter/exit transitions and auto-dismisses after a configurable duration.

This system is used by:

- Auth forms (`RegisterForm`, `LoginForm`, `ForgotPasswordForm`).
- Users/roles pages for CRUD feedback.
- Auth guard in `app/main/layout.tsx` to show “not logged in” messages.

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm / npm / yarn (your choice)

### Installation

npm install

The app will be available at `http://localhost:3000`.
