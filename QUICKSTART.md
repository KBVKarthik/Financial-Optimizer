# Quick Start Guide

## Prerequisites

- Node.js 16 or higher
- npm (comes with Node.js)
- Windows/macOS/Linux

## Installation Steps

### Step 1: Install Backend Dependencies

Open PowerShell/Terminal and navigate to the backend folder:

```powershell
cd backend
npm install
```

This will install:

- express (REST API framework)
- cors (Cross-Origin Resource Sharing)
- better-sqlite3 (SQLite database)
- node-cache (In-memory caching)
- TypeScript and ts-node

### Step 2: Install Frontend Dependencies

Open a new PowerShell/Terminal window and navigate to the frontend folder:

```powershell
cd frontend
npm install
```

This will install:

- react & react-dom
- vite (build tool)
- tailwindcss (CSS framework)
- recharts (visualization library)
- axios (HTTP client)
- lucide-react (icons)
- TypeScript

## Running the Application

### Terminal 1 - Backend Server

```powershell
cd backend
npm run dev
```

You should see:

```
╔════════════════════════════════════════════════════════════════╗
║        Financial Optimizer API Server                          ║
╠════════════════════════════════════════════════════════════════╣
║ ✓ Server running on http://localhost:5000                      ║
║ ✓ Database initialized (SQLite)                               ║
║ ✓ Mock data loaded in cache                                   ║
...
```

### Terminal 2 - Frontend Server

```powershell
cd frontend
npm run dev
```

You should see:

```
VITE v5.0.8  ready in XXX ms

➜  Local:   http://localhost:3000/
```

### Step 3: Open in Browser

Open your web browser and go to: **http://localhost:3000**

You should see the Financial Optimizer dashboard with:

- Portfolio overview with live data
- Asset allocation charts
- Performance metrics

## Features You Can Test

1. **Overview Tab**: See your portfolio holdings and allocation
2. **Optimization Tab**: View the efficient frontier and optimized weights
3. **Analysis Tab**: Get personalized recommendations

## Production Build

### Build Backend

```powershell
cd backend
npm run build
npm start
```

### Build Frontend

```powershell
cd frontend
npm run build
```

Output will be in `frontend/dist/`

## Troubleshooting

### Port Already in Use

If port 5000 or 3000 is already in use:

- Backend: Change port in `backend/src/index.ts`
- Frontend: Edit `frontend/vite.config.ts`

### Database Issues

If you encounter database errors:

1. Delete `backend/portfolio.db`
2. Restart the backend server
3. Database will be recreated automatically

### Module Not Found Errors

```powershell
# Clear node_modules and reinstall
rm -r node_modules
npm install
```

### CORS Errors

Make sure:

1. Backend is running on http://localhost:5000
2. Frontend is running on http://localhost:3000
3. Both servers are running in separate terminals

## Project Structure

```
Financial-Optimizer/
├── backend/
│   ├── src/
│   │   ├── index.ts              # Main server file
│   │   ├── database/
│   │   │   └── db.ts             # Database initialization
│   │   ├── services/
│   │   │   ├── optimizer.ts       # Portfolio optimization algorithms
│   │   │   └── portfolioService.ts # Database operations
│   │   ├── routes/
│   │   │   └── portfolio.ts       # API endpoints
│   │   └── utils/
│   │       └── mockData.ts        # Mock data generator
│   ├── package.json
│   ├── tsconfig.json
│   └── portfolio.db               # SQLite database (auto-created)
│
├── frontend/
│   ├── src/
│   │   ├── main.tsx               # React entry point
│   │   ├── App.tsx                # Main app component
│   │   ├── components/
│   │   │   ├── Header.tsx         # Portfolio header
│   │   │   ├── AllocationChart.tsx # Pie charts
│   │   │   ├── EfficientFrontier.tsx # Frontier chart
│   │   │   ├── Optimization.tsx   # Comparison charts
│   │   │   ├── Recommendations.tsx # Recommendations
│   │   │   └── AssetTable.tsx     # Holdings table
│   │   ├── services/
│   │   │   └── api.ts             # API client
│   │   └── index.css              # Global styles
│   ├── index.html                 # HTML template
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── README.md                       # Full documentation
└── .gitignore
```

## Available API Endpoints

| Method | Endpoint                                 | Description                 |
| ------ | ---------------------------------------- | --------------------------- |
| GET    | `/api/health`                            | Health check                |
| GET    | `/api/portfolio/mock-portfolio`          | Get mock portfolio          |
| GET    | `/api/portfolio/stocks`                  | Get all stocks              |
| POST   | `/api/portfolio/optimize/max-sharpe`     | Max Sharpe optimization     |
| POST   | `/api/portfolio/optimize/min-volatility` | Min volatility optimization |
| POST   | `/api/portfolio/efficient-frontier`      | Generate efficient frontier |
| POST   | `/api/portfolio/analyze`                 | Analyze current portfolio   |
| GET    | `/api/portfolio/portfolios`              | Get all user portfolios     |
| POST   | `/api/portfolio/portfolios`              | Create new portfolio        |
| GET    | `/api/portfolio/recommendations/:id`     | Get recommendations         |

## Next Steps

1. **Customize Data**: Modify mock data in `backend/src/utils/mockData.ts`
2. **Add More Assets**: Edit the `mockStocks` array
3. **Change Optimization Parameters**: Adjust risk-free rate in `backend/src/services/optimizer.ts`
4. **Style Customization**: Edit Tailwind classes in components
5. **Add More Analysis**: Extend recommendation logic in frontend

## Support & Resources

- React Docs: https://react.dev
- Express.js: https://expressjs.com
- Tailwind CSS: https://tailwindcss.com
- Recharts: https://recharts.org
- TypeScript: https://www.typescriptlang.org

---

**Enjoy optimizing your portfolio! 📈**
