# File Directory & Navigation Guide

## 📍 You Are Here

```
c:\Users\Karthik\Desktop\K Bhavani Venkata Karthik\Financial-Optimizer\
```

---

## 📋 Documentation Files (Read These First!)

| File                    | Purpose                       | Read Time | Start Here? |
| ----------------------- | ----------------------------- | --------- | ----------- |
| **PROJECT_COMPLETE.md** | Project summary & quick start | 3 min     | ✅ YES      |
| **QUICKSTART.md**       | Installation guide            | 5 min     | 👈 SECOND   |
| **README.md**           | Full documentation            | 15 min    | THIRD       |
| **FEATURES.md**         | Detailed features             | 10 min    | Reference   |
| **DEPLOYMENT.md**       | Production setup              | 10 min    | When ready  |
| **INDEX.md**            | Documentation index           | 5 min     | Reference   |
| **.gitignore**          | Git ignore config             | -         | Auto        |

---

## 📁 Backend Structure

```
backend/
├── src/
│   ├── index.ts                    # ⭐ MAIN SERVER FILE
│   │                              # - Starts Express server
│   │                              # - Initializes database & cache
│   │                              # - Port 5000
│   │
│   ├── database/
│   │   └── db.ts                 # SQLite initialization
│   │                              # - Creates tables
│   │                              # - Database connection
│   │
│   ├── services/
│   │   ├── optimizer.ts          # ⭐ OPTIMIZATION ENGINE
│   │   │                          # - Modern Portfolio Theory
│   │   │                          # - Monte Carlo simulation
│   │   │                          # - Efficient frontier
│   │   │                          # - Sharpe ratio calculations
│   │   │
│   │   └── portfolioService.ts   # Database operations
│   │                              # - CRUD for portfolios
│   │                              # - Asset management
│   │                              # - Recommendations
│   │
│   ├── routes/
│   │   └── portfolio.ts          # ⭐ API ENDPOINTS
│   │                              # - 13 REST endpoints
│   │                              # - Request handlers
│   │
│   └── utils/
│       └── mockData.ts           # ⭐ MOCK DATA & CACHE
│                                  # - In-memory caching
│                                  # - Mock stocks
│                                  # - Sample portfolio
│
├── package.json                   # Dependencies config
├── tsconfig.json                  # TypeScript config
└── portfolio.db                   # SQLite database (auto-created)
```

### Backend Key Files to Understand

1. **Start here**: `backend/src/index.ts` - Server setup
2. **Then**: `backend/src/routes/portfolio.ts` - API structure
3. **Then**: `backend/src/services/optimizer.ts` - Algorithms
4. **Reference**: `backend/src/utils/mockData.ts` - Data format

---

## 📁 Frontend Structure

```
frontend/
├── src/
│   ├── main.tsx                    # React entry point
│   │
│   ├── App.tsx                    # ⭐ MAIN APP COMPONENT
│   │                              # - Tab navigation
│   │                              # - Data fetching
│   │                              # - Layout
│   │
│   ├── components/                # React components
│   │   ├── Header.tsx            # Portfolio header & stats
│   │   ├── AllocationChart.tsx   # Pie charts (sector & assets)
│   │   ├── EfficientFrontier.tsx # Frontier visualization
│   │   ├── Optimization.tsx      # Comparison charts & weights
│   │   ├── Recommendations.tsx   # Smart recommendations
│   │   └── AssetTable.tsx        # Holdings table
│   │
│   ├── services/
│   │   └── api.ts                # ⭐ API CLIENT
│   │                              # - Axios configuration
│   │                              # - API methods
│   │                              # - TypeScript types
│   │
│   └── index.css                  # Global Tailwind styles
│
├── index.html                      # HTML template
├── package.json                    # Dependencies config
├── vite.config.ts                  # Vite build config
├── tsconfig.json                   # TypeScript config
├── tailwind.config.js              # Tailwind CSS config
└── postcss.config.js               # PostCSS config
```

### Frontend Key Files to Understand

1. **Start here**: `frontend/src/App.tsx` - Main component
2. **Then**: `frontend/src/components/Header.tsx` - Header layout
3. **Then**: `frontend/src/services/api.ts` - API integration
4. **Reference**: Individual components - UI elements

---

## 🔑 Key Component Mapping

### API to Frontend Flow

```
frontend/src/App.tsx
    ↓ (calls)
frontend/src/services/api.ts (portfolioAPI)
    ↓ (fetches from)
http://localhost:5000/api/portfolio/*
    ↓ (handled by)
backend/src/routes/portfolio.ts
    ↓ (uses)
backend/src/services/optimizer.ts
backend/src/services/portfolioService.ts
    ↓ (stores/caches in)
backend/src/utils/mockData.ts
backend/src/database/db.ts
```

---

## 📊 Component Breakdown

### Tab 1: Overview

Components involved:

- `Header.tsx` - Portfolio header & stats
- `AllocationChart.tsx` - Sector pie chart
- `AllocationChart.tsx` - Asset pie chart
- `AssetTable.tsx` - Holdings table

### Tab 2: Optimization

Components involved:

- `EfficientFrontier.tsx` - Frontier graph
- `Optimization.tsx` - Comparison charts
- `Optimization.tsx` - Weight bars (multiple)

### Tab 3: Analysis

Components involved:

- `Recommendations.tsx` - Smart suggestions
- Three metric cards (in App.tsx)

---

## 🗺️ Quick File Navigation

### I want to...

**Change the mock portfolio data:**
→ `backend/src/utils/mockData.ts` (lines 20-40)

**Add a new API endpoint:**
→ `backend/src/routes/portfolio.ts` (add route)
→ `backend/src/services/portfolioService.ts` (add logic)

**Change UI colors:**
→ `frontend/src/components/*.tsx` (Tailwind classes)
→ `frontend/tailwind.config.js` (custom colors)

**Modify optimization parameters:**
→ `backend/src/services/optimizer.ts` (riskFreeRate, iterations)

**Add a new database table:**
→ `backend/src/database/db.ts` (create table)
→ `backend/src/services/portfolioService.ts` (add methods)

**Create a new chart:**
→ `frontend/src/components/` (new .tsx file)
→ `frontend/src/App.tsx` (import & use)

**Change API URL:**
→ `frontend/src/services/api.ts` (API_BASE_URL)

**Add error handling:**
→ `frontend/src/App.tsx` (try/catch)
→ `backend/src/index.ts` (error middleware)

---

## 📦 Dependencies Overview

### Backend Dependencies

```json
{
  "cors": "Handle cross-origin requests",
  "express": "Web framework",
  "better-sqlite3": "Database driver",
  "node-cache": "In-memory caching"
}
```

### Frontend Dependencies

```json
{
  "react": "UI library",
  "react-dom": "React DOM",
  "axios": "HTTP client",
  "recharts": "Chart library",
  "lucide-react": "Icons",
  "tailwindcss": "CSS framework"
}
```

---

## 🎯 File Size Reference

| File                              | Size              | Complexity         |
| --------------------------------- | ----------------- | ------------------ |
| backend/src/index.ts              | ~50 lines         | ⭐ Simple          |
| backend/src/services/optimizer.ts | ~300 lines        | ⭐⭐⭐⭐⭐ Complex |
| backend/src/utils/mockData.ts     | ~150 lines        | ⭐⭐ Moderate      |
| frontend/src/App.tsx              | ~250 lines        | ⭐⭐⭐ Complex     |
| frontend/src/components/\*.tsx    | 50-150 lines each | ⭐⭐ Moderate      |

---

## 🔍 Where to Find Things

### Database Schema

→ `backend/src/database/db.ts` (tables 1-4)

### API Routes

→ `backend/src/routes/portfolio.ts` (all endpoints)

### React Hooks

→ `frontend/src/App.tsx` (useEffect, useState)

### Chart Configuration

→ `frontend/src/components/AllocationChart.tsx`
→ `frontend/src/components/EfficientFrontier.tsx`

### Styling/Theme

→ `frontend/tailwind.config.js`
→ `frontend/src/index.css`

### Type Definitions

→ `frontend/src/services/api.ts` (interfaces)
→ `backend/src/services/optimizer.ts` (types)

---

## 📚 Documentation Cross-Reference

### Getting Started

- QUICKSTART.md → Installation steps
- PROJECT_COMPLETE.md → What you have

### Understanding Features

- FEATURES.md → Complete feature list
- README.md → Detailed documentation

### Deploying

- DEPLOYMENT.md → Production setup
- README.md → Building instructions

### Learning the Code

- Inline comments in source files
- This file for navigation

---

## 🚀 Quick Commands

```bash
# Backend
cd backend && npm install && npm run dev

# Frontend
cd frontend && npm install && npm run dev

# Build for production
npm run build --prefix backend
npm run build --prefix frontend

# Check types
npm run type-check --prefix backend
npm run type-check --prefix frontend
```

---

## 🎯 Development Workflow

1. **Start Backend**: `cd backend && npm run dev`
2. **Start Frontend**: `cd frontend && npm run dev`
3. **Edit Files**: Make changes in `src/` directories
4. **Hot Reload**: Changes auto-update in browser
5. **Check Console**: Browser dev tools for errors
6. **Terminal Logs**: Backend logs in terminal

---

## 📞 File Dependency Graph

```
Frontend:
  App.tsx
    ├→ components/Header.tsx
    ├→ components/AllocationChart.tsx
    ├→ components/EfficientFrontier.tsx
    ├→ components/Optimization.tsx
    ├→ components/Recommendations.tsx
    ├→ components/AssetTable.tsx
    └→ services/api.ts
        └→ http://localhost:5000/api

Backend:
  index.ts
    ├→ database/db.ts
    ├→ routes/portfolio.ts
    │   ├→ services/optimizer.ts
    │   ├→ services/portfolioService.ts
    │   └→ utils/mockData.ts
    └→ cors, express setup
```

---

## ✅ File Checklist

Use this to verify all files are present:

### Backend Files (✅ verify these exist)

- [ ] `backend/src/index.ts`
- [ ] `backend/src/database/db.ts`
- [ ] `backend/src/services/optimizer.ts`
- [ ] `backend/src/services/portfolioService.ts`
- [ ] `backend/src/routes/portfolio.ts`
- [ ] `backend/src/utils/mockData.ts`
- [ ] `backend/package.json`
- [ ] `backend/tsconfig.json`

### Frontend Files (✅ verify these exist)

- [ ] `frontend/src/main.tsx`
- [ ] `frontend/src/App.tsx`
- [ ] `frontend/src/components/Header.tsx`
- [ ] `frontend/src/components/AllocationChart.tsx`
- [ ] `frontend/src/components/EfficientFrontier.tsx`
- [ ] `frontend/src/components/Optimization.tsx`
- [ ] `frontend/src/components/Recommendations.tsx`
- [ ] `frontend/src/components/AssetTable.tsx`
- [ ] `frontend/src/services/api.ts`
- [ ] `frontend/src/index.css`
- [ ] `frontend/index.html`
- [ ] `frontend/package.json`
- [ ] `frontend/vite.config.ts`
- [ ] `frontend/tsconfig.json`
- [ ] `frontend/tailwind.config.js`
- [ ] `frontend/postcss.config.js`

### Documentation Files (✅ verify these exist)

- [ ] `README.md`
- [ ] `QUICKSTART.md`
- [ ] `FEATURES.md`
- [ ] `DEPLOYMENT.md`
- [ ] `INDEX.md`
- [ ] `PROJECT_COMPLETE.md`
- [ ] `STRUCTURE.md` (this file)

### Root Files (✅ verify these exist)

- [ ] `package.json`
- [ ] `.gitignore`

---

## 🎊 You're Ready!

All files are in place. Start with **PROJECT_COMPLETE.md**, then **QUICKSTART.md**.

Happy coding! 🚀
