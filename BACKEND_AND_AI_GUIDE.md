# NEXUS // Full-Stack Backend & AI Integration Guide

This guide details how to turn **NEXUS (LinkedIn for Gamers)** from a client-side working product model into a production-grade full-stack SaaS application with real-time multiplayer networking, database persistence, and AI scout analytics.

---

## 1. Recommended Full-Stack Architecture

```
┌────────────────────────────────────────────────────────┐
│                   NEXUS Frontend                       │
│    React 19 + TypeScript + Vite + Web Audio SFX        │
└───────────────────────────┬────────────────────────────┘
                            │ HTTPS / WSS
┌───────────────────────────▼────────────────────────────┐
│              API / Serverless Functions                 │
│         (Vercel Serverless / Next.js / Fastify)        │
├───────────────────────────┬────────────────────────────┤
│  • Auth & Session Guards  │  • Riot/Steam API Proxies  │
│  • AI Scout Orchestration │  • 128-tick Scrim Sockets  │
└─────────────┬─────────────┴──────────────┬─────────────┘
              │                            │
┌─────────────▼──────────────┐ ┌───────────▼─────────────┐
│    Database & Storage      │ │     Multimodal AI       │
│  Supabase (PostgreSQL)     │ │  Google Gemini 1.5 Flash│
│  • pgvector for matchmaking│ │  • Video VOD Telemetry  │
│  • Row Level Security (RLS)│ │  • AI Scout Audits      │
│  • Realtime Subscriptions  │ │  • Tailored Job Pitches │
└────────────────────────────┘ └─────────────────────────┘
```

---

## 2. Database Schema (PostgreSQL / Supabase SQL)

Copy and execute this script directly in the **Supabase SQL Editor**:

```sql
-- Enable Vector extension for semantic matchmaking
CREATE EXTENSION IF NOT EXISTS vector;

-- 1. Profiles Table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  gamertag TEXT NOT NULL UNIQUE,
  real_name TEXT,
  handle TEXT NOT NULL UNIQUE,
  title TEXT,
  bio TEXT,
  location TEXT,
  level INT DEFAULT 1,
  current_xp INT DEFAULT 0,
  next_level_xp INT DEFAULT 1000,
  avatar_url TEXT,
  banner_url TEXT,
  status TEXT DEFAULT 'LFR (Looking for Roster)',
  radar_stats JSONB DEFAULT '[
    {"label": "Mechanics / Aim", "value": 90, "key": "aim"},
    {"label": "Tactical IGL / Sense", "value": 90, "key": "igl"},
    {"label": "Clutch / Composure", "value": 90, "key": "clutch"},
    {"label": "Zero Tilt / PMA", "value": 90, "key": "pma"},
    {"label": "Team Synergy", "value": 90, "key": "synergy"},
    {"label": "Engine Dev", "value": 85, "key": "dev"}
  ]'::jsonb,
  hardware JSONB DEFAULT '[]'::jsonb,
  playstyle_embedding vector(1536), -- Vector representation for AI matchmaking
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Verified Accounts Table (Riot, Steam, Faceit)
CREATE TABLE public.verified_accounts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  platform_username TEXT NOT NULL,
  badge TEXT NOT NULL,
  rank TEXT NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  color TEXT,
  telemetry_payload JSONB,
  synced_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Posts & Plaza Feed
CREATE TABLE public.posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  post_type TEXT NOT NULL CHECK (post_type IN ('milestone', 'roster_move', 'devlog', 'clip_drop', 'lfg')),
  tags TEXT[] DEFAULT '{}',
  media_url TEXT,
  reactions JSONB DEFAULT '{"gg": 0, "clutch": 0, "vouched": 0, "brain": 0}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Post Comments
CREATE TABLE public.post_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  upvotes INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Jobs & Opportunities
CREATE TABLE public.jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  org_name TEXT NOT NULL,
  org_logo TEXT,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('esports', 'studio', 'creator', 'bounty')),
  game_engine TEXT NOT NULL,
  salary TEXT NOT NULL,
  region TEXT NOT NULL,
  is_remote BOOLEAN DEFAULT FALSE,
  required_rank TEXT,
  description TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'Open',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Applications
CREATE TABLE public.job_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE,
  applicant_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  pitch TEXT NOT NULL,
  status TEXT DEFAULT 'Submitted',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are readable by everyone"
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can edit their own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Public posts readable by everyone"
  ON public.posts FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create posts"
  ON public.posts FOR INSERT WITH CHECK (auth.role() = 'authenticated');
```

---

## 3. Real AI Implementation (Google Gemini & OpenAI)

Create an API Route or Serverless Function (e.g., `api/ai/scout-audit.ts`):

```typescript
// api/ai/scout-audit.ts
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { profile, targetJob } = await req.json();

    const prompt = `
You are an elite Tier 1 Esports Scout and Technical Gaming Recruitment Director.
Evaluate this gamer passport:

Gamertag: ${profile.gamertag}
Real Name: ${profile.realName}
Headline: ${profile.title}
Bio: ${profile.bio}
Verified Accounts: ${JSON.stringify(profile.verifiedAccounts)}
Radar Matrix: ${JSON.stringify(profile.radarStats)}
Target Role: ${targetJob ? targetJob.title + ' at ' + targetJob.organization : 'General Free Agency'}

Output JSON in the following schema:
{
  "scoutGrade": "A+",
  "score": 96.5,
  "summaryHeadline": "string",
  "tierReadiness": "string",
  "strengths": ["string", "string", "string"],
  "recommendations": ["string", "string"],
  "targetOrgs": ["string", "string"],
  "customPitch": "string"
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const data = JSON.parse(response.text || '{}');
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
    });
  }
}
```

### Multimodal Game Clip & VOD Analyzer
Using Gemini 1.5 Flash's video token capabilities, players can upload a `.mp4` clip (such as a 1v4 clutch) directly. Gemini processes the video frames and audio to:
1. Detect crosshair placement precision.
2. Measure reaction time in milliseconds between enemy visibility and first shot.
3. Quantify shotcalling clarity during utility deployments.

---

## 4. Deploying to Vercel & Pushing to GitHub

### Step 1: Initialize Git and Commit
```bash
git init
git add .
git commit -m "feat: complete interactive NEXUS gamer passport and SaaS platform"
```

### Step 2: Push to Your GitHub Account
1. Create a new repository on [github.com/new](https://github.com/new) named `linkedin-for-gamers` or `nexus-gamers`.
2. Link and push:
```bash
git branch -M main
git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
git push -u origin main
```

### Step 3: Deploy on Vercel
1. Go to [vercel.com/new](https://vercel.com/new).
2. Connect your GitHub account and select your repository.
3. Framework Preset: **Vite** (Vercel detects it automatically).
4. Environment Variables:
   - `VITE_SUPABASE_URL`: (Your Supabase project URL)
   - `VITE_SUPABASE_ANON_KEY`: (Your Supabase anon key)
   - `GEMINI_API_KEY`: (Your Google Gemini AI API key)
5. Click **Deploy**!
   Your site will be live instantly with global CDN caching and SSL certificates.
