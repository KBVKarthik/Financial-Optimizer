import { Asset } from '../utils/mockData';

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

// Simple statistics functions
function calculateMean(values: number[]): number {
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function calculateStdDev(values: number[], mean: number): number {
  const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
  return Math.sqrt(variance);
}

// Generate random returns based on historical price data
function generateAssetReturns(asset: Asset): number[] {
  const returns: number[] = [];
  const baseReturn = (asset.currentPrice - asset.purchasePrice) / asset.purchasePrice;
  const volatility = 0.02 + Math.random() * 0.03;

  for (let i = 0; i < 252; i++) {
    const randomWalk = (Math.random() - 0.5) * volatility;
    returns.push(baseReturn / 252 + randomWalk);
  }

  return returns;
}

export class PortfolioOptimizer {
  private assets: Asset[];
  private returns: Record<string, number[]> = {};
  private meanReturns: Record<string, number> = {};
  private stdDevs: Record<string, number> = {};
  private correlationMatrix: number[][] = [];
  private riskFreeRate = 0.04; // 4% risk-free rate

  constructor(assets: Asset[]) {
    this.assets = assets;
    this.calculateStatistics();
  }

  private calculateStatistics() {
    this.assets.forEach((asset) => {
      const returns = generateAssetReturns(asset);
      this.returns[asset.symbol] = returns;

      const mean = calculateMean(returns);
      this.meanReturns[asset.symbol] = mean;

      const stdDev = calculateStdDev(returns, mean);
      this.stdDevs[asset.symbol] = stdDev;
    });

    this.calculateCorrelations();
  }

  private calculateCorrelations() {
    const n = this.assets.length;
    const symbols = this.assets.map((a) => a.symbol);

    this.correlationMatrix = Array(n)
      .fill(0)
      .map(() => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (i === j) {
          this.correlationMatrix[i][j] = 1;
        } else {
          const returns1 = this.returns[symbols[i]];
          const returns2 = this.returns[symbols[j]];
          const mean1 = this.meanReturns[symbols[i]];
          const mean2 = this.meanReturns[symbols[j]];
          const std1 = this.stdDevs[symbols[i]];
          const std2 = this.stdDevs[symbols[j]];

          let covariance = 0;
          for (let k = 0; k < returns1.length; k++) {
            covariance += (returns1[k] - mean1) * (returns2[k] - mean2);
          }
          covariance /= returns1.length;

          this.correlationMatrix[i][j] = covariance / (std1 * std2);
        }
      }
    }
  }

  private calculatePortfolioMetrics(weights: number[]): { expectedReturn: number; variance: number } {
    let expectedReturn = 0;
    let variance = 0;

    const symbols = this.assets.map((a) => a.symbol);

    // Expected return
    weights.forEach((w, i) => {
      expectedReturn += w * this.meanReturns[symbols[i]];
    });

    // Variance
    for (let i = 0; i < weights.length; i++) {
      for (let j = 0; j < weights.length; j++) {
        variance += weights[i] * weights[j] * this.correlationMatrix[i][j] * this.stdDevs[symbols[i]] * this.stdDevs[symbols[j]];
      }
    }

    return { expectedReturn, variance };
  }

  private randomWeights(): number[] {
    const weights = this.assets.map(() => Math.random());
    const sum = weights.reduce((a, b) => a + b, 0);
    return weights.map((w) => w / sum);
  }

  optimizeForMaxSharpe(): OptimizationResult {
    let bestWeights = this.randomWeights();
    let bestSharpeRatio = -Infinity;

    // Monte Carlo optimization
    const iterations = 10000;
    for (let i = 0; i < iterations; i++) {
      const weights = this.randomWeights();
      const { expectedReturn, variance } = this.calculatePortfolioMetrics(weights);
      const volatility = Math.sqrt(variance);
      const sharpeRatio = (expectedReturn - this.riskFreeRate) / (volatility || 0.001);

      if (sharpeRatio > bestSharpeRatio) {
        bestSharpeRatio = sharpeRatio;
        bestWeights = weights;
      }
    }

    const { expectedReturn, variance } = this.calculatePortfolioMetrics(bestWeights);
    const volatility = Math.sqrt(variance);

    const weightMap: Record<string, number> = {};
    this.assets.forEach((asset, i) => {
      weightMap[asset.symbol] = parseFloat((bestWeights[i] * 100).toFixed(2));
    });

    return {
      weights: weightMap,
      expectedReturn: expectedReturn * 252, // Annualize
      volatility: volatility * Math.sqrt(252),
      sharpeRatio: (expectedReturn * 252 - this.riskFreeRate) / (volatility * Math.sqrt(252) || 0.001),
    };
  }

  optimizeForMinVolatility(): OptimizationResult {
    let bestWeights = this.randomWeights();
    let bestVolatility = Infinity;

    const iterations = 10000;
    for (let i = 0; i < iterations; i++) {
      const weights = this.randomWeights();
      const { expectedReturn, variance } = this.calculatePortfolioMetrics(weights);
      const volatility = Math.sqrt(variance);

      if (volatility < bestVolatility) {
        bestVolatility = volatility;
        bestWeights = weights;
      }
    }

    const { expectedReturn, variance } = this.calculatePortfolioMetrics(bestWeights);
    const volatility = Math.sqrt(variance);

    const weightMap: Record<string, number> = {};
    this.assets.forEach((asset, i) => {
      weightMap[asset.symbol] = parseFloat((bestWeights[i] * 100).toFixed(2));
    });

    return {
      weights: weightMap,
      expectedReturn: expectedReturn * 252,
      volatility: volatility * Math.sqrt(252),
      sharpeRatio: (expectedReturn * 252 - this.riskFreeRate) / (volatility * Math.sqrt(252) || 0.001),
    };
  }

  generateEfficientFrontier(points: number = 50): EfficientFrontierPoint[] {
    const frontier: EfficientFrontierPoint[] = [];

    for (let targetReturn = this.riskFreeRate; targetReturn < 0.3; targetReturn += 0.3 / points) {
      let bestWeights = this.randomWeights();
      let bestVolatility = Infinity;

      const iterations = 2000;
      for (let i = 0; i < iterations; i++) {
        const weights = this.randomWeights();
        const { expectedReturn, variance } = this.calculatePortfolioMetrics(weights);

        const annualizedReturn = expectedReturn * 252;
        if (Math.abs(annualizedReturn - targetReturn) < 0.01) {
          const volatility = Math.sqrt(variance);
          if (volatility < bestVolatility) {
            bestVolatility = volatility;
            bestWeights = weights;
          }
        }
      }

      const { expectedReturn, variance } = this.calculatePortfolioMetrics(bestWeights);
      const volatility = Math.sqrt(variance);

      const weightMap: Record<string, number> = {};
      this.assets.forEach((asset, i) => {
        weightMap[asset.symbol] = parseFloat((bestWeights[i] * 100).toFixed(2));
      });

      frontier.push({
        volatility: volatility * Math.sqrt(252),
        expectedReturn: expectedReturn * 252,
        weights: weightMap,
        sharpeRatio: (expectedReturn * 252 - this.riskFreeRate) / (volatility * Math.sqrt(252) || 0.001),
      });
    }

    return frontier.sort((a, b) => a.volatility - b.volatility);
  }

  getCurrentWeights(): Record<string, number> {
    const totalValue = this.assets.reduce((sum, asset) => sum + asset.quantity * asset.currentPrice, 0);
    const weights: Record<string, number> = {};

    this.assets.forEach((asset) => {
      const value = asset.quantity * asset.currentPrice;
      weights[asset.symbol] = parseFloat(((value / totalValue) * 100).toFixed(2));
    });

    return weights;
  }

  analyzeCurrentPortfolio(): OptimizationResult {
    const currentWeights = this.getCurrentWeights();
    const weights = this.assets.map((a) => (currentWeights[a.symbol] || 0) / 100);
    const { expectedReturn, variance } = this.calculatePortfolioMetrics(weights);
    const volatility = Math.sqrt(variance);

    return {
      weights: currentWeights,
      expectedReturn: expectedReturn * 252,
      volatility: volatility * Math.sqrt(252),
      sharpeRatio: (expectedReturn * 252 - this.riskFreeRate) / (volatility * Math.sqrt(252) || 0.001),
    };
  }
}
