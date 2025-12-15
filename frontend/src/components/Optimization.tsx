import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { OptimizationResult } from '../services/api';

interface ComparisonData {
  name: string;
  expectedReturn: number;
  volatility: number;
  sharpeRatio: number;
}

interface PortfolioComparisonProps {
  current: OptimizationResult | null;
  maxSharpe: OptimizationResult | null;
  minVolatility: OptimizationResult | null;
}

export const PortfolioComparison: React.FC<PortfolioComparisonProps> = ({ current, maxSharpe, minVolatility }) => {
  const data: ComparisonData[] = [];

  if (current) {
    data.push({
      name: 'Current',
      expectedReturn: current.expectedReturn * 100,
      volatility: current.volatility * 100,
      sharpeRatio: current.sharpeRatio,
    });
  }

  if (maxSharpe) {
    data.push({
      name: 'Max Sharpe',
      expectedReturn: maxSharpe.expectedReturn * 100,
      volatility: maxSharpe.volatility * 100,
      sharpeRatio: maxSharpe.sharpeRatio,
    });
  }

  if (minVolatility) {
    data.push({
      name: 'Min Volatility',
      expectedReturn: minVolatility.expectedReturn * 100,
      volatility: minVolatility.volatility * 100,
      sharpeRatio: minVolatility.sharpeRatio,
    });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Return vs Volatility Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" label={{ value: 'Return %', angle: -90, position: 'insideLeft' }} />
            <YAxis yAxisId="right" orientation="right" label={{ value: 'Volatility %', angle: 90, position: 'insideRight' }} />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="expectedReturn" fill="#3b82f6" name="Expected Return %" />
            <Bar yAxisId="right" dataKey="volatility" fill="#ef4444" name="Volatility %" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Sharpe Ratio Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Sharpe Ratio', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="sharpeRatio" fill="#10b981" name="Sharpe Ratio" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

interface OptimizationWeightsProps {
  title: string;
  weights: Record<string, number>;
}

export const OptimizationWeights: React.FC<OptimizationWeightsProps> = ({ title, weights }) => {
  const data = Object.entries(weights)
    .map(([symbol, weight]) => ({
      symbol,
      weight,
    }))
    .sort((a, b) => b.weight - a.weight);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-slate-900 mb-4">{title}</h3>
      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.symbol} className="flex items-center justify-between">
            <span className="font-medium text-slate-700">{item.symbol}</span>
            <div className="flex items-center gap-3 flex-1 ml-4">
              <div className="flex-1 bg-slate-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${Math.min(item.weight, 100)}%` }}
                ></div>
              </div>
              <span className="text-right font-semibold text-slate-900 min-w-12">{item.weight.toFixed(1)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
