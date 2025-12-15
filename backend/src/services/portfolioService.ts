import { randomUUID } from 'crypto';
import db from '../database/db';
import { Asset, Portfolio } from '../utils/mockData';

export class PortfolioService {
  static createPortfolio(name: string, description: string, assets: Asset[]): Portfolio {
    const id = randomUUID();
    const now = new Date().toISOString();

    const totalValue = assets.reduce((sum, asset) => sum + asset.quantity * asset.currentPrice, 0);
    const allocation: Record<string, number> = {};

    assets.forEach((asset) => {
      const value = asset.quantity * asset.currentPrice;
      const percent = (value / totalValue) * 100;
      allocation[asset.sector] = (allocation[asset.sector] || 0) + percent;
    });

    try {
      const stmt = db.prepare(
        'INSERT INTO portfolios (id, name, description, totalValue, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)'
      );
      stmt.run(id, name, description, totalValue, now, now);

      assets.forEach((asset) => {
        const assetId = randomUUID();
        const assetStmt = db.prepare(
          'INSERT INTO assets (id, portfolioId, symbol, name, quantity, purchasePrice, currentPrice, sector, allocation, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        );
        const assetAllocation = ((asset.quantity * asset.currentPrice) / totalValue) * 100;
        assetStmt.run(assetId, id, asset.symbol, asset.name, asset.quantity, asset.purchasePrice, asset.currentPrice, asset.sector, assetAllocation, now);
      });
    } catch (error) {
      console.error('Database error creating portfolio:', error);
    }

    return {
      id,
      name,
      description,
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

  static getPortfolio(id: string): Portfolio | null {
    try {
      const portfolioStmt = db.prepare('SELECT * FROM portfolios WHERE id = ?');
      const portfolioData = portfolioStmt.get(id) as any;

      if (!portfolioData) return null;

      const assetsStmt = db.prepare('SELECT * FROM assets WHERE portfolioId = ?');
      const assetsData = assetsStmt.all(id) as any[];

      const assets = assetsData.map((asset) => ({
        id: asset.id,
        symbol: asset.symbol,
        name: asset.name,
        quantity: asset.quantity,
        purchasePrice: asset.purchasePrice,
        currentPrice: asset.currentPrice,
        sector: asset.sector,
        allocation: asset.allocation,
      }));

      const allocation: Record<string, number> = {};
      assets.forEach((asset) => {
        allocation[asset.sector] = (allocation[asset.sector] || 0) + asset.allocation;
      });

      return {
        id: portfolioData.id,
        name: portfolioData.name,
        description: portfolioData.description,
        totalValue: portfolioData.totalValue,
        assets,
        allocation,
        performance: {
          dayChange: portfolioData.totalValue * 0.02,
          dayChangePercent: 0.87,
          oneMonthReturn: 3.45,
          threeMonthReturn: 8.92,
          oneYearReturn: 24.56,
        },
      };
    } catch (error) {
      console.error('Database error retrieving portfolio:', error);
      return null;
    }
  }

  static getAllPortfolios(): Portfolio[] {
    try {
      const portfoliosStmt = db.prepare('SELECT * FROM portfolios');
      const portfoliosData = portfoliosStmt.all() as any[];

      return portfoliosData.map((portfolio) => {
        const assetsStmt = db.prepare('SELECT * FROM assets WHERE portfolioId = ?');
        const assetsData = assetsStmt.all(portfolio.id) as any[];

        const assets = assetsData.map((asset) => ({
          id: asset.id,
          symbol: asset.symbol,
          name: asset.name,
          quantity: asset.quantity,
          purchasePrice: asset.purchasePrice,
          currentPrice: asset.currentPrice,
          sector: asset.sector,
          allocation: asset.allocation,
        }));

        const allocation: Record<string, number> = {};
        assets.forEach((asset) => {
          allocation[asset.sector] = (allocation[asset.sector] || 0) + asset.allocation;
        });

        return {
          id: portfolio.id,
          name: portfolio.name,
          description: portfolio.description,
          totalValue: portfolio.totalValue,
          assets,
          allocation,
          performance: {
            dayChange: portfolio.totalValue * 0.02,
            dayChangePercent: 0.87,
            oneMonthReturn: 3.45,
            threeMonthReturn: 8.92,
            oneYearReturn: 24.56,
          },
        };
      });
    } catch (error) {
      console.error('Database error retrieving portfolios:', error);
      return [];
    }
  }

  static deletePortfolio(id: string): boolean {
    try {
      const stmt = db.prepare('DELETE FROM portfolios WHERE id = ?');
      stmt.run(id);
      return true;
    } catch (error) {
      console.error('Database error deleting portfolio:', error);
      return false;
    }
  }

  static updateAssetPrice(portfolioId: string, symbol: string, newPrice: number): boolean {
    try {
      const now = new Date().toISOString();
      const stmt = db.prepare('UPDATE assets SET currentPrice = ? WHERE portfolioId = ? AND symbol = ?');
      stmt.run(newPrice, portfolioId, symbol);

      // Recalculate portfolio value
      const assetsStmt = db.prepare('SELECT SUM(quantity * ?) as totalValue FROM assets WHERE portfolioId = ?');
      const result = assetsStmt.get(newPrice, portfolioId) as any;

      if (result) {
        const updateStmt = db.prepare('UPDATE portfolios SET totalValue = ?, updatedAt = ? WHERE id = ?');
        updateStmt.run(result.totalValue || 0, now, portfolioId);
      }

      return true;
    } catch (error) {
      console.error('Database error updating asset price:', error);
      return false;
    }
  }

  static addRecommendation(portfolioId: string, type: string, title: string, description: string, priority: string): void {
    try {
      const id = randomUUID();
      const now = new Date().toISOString();
      const stmt = db.prepare(
        'INSERT INTO recommendations (id, portfolioId, type, title, description, priority, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)'
      );
      stmt.run(id, portfolioId, type, title, description, priority, now);
    } catch (error) {
      console.error('Database error adding recommendation:', error);
    }
  }

  static getRecommendations(portfolioId: string): any[] {
    try {
      const stmt = db.prepare('SELECT * FROM recommendations WHERE portfolioId = ? ORDER BY createdAt DESC');
      return stmt.all(portfolioId) as any[];
    } catch (error) {
      console.error('Database error retrieving recommendations:', error);
      return [];
    }
  }
}
