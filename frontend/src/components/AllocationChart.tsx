import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface AllocationData {
  name: string;
  value: number;
}

interface AssetAllocationChartProps {
  data: AllocationData[];
}

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#6366f1', '#ef4444'];

export const AssetAllocationChart: React.FC<AssetAllocationChartProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-slate-900 mb-6">Asset Allocation by Sector</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${(value as number).toFixed(2)}%`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

interface PortfolioCompositionProps {
  portfolio: any;
}

export const PortfolioComposition: React.FC<PortfolioCompositionProps> = ({ portfolio }) => {
  if (!portfolio) return null;

  const allocationData = Object.entries(portfolio.allocation)
    .map(([sector, percentage]) => ({
      name: sector,
      value: percentage as number,
    }))
    .sort((a, b) => b.value - a.value);

  const assetData = portfolio.assets
    .map((asset: any) => ({
      name: asset.symbol,
      value: asset.allocation,
    }))
    .sort((a: any, b: any) => b.value - a.value);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <AssetAllocationChart data={allocationData} />
      <AssetAllocationChart data={assetData} />
    </div>
  );
};
