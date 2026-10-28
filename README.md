# Portfolio-D25IT118

A personal portfolio website built with **React (Vite)**, created as part of the Advanced Web Development Frameworks (ITUE301) coursework at CHARUSAT University. Integrated end-to-end with an Express/MongoDB backend, authentication, performance caching, and asynchronous event processing.

🔗 **Live Repo:** [github.com/diya2405/Portfolio-D25IT118](https://github.com/diya2405/Portfolio-D25IT118)  
🔗 **Backend Repo:** [github.com/diya2405/task-manager-api-D25IT118](https://github.com/diya2405/task-manager-api-D25IT118)

## Tech Stack

- React 18 (Vite)
- React Router v6
- CSS (custom, no framework)
- Fetch API (for backend integration)
- Node.js & MongoDB (backend)

## Features & Practicals Covered

- **Practical 1 — Component Architecture**: Reusable UI components (Header, About, Education, Skills, Footer)
- **Practical 2 — Routing & State Management**: Multi-page routing (`/`, `/projects`, `/contact`, `/tasks`, `/cache`, `/events`) with client-side state
- **Practical 3 — API Integration**: Live GitHub REST API repository fetch with loading spinner, retry logic, and search filter
- **Practical 6 — Full Stack CRUD**: Connected to MongoDB backend — tasks are persisted, modified, and deleted with toast feedback
- **Practical 7 — Authentication & Route Guarding**: JWT-based login/registration, token storage in `localStorage`, and `ProtectedRoute`
- **Practical 8 — Performance Optimization**: Route-based code splitting using `React.lazy()` and `<Suspense>` with custom `<PageLoader />`
- **Practical 9 — In-Memory Caching & Telemetry**: Interactive caching dashboard (`/cache`) measuring MongoDB query vs. `node-cache` response times
- **Practical 10 — Event-Driven Architecture (Event Desk)**: Live registration pipeline (`/events`) demonstrating non-blocking `EventEmitter` processing

## Project Structure

```
src/
├── api/
│   ├── auth.js               # Auth API client (register, login, me)
│   └── tasks.js              # Central API client (tasks, cache, event pipeline)
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
│   ├── Navbar.jsx            # Dynamic Navigation
│   ├── ProtectedRoute.jsx    # Route guard for authenticated pages
│   ├── PageLoader.jsx        # Suspense fallback UI for lazy chunks
│   ├── Auth.css              # Styling for Login & Register
│   ├── Cache.css             # Styling for Cache Dashboard
│   ├── Events.css            # Styling for Event Desk & Live Pipeline
│   ├── Tasks.jsx             # Full-stack task manager
│   ├── Tasks.css             # Styling for Tasks & Toast
│   └── Toast.jsx             # Toast notification component
├── context/
│   └── AuthContext.jsx       # Global auth state & token persistence
├── pages/
│   ├── Home.jsx
│   ├── ProjectsPage.jsx
│   ├── ContactPage.jsx
│   ├── TasksPage.jsx         # Route page wrapper for Tasks
│   ├── CachePage.jsx         # Caching & Performance Dashboard (Practical 9)
│   ├── EventsPage.jsx        # Event Desk & Live Pipeline (Practical 10)
│   ├── LoginPage.jsx         # User login page
│   ├── RegisterPage.jsx      # User registration page
│   └── NotFoundPage.jsx
├── App.jsx                   # Route configurations & AuthProvider wrapper
├── App.css
└── main.jsx
```

## Getting Started

```bash
# Clone the repository
git clone https://github.com/diya2405/Portfolio-D25IT118.git
cd Portfolio-D25IT118

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```

App runs at `http://localhost:5173/`

**Note:** For the backend API, start `task-manager-api-D25IT118` on `http://localhost:5000` (`node server.js`).

---

## Detailed Practical Highlights

### Practical 9 — In-Memory Caching and Query Optimization
- Created a dedicated **Cache & Performance Analytics Dashboard** at `/cache` (`CachePage.jsx`, `Cache.css`)
- **Interactive 3x3 Live Benchmark Tool**: Compares 3 uncached MongoDB queries with 3 cached RAM reads
- **Empirical Results**: In-memory caching achieves an **88.2% reduction in latency** (from ~35.6ms to ~4.2ms)

### Practical 10 — Asynchronous Processing with Event-Driven Architecture (Event Desk)
- **Interactive Event Desk at `/events`**:
  - **Left Form ("Enter an event")**: User enters Full Name, Email, Event, and Seats.
  - **Immediate 201 Response**: Server accepts entry instantly (`~30ms`) with an "Entry received" notification.
  - **Decoupled Asynchronous Processing**: Emits `event-desk-entry` on Node's native `EventEmitter`.
  - **Live Pipeline Visualization**:
    - **Waiting in line**: Initial queue stage.
    - **Being processed**: Background worker simulation (~2 seconds).
    - **Confirmed**: Automatically transitions with generated ticket code (`EVT-XXXXXX`).
  - **Real-time Updates**: Live polling continuously synchronizes state without refreshing the page.

#### Lab Evidence: Timestamp Ordering Proof

| Step | Action | Log Timestamp | Timing Analysis |
|---|---|---|---|
| 1 | HTTP POST `/events/register` | `05:13:32.246Z` | Request received |
| 2 | Immediate 201 Response sent | `05:13:32.249Z` | **Response delivered in 3ms** |
| 3 | Background Listener triggered | `05:13:32.253Z` | Listener offloaded to event loop |
| 4 | Worker Confirmation finished | `05:13:34.256Z` | **Finished 2.007s later in background** |

#### Key Analysis Questions

1. **Why does emitting an event not block the API response?**
   - The HTTP response is completed on the current tick of the call stack. The `EventEmitter` listener registers an asynchronous callback with the libuv event loop timer, allowing the client response to return immediately without waiting for background execution.
2. **What would happen if this work were executed synchronously inside the route handler?**
   - The user would be forced to wait for the entire 2000ms delay, degrading the perceived performance and throughput of the server.
3. **Why is `EventEmitter` suitable for this lab but requires message queues (RabbitMQ/Redis) at scale?**
   - `EventEmitter` is process-local and in-memory. If the Node process restarts, unhandled events are lost. Scaled production systems require persistent brokers with durability and cross-instance distribution.

## Author

**Diya Shah** — B.Tech IT, CSPIT, CHARUSAT University  
[GitHub](https://github.com/diya2405)
