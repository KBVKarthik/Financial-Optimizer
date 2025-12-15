import React, { useEffect, useState } from 'react';
import { PortfolioHeader, PortfolioStats } from './components/Header';
import { PortfolioComposition } from './components/AllocationChart';
import { EfficientFrontierChart } from './components/EfficientFrontier';
import { PortfolioComparison, OptimizationWeights } from './components/Optimization';
import { Recommendations } from './components/Recommendations';
import { AssetTable } from './components/AssetTable';
import { portfolioAPI, Portfolio, OptimizationResult, EfficientFrontierPoint } from './services/api';
import { Activity } from 'lucide-react';

function App() {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [currentAnalysis, setCurrentAnalysis] = useState<OptimizationResult | null>(null);
  const [maxSharpeOptimization, setMaxSharpeOptimization] = useState<OptimizationResult | null>(null);
  const [minVolatilityOptimization, setMinVolatilityOptimization] = useState<OptimizationResult | null>(null);
  const [efficientFrontier, setEfficientFrontier] = useState<EfficientFrontierPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'optimization' | 'analysis'>('overview');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Load portfolio
        const portfolioData = await portfolioAPI.getMockPortfolio();
        setPortfolio(portfolioData);

        // Load analyses in parallel
        const [current, maxSharpe, minVol, frontier] = await Promise.all([
          portfolioAPI.analyzePortfolio(),
          portfolioAPI.optimizeMaxSharpe(),
          portfolioAPI.optimizeMinVolatility(),
          portfolioAPI.getEfficientFrontier(),
        ]);

        setCurrentAnalysis(current);
        setMaxSharpeOptimization(maxSharpe);
        setMinVolatilityOptimization(minVol);
        setEfficientFrontier(frontier);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-8 h-8" />
            <h1 className="text-4xl font-bold">Financial Optimizer</h1>
          </div>
          <p className="text-blue-100">Advanced Portfolio Analysis & Optimization</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Portfolio Header */}
        <PortfolioHeader portfolio={portfolio} loading={loading} />

        {/* Stats */}
        <PortfolioStats portfolio={portfolio} />

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-6 bg-white rounded-lg shadow p-1 w-fit">
          {(['overview', 'optimization', 'analysis'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Asset Composition */}
              <PortfolioComposition portfolio={portfolio} />

              {/* Holdings Table */}
              <AssetTable portfolio={portfolio} />
            </div>
          )}

          {activeTab === 'optimization' && (
            <div className="space-y-6">
              {/* Efficient Frontier */}
              <EfficientFrontierChart data={efficientFrontier} currentPortfolio={currentAnalysis} />

              {/* Portfolio Comparison */}
              <PortfolioComparison current={currentAnalysis} maxSharpe={maxSharpeOptimization} minVolatility={minVolatilityOptimization} />

              {/* Optimization Weights */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {currentAnalysis && (
                  <OptimizationWeights
                    title="Current Portfolio Weights"
                    weights={currentAnalysis.weights}
                  />
                )}
                {maxSharpeOptimization && (
                  <OptimizationWeights
                    title="Max Sharpe Ratio Weights"
                    weights={maxSharpeOptimization.weights}
                  />
                )}
              </div>

              {minVolatilityOptimization && (
                <OptimizationWeights
                  title="Min Volatility Weights"
                  weights={minVolatilityOptimization.weights}
                />
              )}
            </div>
          )}

          {activeTab === 'analysis' && (
            <div className="space-y-6">
              {/* Recommendations */}
              <Recommendations
                current={currentAnalysis}
                maxSharpe={maxSharpeOptimization}
                minVolatility={minVolatilityOptimization}
              />

              {/* Analysis Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Current Portfolio Metrics</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-600">Expected Annual Return</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {(currentAnalysis?.expectedReturn ? currentAnalysis.expectedReturn * 100 : 0).toFixed(2)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Volatility (Risk)</p>
                      <p className="text-2xl font-bold text-orange-600">
                        {(currentAnalysis?.volatility ? currentAnalysis.volatility * 100 : 0).toFixed(2)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Sharpe Ratio</p>
                      <p className="text-2xl font-bold text-green-600">{currentAnalysis?.sharpeRatio.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Max Sharpe Metrics</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-600">Expected Annual Return</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {(maxSharpeOptimization?.expectedReturn ? maxSharpeOptimization.expectedReturn * 100 : 0).toFixed(2)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Volatility (Risk)</p>
                      <p className="text-2xl font-bold text-orange-600">
                        {(maxSharpeOptimization?.volatility ? maxSharpeOptimization.volatility * 100 : 0).toFixed(2)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Sharpe Ratio</p>
                      <p className="text-2xl font-bold text-green-600">{maxSharpeOptimization?.sharpeRatio.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Min Volatility Metrics</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-600">Expected Annual Return</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {(minVolatilityOptimization?.expectedReturn ? minVolatilityOptimization.expectedReturn * 100 : 0).toFixed(2)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Volatility (Risk)</p>
                      <p className="text-2xl font-bold text-orange-600">
                        {(minVolatilityOptimization?.volatility ? minVolatilityOptimization.volatility * 100 : 0).toFixed(2)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Sharpe Ratio</p>
                      <p className="text-2xl font-bold text-green-600">{minVolatilityOptimization?.sharpeRatio.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-900 text-slate-400 py-8 px-4 sm:px-6 lg:px-8 mt-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4">About</h4>
              <p className="text-sm">
                Advanced portfolio optimization using Modern Portfolio Theory and Monte Carlo simulation.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Features</h4>
              <ul className="text-sm space-y-2">
                <li>• Efficient Frontier Analysis</li>
                <li>• Risk-Return Optimization</li>
                <li>• Portfolio Recommendations</li>
                <li>• Asset Allocation Visualization</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Technology</h4>
              <ul className="text-sm space-y-2">
                <li>• React + TypeScript</li>
                <li>• Node.js + Express</li>
                <li>• SQLite Database</li>
                <li>• Recharts Visualization</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex justify-between items-center">
            <p className="text-sm">© 2025 Financial Optimizer. All rights reserved.</p>
            <p className="text-sm">Built with React, TypeScript, and Modern Portfolio Theory</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
