import React from 'react';
import { Portfolio } from '../services/api';
import { TrendingUp } from 'lucide-react';

interface AssetTableProps {
  portfolio: Portfolio | null;
}

export const AssetTable: React.FC<AssetTableProps> = ({ portfolio }) => {
  if (!portfolio) return null;

  const sortedAssets = [...portfolio.assets].sort((a, b) => b.allocation - a.allocation);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
      <div className="p-6 border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-900">Portfolio Holdings</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Symbol</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Company</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-slate-700">Quantity</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-slate-700">Purchase Price</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-slate-700">Current Price</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-slate-700">Value</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-slate-700">Gain/Loss</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-slate-700">Allocation</th>
            </tr>
          </thead>
          <tbody>
            {sortedAssets.map((asset) => {
              const totalValue = asset.quantity * asset.currentPrice;
              const totalCost = asset.quantity * asset.purchasePrice;
              const gainLoss = totalValue - totalCost;
              const gainLossPercent = (gainLoss / totalCost) * 100;
              const isPositive = gainLoss >= 0;

              return (
                <tr key={asset.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-6 py-4 font-semibold text-slate-900">{asset.symbol}</td>
                  <td className="px-6 py-4 text-slate-600 text-sm">{asset.name}</td>
                  <td className="px-6 py-4 text-right text-slate-900">{asset.quantity}</td>
                  <td className="px-6 py-4 text-right text-slate-600">${asset.purchasePrice.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right text-slate-900 font-semibold">${asset.currentPrice.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right text-slate-900 font-semibold">${totalValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
                  <td className={`px-6 py-4 text-right font-semibold flex items-center justify-end gap-2 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive && <TrendingUp className="w-4 h-4" />}
                    ${gainLoss.toLocaleString('en-US', { maximumFractionDigits: 2 })} ({gainLossPercent.toFixed(2)}%)
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${Math.min(asset.allocation, 100)}%` }}
                        ></div>
                      </div>
                      <span className="font-semibold text-slate-900 min-w-10">{asset.allocation.toFixed(1)}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-slate-700">Total Cost Basis:</span>
          <span className="font-bold text-slate-900">
            $
            {sortedAssets
              .reduce((sum, asset) => sum + asset.quantity * asset.purchasePrice, 0)
              .toLocaleString('en-US', { maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  );
};
