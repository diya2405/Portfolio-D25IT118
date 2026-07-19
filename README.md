# Portfolio – D25IT118

A personal portfolio website built with React (Vite), created as part of the Advanced Web Development Frameworks (ITUE301) coursework at CHARUSAT University.

🔗 **Live Repo:** [github.com/diya2405/Portfolio-D25IT118](https://github.com/diya2405/Portfolio-D25IT118)

## Tech Stack
- React 18 (Vite)
- React Router v6
- CSS (custom, no framework)

## Features
- Multi-page navigation (Home, Projects, Contact) with React Router — no full page reloads
- Reusable, prop-driven components (Header, About, Education, Skills, Projects, Contact, Footer)
- Controlled form input with live character count on the Contact page
- State-driven UI toggle (show/hide tip)
- Clean, IDE-inspired UI design

## Project Structure
src/
├── components/
│   ├── Header.jsx
│   ├── About.jsx
│   ├── Education.jsx
│   ├── Skills.jsx
│   ├── Projects.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   └── Navbar.jsx
├── pages/
│   ├── Home.jsx
│   ├── ProjectsPage.jsx
│   └── ContactPage.jsx
├── App.jsx
├── App.css
└── main.jsx

## Getting Started

```bash
git clone https://github.com/diya2405/Portfolio-D25IT118.git
cd Portfolio-D25IT118
npm install
npm run dev
```

App runs at `http://localhost:5173/`

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

## Author
**Diya Shah** — B.Tech IT, CSPIT, CHARUSAT University
[GitHub](https://github.com/diya2405)
