import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { initDatabase } from './database/db';
import { initializeCache } from './utils/mockData';
import portfolioRoutes from './routes/portfolio';

const app: Express = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database and cache
initDatabase();
initializeCache();

// Routes
app.use('/api/portfolio', portfolioRoutes);

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Financial Optimizer API is running' });
});

// Start server
app.listen(port, () => {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║        Financial Optimizer API Server                          ║
╠════════════════════════════════════════════════════════════════╣
║ ✓ Server running on http://localhost:${port}                  ║
║ ✓ Database initialized (SQLite)                               ║
║ ✓ Mock data loaded in cache                                   ║
║                                                                ║
║ Available endpoints:                                           ║
║  GET  /api/health                                              ║
║  GET  /api/portfolio/mock-portfolio                            ║
║  GET  /api/portfolio/stocks                                    ║
║  POST /api/portfolio/optimize/max-sharpe                       ║
║  POST /api/portfolio/optimize/min-volatility                   ║
║  POST /api/portfolio/efficient-frontier                        ║
║  POST /api/portfolio/analyze                                   ║
║  GET  /api/portfolio/portfolios                                ║
║  POST /api/portfolio/portfolios                                ║
╚════════════════════════════════════════════════════════════════╝
  `);
});
