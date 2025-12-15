import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { EfficientFrontierPoint } from '../services/api';

interface EfficientFrontierChartProps {
  data: EfficientFrontierPoint[];
  currentPortfolio: any;
}

export const EfficientFrontierChart: React.FC<EfficientFrontierChartProps> = ({ data, currentPortfolio }) => {
  const chartData = data.map((point) => ({
    volatility: parseFloat((point.volatility * 100).toFixed(2)),
    expectedReturn: parseFloat((point.expectedReturn * 100).toFixed(2)),
    sharpeRatio: parseFloat(point.sharpeRatio.toFixed(2)),
  }));

  const currentData = {
    volatility: parseFloat((currentPortfolio?.volatility * 100).toFixed(2)) || 0,
    expectedReturn: parseFloat((currentPortfolio?.expectedReturn * 100).toFixed(2)) || 0,
    label: 'Current Portfolio',
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-bold text-slate-900 mb-6">Efficient Frontier</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="volatility"
            label={{ value: 'Volatility (Risk) %', position: 'insideBottomRight', offset: -5 }}
            type="number"
          />
          <YAxis label={{ value: 'Expected Return %', angle: -90, position: 'insideLeft' }} />
          <Tooltip
            formatter={(value) => {
              if (typeof value === 'number') {
                return value.toFixed(2);
              }
              return value;
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="expectedReturn"
            stroke="#3b82f6"
            name="Efficient Frontier"
            dot={false}
            strokeWidth={2}
          />
          {currentData.volatility > 0 && (
            <Line
              type="monotone"
              data={[currentData]}
              dataKey="expectedReturn"
              stroke="#10b981"
              name="Current Portfolio"
              dot={{ fill: '#10b981', r: 8 }}
              strokeWidth={0}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-slate-600">
          The efficient frontier shows the optimal risk-return trade-off. Points above the frontier offer better returns for the same risk level.
        </p>
      </div>
    </div>
  );
};
