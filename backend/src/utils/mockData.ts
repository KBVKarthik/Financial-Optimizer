import NodeCache from 'node-cache';
import { randomUUID } from 'crypto';

const cache = new NodeCache({ stdTTL: 0 }); // No expiration

export interface Stock {
  symbol: string;
  name: string;
  sector: string;
  price: number;
  change: number;
  changePercent: number;
}

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

const mockStocks: Stock[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', sector: 'Technology', price: 189.95, change: 2.45, changePercent: 1.31 },
  { symbol: 'MSFT', name: 'Microsoft Corporation', sector: 'Technology', price: 378.91, change: 5.23, changePercent: 1.40 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', sector: 'Technology', price: 139.67, change: 1.45, changePercent: 1.05 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', sector: 'Consumer Discretionary', price: 179.23, change: 3.12, changePercent: 1.77 },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', sector: 'Technology', price: 875.29, change: 12.34, changePercent: 1.43 },
  { symbol: 'JNJ', name: 'Johnson & Johnson', sector: 'Healthcare', price: 158.74, change: 0.89, changePercent: 0.56 },
  { symbol: 'V', name: 'Visa Inc.', sector: 'Financials', price: 258.96, change: 2.13, changePercent: 0.83 },
  { symbol: 'WMT', name: 'Walmart Inc.', sector: 'Consumer Staples', price: 92.34, change: 1.23, changePercent: 1.35 },
  { symbol: 'DIS', name: 'The Walt Disney Company', sector: 'Communication Services', price: 92.50, change: 1.89, changePercent: 2.08 },
  { symbol: 'XOM', name: 'Exxon Mobil Corporation', sector: 'Energy', price: 116.34, change: -0.45, changePercent: -0.39 },
  { symbol: 'TSLA', name: 'Tesla Inc.', sector: 'Automotive', price: 242.84, change: 5.67, changePercent: 2.39 },
  { symbol: 'META', name: 'Meta Platforms Inc.', sector: 'Technology', price: 468.92, change: 8.45, changePercent: 1.83 },
  { symbol: 'BA', name: 'The Boeing Company', sector: 'Industrials', price: 178.59, change: 2.34, changePercent: 1.32 },
  { symbol: 'IBM', name: 'International Business Machines', sector: 'Technology', price: 183.45, change: 1.12, changePercent: 0.62 },
  { symbol: 'INTC', name: 'Intel Corporation', sector: 'Technology', price: 45.89, change: 0.67, changePercent: 1.48 },
];

function generateMockAssets(): Asset[] {
  const selectedStocks = mockStocks.slice(0, 8);
  const assets: Asset[] = [];

  selectedStocks.forEach((stock) => {
    const quantity = Math.floor(Math.random() * 100) + 10;
    const purchasePrice = stock.price * (0.8 + Math.random() * 0.4);
    const currentValue = quantity * stock.price;
    
    assets.push({
      id: randomUUID(),
      symbol: stock.symbol,
      name: stock.name,
      quantity,
      purchasePrice,
      currentPrice: stock.price,
      sector: stock.sector,
      allocation: 0, // Will be calculated
    });
  });

  // Calculate allocations
  const totalValue = assets.reduce((sum, asset) => sum + asset.quantity * asset.currentPrice, 0);
  assets.forEach((asset) => {
    asset.allocation = ((asset.quantity * asset.currentPrice) / totalValue) * 100;
  });

  return assets;
}

function generateMockPortfolio(): Portfolio {
  const assets = generateMockAssets();
  const totalValue = assets.reduce((sum, asset) => sum + asset.quantity * asset.currentPrice, 0);
  const allocation: Record<string, number> = {};

  assets.forEach((asset) => {
    allocation[asset.sector] = (allocation[asset.sector] || 0) + asset.allocation;
  });

  return {
    id: randomUUID(),
    name: 'My Investment Portfolio',
    description: 'Diversified investment portfolio',
    totalValue,
    assets,
    allocation,
    performance: {
      dayChange: totalValue * 0.02,
      dayChangePercent: 0.87,
      oneMonthReturn: 3.45,
      threeMonthReturn: 8.92,
      oneYearReturn: 24.56,
    },
  };
}

export function initializeCache() {
  // Store mock portfolio in cache
  const portfolio = generateMockPortfolio();
  cache.set('mockPortfolio', portfolio);

  // Store mock stocks in cache
  cache.set('mockStocks', mockStocks);

  console.log('✓ Mock data initialized in cache');
  return portfolio;
}

export function getMockPortfolio(): Portfolio | undefined {
  return cache.get('mockPortfolio');
}

export function getMockStocks(): Stock[] | undefined {
  return cache.get('mockStocks');
}

export function getCache() {
  return cache;
}
