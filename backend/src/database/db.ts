import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(__dirname, '../../portfolio.db');
const db: Database.Database = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

export function initDatabase() {
  // Create portfolios table
  db.exec(`
    CREATE TABLE IF NOT EXISTS portfolios (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      totalValue REAL NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    )
  `);

  // Create assets table
  db.exec(`
    CREATE TABLE IF NOT EXISTS assets (
      id TEXT PRIMARY KEY,
      portfolioId TEXT NOT NULL,
      symbol TEXT NOT NULL,
      name TEXT NOT NULL,
      quantity REAL NOT NULL,
      purchasePrice REAL NOT NULL,
      currentPrice REAL NOT NULL,
      sector TEXT,
      allocation REAL,
      createdAt TEXT NOT NULL,
      FOREIGN KEY(portfolioId) REFERENCES portfolios(id) ON DELETE CASCADE,
      UNIQUE(portfolioId, symbol)
    )
  `);

  // Create performance history table
  db.exec(`
    CREATE TABLE IF NOT EXISTS performanceHistory (
      id TEXT PRIMARY KEY,
      portfolioId TEXT NOT NULL,
      date TEXT NOT NULL,
      totalValue REAL NOT NULL,
      dailyReturn REAL,
      cumulativeReturn REAL,
      FOREIGN KEY(portfolioId) REFERENCES portfolios(id) ON DELETE CASCADE
    )
  `);

  // Create recommendations table
  db.exec(`
    CREATE TABLE IF NOT EXISTS recommendations (
      id TEXT PRIMARY KEY,
      portfolioId TEXT NOT NULL,
      type TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      priority TEXT DEFAULT 'medium',
      createdAt TEXT NOT NULL,
      FOREIGN KEY(portfolioId) REFERENCES portfolios(id) ON DELETE CASCADE
    )
  `);
}

export default db;
