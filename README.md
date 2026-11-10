<div align="center">

# 🎮 NEXUS // THE GAMER PASSPORT
### The Universal Professional & Career Network for Gamers, Esports Athletes, and Game Developers

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Flivedashboardsite%2FLinkedinforGamers)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

**Where proof of skill replaces the corporate resume.**

[Live Demo](#-getting-started) • [Features](#-features) • [Multi-Device Design](#-multi-device-responsive-design) • [AI & Backend Architecture](#-backend--ai-architecture) • [Deployment](#-one-click-deploy-to-vercel)

</div>

---

## 🌟 Overview

Traditional platforms like LinkedIn fail gamers with corporate jargon and endorsements for dead software. Discord loses persistent competitive reputation in noisy channels. 

**NEXUS** is built from the ground up for gaming culture:
- **Verified Game Telemetry**: Sync ranks and match logs directly from Riot Games, Steam, and Faceit.
- **Dynamic Character Sheet**: 6-axis interactive RPG attribute matrix (Aim, IGL, Clutch, PMA, Synergy, Engine Dev).
- **The Plaza Feed**: Broadcast milestones, free agency moves, Unreal Engine 5 devlogs, and clutch clips.
- **Autonomous AI Scout & Career Co-Pilot**: In-app AI evaluating character sheets, measuring tactical strengths, and drafting tailored job application pitches.
- **LFG & Careers Marketplace**: Verified team roster trials, AAA studio contracts, creator sponsorships, and indie bounties.
- **Tactical Scrim Radar**: 128-tick low-latency scrim matchmaking with live MMR balancing and voice channel integration.

---

## 🚀 Features

### 1. 🛡️ The Verified Character Sheet
- Consolidates peak ELO, tournament history, and peer vouches into an undeniable gamer passport.
- **Interactive Attribute Polygon**: Drag and adjust radar stats to simulate playstyle adjustments with real-time recalculations.
- **Peer Commendation Vouching**: Vouch for teammates with round-specific proof and anti-tilt guarantees.
- **Battlestation Specs**: Verified hardware specs (RTX 4090, 360Hz DyAc+, Wooting 60HE rapid trigger).

### 2. ⚡ The Plaza (Community Signal Feed)
- Broadcast milestones, VCT qualifier VODs, and UE5 netcode breakthroughs.
- **Gamer Reactions**: React with **GG**, **Clutch**, **Vouched**, or **Big Brain** with tactile audio feedback.
- **Interactive Comment Threads**: Expandable discussion threads with upvoting and live reply counters.
- **Live Transfer Portal**: Real-time ticker tracking pro signings, free agent declarations, and studio bounties.

### 3. 🤖 Nexus AI Scout & Co-Pilot
- **Profile Telemetry Audit**: Multimodal AI scout evaluation calculating scout grades (e.g. `A+ / 96.8`), tactical strengths, and roster recommendations.
- **AI Application Pitch Writer**: Tailored cover pitches for target franchises with selectable tones (*Tactical*, *Competitive Alpha*, *Systems Specialist*).
- **Full-Stack Blueprint**: Complete serverless function examples for Google Gemini 1.5 Flash and OpenAI GPT-4o.

### 4. 🎯 Tactical Scrim Radar
- Zero-friction matchmaking for competitive 5v5 teams, 10-man inhouse lobbies, and duo finder.
- Real-time radar sweep animation with blip tracking and Chicago / Ashburn / Frankfurt server selection.
- Match found modal with team stats and audio chime.

### 5. 💼 LFG & Careers Marketplace
- Filter by category (*Esports*, *Studio & Dev*, *Creator & Coaching*) and location (*100% Remote*, *North America*).
- Bookmark/save roles and track application status.
- One-click **"Apply with Passport"** with celebration confetti.

---

## 📱 Multi-Device Responsive Design

NEXUS is engineered to perform without breakpoints across all viewports:

| Device | Viewport | Features & Optimization |
|---|---|---|
| **Mobile Phones** | `320px – 480px` | Native fixed bottom dock (`MobileBottomNav.tsx`), adaptive 4-col reaction grid, fluid SVG radar chart, stacked form controls, hamburger slide-down menu. |
| **Phablets & Foldables** | `481px – 768px` | 2-column verified account cards, touch-scrolling filter strips, full-width touch targets (min 44px). |
| **Tablets & iPads** | `769px – 1024px` | Single-column feed with prioritized sidebars below, 3-column account cards, 2-column bento & persona grids. |
| **Laptops & Desktops** | `1025px – 1440px` | Full navigation header, live search, `⌘K` command palette, audio synthesizer toggle, 2-column Plaza layout. |
| **Ultrawide Monitors** | `1440px+` | Capped at `1360px` with centered alignment and subtle cyber ambient lighting. |

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite 8
- **Styling**: Cyberpunk Esports Glassmorphism (`backdrop-filter: blur(20px)`), CSS Variables, Keyframe Animations
- **Icons**: Lucide React
- **Audio**: Web Audio API Sound Synthesizer (`utils/audio.ts`)
- **FX**: Canvas Confetti
- **Linter**: Oxlint (0 warnings, 0 errors)
- **Deployment**: Vercel (`vercel.json`)

---

## 🗄️ Backend & AI Architecture

For the complete PostgreSQL / Supabase SQL schema, Row Level Security (RLS) policies, and Google Gemini multimodal video telemetry API routes, see:
👉 [BACKEND_AND_AI_GUIDE.md](./BACKEND_AND_AI_GUIDE.md)

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js 18+ installed

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/livedashboardsite/LinkedinforGamers.git
cd LinkedinforGamers

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build & Lint

```bash
# Build for production
npm run build

# Run Oxlint
npm run lint
```

---

## ☁️ One-Click Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Flivedashboardsite%2FLinkedinforGamers)

1. Click the button above to import this repository into your Vercel account.
2. Framework is detected as **Vite**.
3. Click **Deploy** to launch your live URL with global CDN caching and SSL.

---

## 📄 License

MIT License — free for competitive gamers, game developers, and creators worldwide.
