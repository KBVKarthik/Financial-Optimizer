import React from 'react';
import { AlertCircle, TrendingUp, AlertTriangle, Lightbulb, CheckCircle } from 'lucide-react';

interface Recommendation {
  id: string;
  type: 'diversification' | 'rebalance' | 'risk' | 'opportunity' | 'success';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
}

interface RecommendationsProps {
  maxSharpe: any;
  minVolatility: any;
  current: any;
}

export const Recommendations: React.FC<RecommendationsProps> = ({ maxSharpe, minVolatility, current }) => {
  const recommendations: Recommendation[] = [];

  // Check if portfolio is over-concentrated
  if (current?.weights) {
    const topAssets = Object.entries(current.weights)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, 1);

    if (topAssets[0] && (topAssets[0][1] as number) > 30) {
      recommendations.push({
        id: '1',
        type: 'diversification',
        title: 'Increase Portfolio Diversification',
        description: `Your top holding (${topAssets[0][0]}) represents ${(topAssets[0][1] as number).toFixed(1)}% of your portfolio. Consider diversifying further to reduce concentration risk.`,
        priority: 'high',
      });
    }
  }

  // Suggest rebalancing if current differs significantly from optimal
  if (current && maxSharpe) {
    const differences = Object.entries(current.weights)
      .map(([symbol, weight]) => {
        const optimal = (maxSharpe.weights[symbol] || 0) as number;
        return Math.abs((weight as number) - optimal);
      })
      .reduce((a, b) => a + b, 0) / Object.keys(current.weights).length;

    if (differences > 5) {
      recommendations.push({
        id: '2',
        type: 'rebalance',
        title: 'Portfolio Rebalancing Recommended',
        description: `Your portfolio has drifted ${differences.toFixed(1)}% from optimal weights. Consider rebalancing to realign with your target allocation.`,
        priority: 'medium',
      });
    }
  }

  // Risk assessment
  if (current?.volatility && current.volatility > 0.25) {
    recommendations.push({
      id: '3',
      type: 'risk',
      title: 'High Portfolio Volatility',
      description: `Your portfolio volatility (${(current.volatility * 100).toFixed(2)}%) is higher than typical moderate portfolios. Consider increasing stable assets.`,
      priority: 'medium',
    });
  } else if (current?.volatility && current.volatility < 0.08) {
    recommendations.push({
      id: '4',
      type: 'opportunity',
      title: 'Conservative Portfolio - Growth Opportunity',
      description: `Your portfolio is very conservative. Consider increasing growth assets to potentially boost long-term returns.`,
      priority: 'low',
    });
  }

  // Sharpe ratio improvement
  if (maxSharpe && current) {
    const sharpeImprovement = ((maxSharpe.sharpeRatio - current.sharpeRatio) / current.sharpeRatio) * 100;
    if (sharpeImprovement > 10) {
      recommendations.push({
        id: '5',
        type: 'opportunity',
        title: 'Potential Sharpe Ratio Improvement',
        description: `By adjusting to the max Sharpe portfolio, you could improve your risk-adjusted returns by ${sharpeImprovement.toFixed(1)}%.`,
        priority: 'medium',
      });
    }
  }

  // Success message if well-optimized
  if (recommendations.length === 0) {
    recommendations.push({
      id: '6',
      type: 'success',
      title: 'Well-Optimized Portfolio',
      description: 'Your portfolio appears to be well-balanced. Continue monitoring performance and rebalance annually.',
      priority: 'low',
    });
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'diversification':
      case 'rebalance':
        return <TrendingUp className="w-5 h-5" />;
      case 'risk':
        return <AlertTriangle className="w-5 h-5" />;
      case 'opportunity':
        return <Lightbulb className="w-5 h-5" />;
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getColor = (priority: string, type: string) => {
    if (type === 'success') return 'bg-green-50 border-green-200';
    if (priority === 'high') return 'bg-red-50 border-red-200';
    if (priority === 'medium') return 'bg-yellow-50 border-yellow-200';
    return 'bg-blue-50 border-blue-200';
  };

  const getTextColor = (priority: string, type: string) => {
    if (type === 'success') return 'text-green-700';
    if (priority === 'high') return 'text-red-700';
    if (priority === 'medium') return 'text-yellow-700';
    return 'text-blue-700';
  };

  const getIconColor = (priority: string, type: string) => {
    if (type === 'success') return 'text-green-600';
    if (priority === 'high') return 'text-red-600';
    if (priority === 'medium') return 'text-yellow-600';
    return 'text-blue-600';
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-slate-900 mb-6">Portfolio Recommendations</h2>

      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div key={rec.id} className={`border-l-4 p-4 rounded ${getColor(rec.priority, rec.type)}`}>
            <div className="flex items-start gap-3">
              <div className={getIconColor(rec.priority, rec.type)}>{getIcon(rec.type)}</div>
              <div className="flex-1">
                <h3 className={`font-semibold ${getTextColor(rec.priority, rec.type)}`}>{rec.title}</h3>
                <p className="text-sm text-slate-600 mt-1">{rec.description}</p>
                {rec.priority !== 'low' && (
                  <span className={`inline-block mt-2 px-2 py-1 rounded text-xs font-medium ${getTextColor(rec.priority, rec.type)} ${getColor(rec.priority, rec.type)}`}>
                    {rec.priority.toUpperCase()} PRIORITY
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
