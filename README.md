<div align="center">

# ⚡ Agus Irawan — Portfolio & Engineering Workbench

[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TanStack Start](https://img.shields.io/badge/TanStack_Start-000000?style=for-the-badge&logo=react-router&logoColor=FF4154)](https://tanstack.com/start)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/)

<p align="center">
  A modern, high-performance interactive developer portfolio engineered with TanStack Start, 3D CSS cylinder projections, scroll-driven video scrubbing, and a 21st.dev-inspired AI skills workbench.
</p>

[**Explore Live Demo**](https://github.com/kusanaligirl-lgtm/portfolio) · [**Report Bug**](https://github.com/kusanaligirl-lgtm/portfolio/issues) · [**Contact Author**](mailto:kusanaligirl@gmail.com)

</div>

---

## 🌟 Key Interactive Features

### 1. 🎬 Pure Scroll-Controlled Video Scrubbing
- **Physics Engine**: Smooth 60fps RequestAnimationFrame LERP loop (`diff * 0.14`) that maps window scroll distance directly to video playback timecodes.
- **Strictly Scroll-Driven**: Zero autonomous background playback — video frame advances strictly when the user scrolls.
- **Viewport Culling**: Video rendering and hardware compositing are completely paused when scrolled past the hero and about sections, saving GPU VRAM and battery.

### 2. 🌀 3D Circular Revolver Project Gallery
- **3D Cylinder Physics**: Projects are projected in a 3D cylindrical carousel with dynamic depth perspective (`rotateY`, `translateZ`).
- **Tactile Drag & Inertia**: Direct mouse dragging and touch swiping with exponential friction deceleration.
- **Intersection Observer**: Auto-rotation loops only execute when the gallery is inside the viewport.

### 3. 🧰 21st.dev-Inspired Skills Workbench
- **Cursor Spotlight Glow**: Real-time radial neon gradient (`#C8F135`) tracking local cursor coordinates on glassmorphic cards.
- **Discipline Filter Tabs**: Animated layout slider for filtering AI/ML, Frontend, Backend, and DevOps toolsets.
- **Active Telemetry Matrix**: 18 branded technology cards with micro-zoom hover states and instant telemetry inspection.
- **Live Code Workstation**: Interactive code runner preview with real-time latency and type-safety benchmarks.

### 4. 🪶 Floating Magnetic Tool Badges
- Spring repulsion physics (`stiffness: 260, damping: 18`) where tool badges gently drift away when the cursor approaches.

### 5. 📝 Resilient Guestbook & Contact System
- Serverless-compatible in-memory and filesystem storage with optimistic UI updates.

---

## 🛠️ Tech Stack

- **Core Framework**: [TanStack React Start](https://tanstack.com/start) + [Vite 7](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Custom Dark / Chartreuse Theme
- **Animations & Physics**: [Framer Motion](https://www.framer.com/motion/), [GSAP](https://greensock.com/), [Lenis Smooth Scroll](https://lenis.darkroom.engineering/)
- **Server & Deployment**: [Nitro](https://nitro.unjs.io/) (Universal SSR / Serverless Engine)

---

## 📂 Project Showcase

| Project | Stack | Description |
| :--- | :--- | :--- |
| **[AI Algo-Trading Engine](https://github.com/kusanaligirl-lgtm/app_trading)** | Python, PyTorch, XGBoost, FastAPI | High-performance algorithmic trading bot with walk-forward optimization and MetaTrader 5 execution. |
| **[UKM MP POLNEP Portal](https://github.com/kusanaligirl-lgtm/web-ukm)** | React, TailwindCSS, Vite | Modern web portal for university modeling & photography organization with booking services. |
| **[AritmaHub (Web Deret)](https://github.com/kusanaligirl-lgtm/AritmaHub)** | JavaScript, HTML/CSS, Neobrutalism | Playful, chunky mathematical series visualizer and sequence calculator. |
| **[Reminder Bot](https://github.com/kusanaligirl-lgtm/reminder-bot)** | Python, pyTelegramBotAPI, SQLite | Smart Telegram reminder bot with relative time syntax (`/remind 30m`). |
| **[Expense Tracker](https://github.com/kusanaligirl-lgtm/Expense-Tracker)** | Vanilla JS, Chart.js, LocalStorage | Clean daily personal finance spending tracker with monthly trend charts. |
| **[Invoice Generator](https://github.com/kusanaligirl-lgtm/invoice-generator)** | Vanilla JS, jsPDF | In-browser client invoice builder with real-time PDF generation. |

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js `20.x` or higher
- npm / pnpm / bun

### 1. Clone the repository
```bash
git clone https://github.com/kusanaligirl-lgtm/portfolio.git
cd portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production
```bash
npm run build
npm run start
```

---

## ☁️ Deployment

This project is built on **Nitro**, making it deployable anywhere with zero configuration:

### Deploy on Vercel
1. Push your changes to GitHub.
2. Go to [Vercel](https://vercel.com/new) and import the `portfolio` repository.
3. Vercel will automatically detect **TanStack Start / Nitro**.
4. Click **Deploy**.

---

## 👤 Author

**Agus Irawan**  
- GitHub: [@kusanaligirl-lgtm](https://github.com/kusanaligirl-lgtm)  
- Email: [kusanaligirl@gmail.com](mailto:kusanaligirl@gmail.com)  
- Role: Full-Stack Developer & AI Enthusiast

---

<div align="center">
  <sub>Built with precision, physics-based interactions, and modern web architecture.</sub>
</div>
