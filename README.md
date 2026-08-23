# Portfolio-D25IT118

A personal portfolio website built with **React (Vite)**, created as part of the Advanced Web Development Frameworks (ITUE301) coursework at CHARUSAT University. Now integrated end-to-end with a live Node/Express/MongoDB backend for task management (Practical 6).

🔗 **Live Repo:** [github.com/diya2405/Portfolio-D25IT118](https://github.com/diya2405/Portfolio-D25IT118)  
🔗 **Backend Repo:** [github.com/diya2405/task-manager-api-D25IT118](https://github.com/diya2405/task-manager-api-D25IT118)

## Tech Stack

- React 18 (Vite)
- React Router v6
- CSS (custom, no framework)
- Fetch API (for backend integration)

## Features

- Multi-page navigation (Home, Projects, Contact, **Tasks**) with React Router — no full page reloads
- Reusable, prop-driven components (Header, About, Education, Skills, Projects, Contact, Footer)
- Controlled form input with live character count on the Contact page
- State-driven UI toggle (show/hide tip)
- Live GitHub repository fetch on the Projects page, with loading spinner, error handling + retry, and client-side search
- **Full CRUD Task Manager** wired to a live MongoDB-backed Express API — create, complete, and delete tasks, all persisted server-side
- Optimistic UI updates, delete confirmation, and toast notifications for task actions
- Clean, IDE-inspired UI design

## Project Structure

```
src/
├── api/
│   ├── auth.js               # Auth API client (register, login, me)
│   └── tasks.js              # Central API client for tasks (authenticated)
├── components/
│   ├── Header.jsx
│   ├── About.jsx
│   ├── Education.jsx
│   ├── Skills.jsx
│   ├── Projects.jsx
│   ├── RepoList.jsx
│   ├── ErrorMessage.jsx
│   ├── Spinner.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   ├── Navbar.jsx            # Dynamic Login/Logout navigation
│   ├── ProtectedRoute.jsx    # Route guard for authenticated pages
│   ├── Auth.css              # Styling for Login & Register forms
│   ├── Tasks.jsx             # Full-stack task manager (Authenticated)
│   ├── Tasks.css             # Styling for Tasks & Toast
│   └── Toast.jsx             # Toast notification component
├── context/
│   └── AuthContext.jsx       # Global auth state & token persistence
├── pages/
│   ├── Home.jsx
│   ├── ProjectsPage.jsx
│   ├── ContactPage.jsx
│   ├── TasksPage.jsx         # Route page wrapper for Tasks
│   ├── LoginPage.jsx         # User login page
│   ├── RegisterPage.jsx      # User registration page
│   └── NotFoundPage.jsx
├── App.jsx                   # Route configurations & AuthProvider wrapper
├── App.css
└── main.jsx
```

## Getting Started

This project requires the backend API running alongside it — see the [backend repo](https://github.com/diya2405/task-manager-api-D25IT118) for setup.

```bash
git clone https://github.com/diya2405/Portfolio-D25IT118.git
cd Portfolio-D25IT118
npm install
npm run dev
```

App runs at `http://localhost:5173/`

**Note:** For the `/tasks` page to work, the backend must be running separately at `http://localhost:5000` (see backend repo README for setup — `npm start` in `task-manager-api-D25IT118`).

## Practicals Covered

### Practical 1 — Component Architecture
- Static portfolio UI built with 4+ reusable components (Header, About, Skills, Footer)
- Props used to pass data into components (e.g. `name`, `skillsList`, `projectlist`)

### Practical 2 — Routing & State Management
- Added React Router v6 with 3 routes: `/`, `/projects`, `/contact`
- `useState` used meaningfully for:
  - Toggling UI visibility (tip on Contact page)
  - Controlled form input (message textarea with live character count)
- Navigation via `NavLink` — no full page reloads between routes

### Practical 3 — API Integration
- Fetches live repositories from the GitHub REST API (`/users/diya2405/repos`)
- No API key required (public, unauthenticated endpoint)
- Loading state shown via a spinner; failed requests show an error message with a Retry button
- Includes a client-side search filter over the fetched repo names

### Practical 6 — Full Stack Integration (React + Node + MongoDB)
- Added a `/tasks` route with a new `Tasks.jsx` component
- Connected to the Express + MongoDB backend from Practicals 4–5 via a central `src/api/tasks.js` client
- Full CRUD from the UI: create, mark complete/incomplete, delete — each write operation confirmed against the live database, not assumed
- **Optimistic UI**: new tasks appear instantly on creation, then reconcile with the server response (rolled back on failure)
- **Confirmation dialog** before deleting a task
- **Toast notifications** for success/failure on every operation
- Loading and error states handled independently for read (`GET`) and write (`POST`/`PUT`/`DELETE`) operations
- Data persistence verified by refreshing the browser — tasks are read from MongoDB on every mount, not local state

### Practical 7 — Authentication & Middleware Pipeline
- Integrated JWT authentication with user registration (`/register`) and login (`/login`) flows
- **AuthContext** manages global authentication state, token storage in `localStorage`, and session verification via `GET /auth/me` on page refresh
- **Route Guarding (`ProtectedRoute`)**: Unauthenticated attempts to access `/tasks` automatically redirect to `/login`
- **Session Expiry & 401 Handling**: When an API request fails with status `401 Unauthorized` (e.g., token expired or corrupted), the application displays a toast notification, purges the stale token from state/storage, and redirects to `/login`
- **Dynamic Navigation (`Navbar.jsx`)**: Displays "Login" when logged out, and a "Logout" action when authenticated that clears the session and returns to Home
- Every task request now attaches `Authorization: Bearer <token>` in HTTP headers
- Shared responsive styles (`Auth.css`) with light & dark theme parity matching the IDE-inspired UI

## Author

**Diya Shah** — B.Tech IT, CSPIT, CHARUSAT University  
[GitHub](https://github.com/diya2405)
