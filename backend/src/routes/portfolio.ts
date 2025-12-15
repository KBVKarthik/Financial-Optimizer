import { Router, Request, Response } from 'express';
import { getMockPortfolio, getMockStocks } from '../utils/mockData';
import { PortfolioOptimizer } from '../services/optimizer';
import { PortfolioService } from '../services/portfolioService';

const router = Router();

// Get mock portfolio
router.get('/mock-portfolio', (req: Request, res: Response) => {
  const portfolio = getMockPortfolio();
  if (!portfolio) {
    return res.status(404).json({ error: 'Portfolio not found' });
  }
  res.json(portfolio);
});

// Get all stocks
router.get('/stocks', (req: Request, res: Response) => {
  const stocks = getMockStocks();
  if (!stocks) {
    return res.status(404).json({ error: 'Stocks not found' });
  }
  res.json(stocks);
});

// Optimize portfolio for maximum Sharpe ratio
router.post('/optimize/max-sharpe', (req: Request, res: Response) => {
  const portfolio = getMockPortfolio();
  if (!portfolio) {
    return res.status(404).json({ error: 'Portfolio not found' });
  }

  const optimizer = new PortfolioOptimizer(portfolio.assets);
  const result = optimizer.optimizeForMaxSharpe();
  res.json(result);
});

// Optimize portfolio for minimum volatility
router.post('/optimize/min-volatility', (req: Request, res: Response) => {
  const portfolio = getMockPortfolio();
  if (!portfolio) {
    return res.status(404).json({ error: 'Portfolio not found' });
  }

  const optimizer = new PortfolioOptimizer(portfolio.assets);
  const result = optimizer.optimizeForMinVolatility();
  res.json(result);
});

// Generate efficient frontier
router.post('/efficient-frontier', (req: Request, res: Response) => {
  const portfolio = getMockPortfolio();
  if (!portfolio) {
    return res.status(404).json({ error: 'Portfolio not found' });
  }

  const optimizer = new PortfolioOptimizer(portfolio.assets);
  const frontier = optimizer.generateEfficientFrontier(50);
  res.json(frontier);
});

// Analyze current portfolio
router.post('/analyze', (req: Request, res: Response) => {
  const portfolio = getMockPortfolio();
  if (!portfolio) {
    return res.status(404).json({ error: 'Portfolio not found' });
  }

  const optimizer = new PortfolioOptimizer(portfolio.assets);
  const analysis = optimizer.analyzeCurrentPortfolio();
  res.json(analysis);
});

// Get portfolio from database
router.get('/portfolio/:id', (req: Request, res: Response) => {
  const portfolio = PortfolioService.getPortfolio(req.params.id);
  if (!portfolio) {
    return res.status(404).json({ error: 'Portfolio not found' });
  }
  res.json(portfolio);
});

// Get all portfolios
router.get('/portfolios', (req: Request, res: Response) => {
  const portfolios = PortfolioService.getAllPortfolios();
  res.json(portfolios);
});

// Create new portfolio
router.post('/portfolios', (req: Request, res: Response) => {
  const { name, description, assets } = req.body;

  if (!name || !assets) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const portfolio = PortfolioService.createPortfolio(name, description || '', assets);
  res.status(201).json(portfolio);
});

// Delete portfolio
router.delete('/portfolio/:id', (req: Request, res: Response) => {
  const success = PortfolioService.deletePortfolio(req.params.id);
  if (!success) {
    return res.status(500).json({ error: 'Failed to delete portfolio' });
  }
  res.json({ message: 'Portfolio deleted' });
});

// Get recommendations
router.get('/recommendations/:portfolioId', (req: Request, res: Response) => {
  const recommendations = PortfolioService.getRecommendations(req.params.portfolioId);
  res.json(recommendations);
});

// Add recommendation
router.post('/recommendations/:portfolioId', (req: Request, res: Response) => {
  const { type, title, description, priority } = req.body;

  if (!type || !title || !description) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  PortfolioService.addRecommendation(req.params.portfolioId, type, title, description, priority || 'medium');
  res.status(201).json({ message: 'Recommendation added' });
});

export default router;
