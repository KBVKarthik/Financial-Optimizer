import React from 'react';
import { TrendingUp, TrendingDown, Wallet, PieChart, BarChart3, Target } from 'lucide-react';
import { Portfolio } from '../services/api';

interface PortfolioHeaderProps {
  portfolio: Portfolio | null;
  loading: boolean;
}

export const PortfolioHeader: React.FC<PortfolioHeaderProps> = ({ portfolio, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 rounded w-1/3"></div>
          <div className="h-12 bg-slate-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return null;
  }

  const dayChangePercent = portfolio.performance.dayChangePercent;
  const isPositive = dayChangePercent >= 0;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-lg p-8 mb-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">{portfolio.name}</h1>
          <p className="text-blue-100 mb-6">{portfolio.description}</p>

          <div className="flex items-end gap-4">
            <div>
              <p className="text-blue-100 text-sm">Portfolio Value</p>
              <p className="text-5xl font-bold">${portfolio.totalValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
            </div>

            <div className={`flex items-center gap-2 text-2xl font-semibold ${isPositive ? 'text-green-300' : 'text-red-300'}`}>
              {isPositive ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />}
              {isPositive ? '+' : ''}
              {portfolio.performance.dayChange.toFixed(2)} ({dayChangePercent.toFixed(2)}%)
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-3">
            <p className="text-blue-100 text-sm">1 Month Return</p>
            <p className="text-2xl font-bold">{portfolio.performance.oneMonthReturn.toFixed(2)}%</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <p className="text-blue-100 text-sm">1 Year Return</p>
            <p className="text-2xl font-bold">{portfolio.performance.oneYearReturn.toFixed(2)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface PortfolioStatsProps {
  portfolio: Portfolio | null;
}

export const PortfolioStats: React.FC<PortfolioStatsProps> = ({ portfolio }) => {
  if (!portfolio) return null;

  const stats = [
    {
      label: 'Total Assets',
      value: portfolio.assets.length,
      icon: Wallet,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Sectors',
      value: Object.keys(portfolio.allocation).length,
      icon: PieChart,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      label: '3 Month Return',
      value: `${portfolio.performance.threeMonthReturn.toFixed(2)}%`,
      icon: BarChart3,
      color: 'bg-green-100 text-green-600',
    },
    {
      label: 'Average Price',
      value: `$${(portfolio.totalValue / portfolio.assets.length).toLocaleString('en-US', { maximumFractionDigits: 2 })}`,
      icon: Target,
      color: 'bg-orange-100 text-orange-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
