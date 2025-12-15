import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
  sector: string;
  allocation: number;
}

export interface Portfolio {
  id: string;
  name: string;
  description: string;
  totalValue: number;
  assets: Asset[];
  allocation: Record<string, number>;
  performance: {
    dayChange: number;
    dayChangePercent: number;
    oneMonthReturn: number;
    threeMonthReturn: number;
    oneYearReturn: number;
  };
}

export interface OptimizationResult {
  weights: Record<string, number>;
  expectedReturn: number;
  volatility: number;
  sharpeRatio: number;
}

export interface EfficientFrontierPoint {
  volatility: number;
  expectedReturn: number;
  weights: Record<string, number>;
  sharpeRatio: number;
}

export const portfolioAPI = {
  getMockPortfolio: async (): Promise<Portfolio> => {
    const response = await api.get('/portfolio/mock-portfolio');
    return response.data;
  },

  getStocks: async () => {
    const response = await api.get('/portfolio/stocks');
    return response.data;
  },

  optimizeMaxSharpe: async (): Promise<OptimizationResult> => {
    const response = await api.post('/portfolio/optimize/max-sharpe');
    return response.data;
  },

  optimizeMinVolatility: async (): Promise<OptimizationResult> => {
    const response = await api.post('/portfolio/optimize/min-volatility');
    return response.data;
  },

  getEfficientFrontier: async (): Promise<EfficientFrontierPoint[]> => {
    const response = await api.post('/portfolio/efficient-frontier');
    return response.data;
  },

  analyzePortfolio: async (): Promise<OptimizationResult> => {
    const response = await api.post('/portfolio/analyze');
    return response.data;
  },

  getAllPortfolios: async (): Promise<Portfolio[]> => {
    const response = await api.get('/portfolio/portfolios');
    return response.data;
  },

  getPortfolio: async (id: string): Promise<Portfolio> => {
    const response = await api.get(`/portfolio/portfolio/${id}`);
    return response.data;
  },

  createPortfolio: async (name: string, description: string, assets: Asset[]): Promise<Portfolio> => {
    const response = await api.post('/portfolio/portfolios', {
      name,
      description,
      assets,
    });
    return response.data;
  },

  deletePortfolio: async (id: string): Promise<void> => {
    await api.delete(`/portfolio/portfolio/${id}`);
  },

  getRecommendations: async (portfolioId: string) => {
    const response = await api.get(`/portfolio/recommendations/${portfolioId}`);
    return response.data;
  },

  addRecommendation: async (portfolioId: string, type: string, title: string, description: string, priority: string): Promise<void> => {
    await api.post(`/portfolio/recommendations/${portfolioId}`, {
      type,
      title,
      description,
      priority,
    });
  },
};
