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
│   ├── PageLoader.jsx        # Suspense fallback UI for lazy chunks (Practical 8)
│   ├── Auth.css              # Styling for Login & Register forms
│   ├── Cache.css             # Styling for Cache & Performance Dashboard (Practical 9)
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
│   ├── CachePage.jsx         # Interactive Caching & Performance Dashboard (Practical 9)
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

### Practical 8 — Performance Optimization and Lazy Loading in React
- Implemented **route-based code splitting** across all pages using `React.lazy()` and dynamic `import()`:
  - `Home` (`/`)
  - `ProjectsPage` (`/projects`)
  - `ContactPage` (`/contact`)
  - `TasksPage` (`/tasks`)
  - `LoginPage` (`/login`)
  - `RegisterPage` (`/register`)
  - `NotFoundPage` (`*`)
- Wrapped route switch with `<Suspense>` providing a dedicated `<PageLoader />` fallback component with spinner animation and light/dark theme support
- Verified chunk generation and recorded before/after build metrics

#### Bundle Performance Comparison (Before vs. After)

| Metric | Before (Monolithic Bundle) | After (Lazy Loaded / Code-Split) | Improvement / Difference |
|---|---|---|---|
| **Main JS Bundle Size** | `247.85 kB` (`78.45 kB` gzip) | `237.00 kB` (`76.01 kB` gzip) | **-10.85 kB** initial payload reduction |
| **Main CSS Bundle Size** | `14.98 kB` (`3.80 kB` gzip) | `12.09 kB` (`3.32 kB` gzip) | **-2.89 kB** initial CSS reduction |
| **Route Chunks Count** | 1 single JS file | 9 split on-demand JS chunks | Separate chunks per route |
| **`Home` Chunk** | Bundled in main | `2.02 kB` (`0.85 kB` gzip) | Downloaded on `/` |
| **`ProjectsPage` Chunk** | Bundled in main | `2.01 kB` (`0.94 kB` gzip) | Downloaded on `/projects` |
| **`TasksPage` Chunk** | Bundled in main | `3.88 kB` (`1.54 kB` gzip) | Downloaded on `/tasks` |
| **`LoginPage` Chunk** | Bundled in main | `1.72 kB` (`0.73 kB` gzip) | Downloaded on `/login` |
| **`RegisterPage` Chunk** | Bundled in main | `2.16 kB` (`0.83 kB` gzip) | Downloaded on `/register` |
| **`ContactPage` Chunk** | Bundled in main | `1.23 kB` (`0.53 kB` gzip) | Downloaded on `/contact` |
| **`NotFoundPage` Chunk** | Bundled in main | `0.28 kB` (`0.21 kB` gzip) | Downloaded on 404 routes |

#### Key Analysis & Theory Questions

1. **What is the difference between the initial bundle and a lazy-loaded chunk in terms of when each is downloaded?**
   - *Initial Bundle:* Downloaded immediately when the user first loads the application (blocking initial render until downloaded and parsed).
   - *Lazy-Loaded Chunk:* Only requested over the network when the user actually navigates to that specific route/component for the first time.
2. **Why does lazy loading improve perceived performance even though the total amount of code downloaded eventually stays the same?**
   - By trimming unused pages from the initial payload, the browser downloads and parses significantly fewer bytes during initial page startup. The Time to Interactive (TTI) and First Contentful Paint (FCP) are greatly reduced, making the app feel instant. Subsequent page chunks are small and download quickly in the background when requested.
### Practical 9 — In-Memory Caching and Query Optimization
- Created a dedicated **Cache & Performance Analytics Dashboard** at `/cache` (`CachePage.jsx`, `Cache.css`)
- **Interactive 3x3 Live Benchmark Tool**: Sends automated 3 uncached vs. 3 cached requests, computes round-trip latency in milliseconds, and displays a live comparison table
- **Real-Time Telemetry Metrics**: Displays server-side cache hits, misses, hit ratio %, and active RAM keys via `GET /tasks/cache/stats`
- **Single Fetch Inspector**: Inspects round-trip timing with visual `X-Cache: HIT (green)` and `X-Cache: MISS (orange)` status badges
- **Dummy Data & Cache Controls**: One-click actions to populate sample tasks in MongoDB and manually flush the server cache to demonstrate cache invalidation

#### Empirical Benchmark Results (Lab Evidence)

| Metric / Reading | Uncached (MongoDB Atlas Query) | Cached (node-cache In-Memory) | Speed Improvement |
|---|---|---|---|
| **Sample 1** | `42.43 ms` | `3.89 ms` | **90.8% faster** |
| **Sample 2** | `35.17 ms` | `3.90 ms` | **88.9% faster** |
| **Sample 3** | `29.20 ms` | `4.79 ms` | **83.6% faster** |
| **Average Response Time** | **`35.60 ms`** | **`4.19 ms`** | **88.2% FASTER** |

## Author

**Diya Shah** — B.Tech IT, CSPIT, CHARUSAT University  
[GitHub](https://github.com/diya2405)
