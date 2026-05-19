# ⚡ CodeTrack — Futuristic LeetCode & Content Creator Dashboard

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Recharts-22b5e3?style=for-the-badge&logoColor=white" alt="Recharts" />
  <br />
  <a href="#-features">Explore Features</a> •
  <a href="#%EF%B8%8F-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-project-architecture">Project Architecture</a>
</div>

---

**CodeTrack** is a premium, SaaS-like productivity tracker designed specifically for coding content creators, educators, and software engineers. Built with a clinical cyberpunk aesthetic, it features a state-of-the-art dark UI glowing with neon highlights, responsive glassmorphism containers, smooth animations, and advanced analytics.

It lets you seamlessly track your LeetCode DSA progress alongside your video production workflow (editing, uploading, and managing both Long-form videos and YouTube Shorts/Reels), complete with inline video previews.

---

## 🚀 Features

### 1. 📊 Interactive SaaS Dashboard
- **Dynamic Metrics**: Keep an eye on total questions solved, video editing logs, and upload counters.
- **Intelligent Streak Counter**: Calculates and tracks consecutive coding streaks based on completion dates.
- **Difficulty Stats**: Visualizes your progress through custom-designed Easy, Medium, and Hard progress bars with glowing states.
- **Recent Activity Feed**: Auto-sorts and lists recent question submissions.

### 2. 📝 Questions Tracker Grid
- **Workflow Toggle**: Separate tracking for **Long Videos** (tutorials) and **Short Videos** (Shorts/Reels) with independent `EDITED` and `UPLOADED` flags.
- **Cinematic Previews**: Embedded YouTube frame player lets you preview and watch uploaded videos in-app without redirection.
- **Notes & Intuitions**: Expandable text panels for recording DSA key insights.
- **Priority Filters**: Quick filter components to sort by difficulty, completion state, or keyword search.

### 3. 📈 Advanced Analytics
- **Activity Heatmap**: A GitHub-inspired 140-day contribution graph that changes color intensity depending on the volume of questions completed.
- **Topic Distribution**: An interactive, glowing donut chart built with Recharts, categorizing solved questions by DSA topics (e.g., Arrays, Backtracking, Graphs).

### 4. ⚙️ App Settings & Theme Engine
- **Dynamic Light/Dark Mode**: Utilizes custom CSS properties mapped through Tailwind CSS v4 variables to swap between themes instantly.
- **Browser Notifications**: Native browser permission integration to trigger desktop reminders.
- **Confetti Toggle**: Turn rewarding victory confetti animations on or off.
- **Data Export & Clear**: Backup your progress in JSON or trigger a master factory reset.

---

## 🛠️ Tech Stack

| Technology | Purpose | Key Features |
| :--- | :--- | :--- |
| **React JS 19** | Frontend Framework | State-driven UI, Context API, Hooks |
| **Vite** | Build Tool | Lightning-fast Hot Module Replacement (HMR) |
| **Tailwind CSS v4** | UI Styling | CSS Variables theme mapping, custom utility classes |
| **Framer Motion** | Motion Graphics | Silky physics-based spring toggles and animations |
| **Recharts** | Data Visualizations | Glowing donut charts and interactive tooltips |
| **Canvas Confetti** | Gamification | Visual reward triggers upon completing questions |
| **Local Storage** | Data Persistence | Offline-first, browser-level database |

---

## 🏁 Getting Started

To get a local copy of CodeTrack running, follow these steps.

### Prerequisites
Make sure you have Node.js (version 18 or higher) and npm installed.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/priyabratasahoo780/video_tracker.git
   ```
2. Navigate to the project folder:
   ```bash
   cd video_tracker
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

Open your browser and navigate to `http://localhost:5173` to explore CodeTrack.

---

## 📁 Project Architecture

```
video_tracker/
├── public/                  # Favicons and Static SVGs
├── src/
│   ├── assets/              # SVGs, banners, and static assets
│   ├── components/
│   │   ├── AddQuestionModal.jsx  # Fully functional creator questionnaire
│   │   └── Sidebar.jsx      # Cyberpunk neon responsive sidebar navigation
│   ├── context/
│   │   └── AppContext.jsx   # Global Context, local storage synchronization, & settings logic
│   ├── pages/
│   │   ├── Dashboard.jsx    # Stats, Recent feed, and progress metrics
│   │   ├── Tracker.jsx      # DSA question grid, search filters, and YouTube previews
│   │   ├── Analytics.jsx    # Heatmaps and Recharts distribution
│   │   ├── Profile.jsx      # User credentials and custom avatar fields
│   │   └── Settings.jsx     # Theme variables, notifications, and factory reset
│   ├── App.jsx              # Navigation Router setup
│   ├── index.css            # Tailwind Imports, Theme configurations & Global overrides
│   └── main.jsx             # React Virtual DOM mounting
├── vite.config.js           # Vite Tailwind configuration
└── package.json             # Core scripts and dependencies
```

---

## 🛡️ License
Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <p>Designed with ❤️ by CodeTrack Creators</p>
</div>
