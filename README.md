# Financial Optimizer

Advanced portfolio optimization software using Modern Portfolio Theory, Monte Carlo simulation, and machine learning-inspired recommendations. This full-stack application helps investors optimize their investment portfolios and make data-driven financial decisions.

## 🎯 Features

### Core Portfolio Management

- **Portfolio Overview**: Track all your investments with real-time performance metrics
- **Asset Allocation**: Visualize your portfolio composition by sector and individual assets
- **Performance Tracking**: Monitor daily, monthly, and yearly returns

### Advanced Optimization

- **Efficient Frontier Analysis**: Visualize the optimal risk-return trade-off for your portfolio
- **Maximum Sharpe Ratio Optimization**: Find the best risk-adjusted returns
- **Minimum Volatility Optimization**: Create the most conservative portfolio allocation
- **Monte Carlo Simulation**: Generate 10,000+ scenarios to optimize weights

### Intelligent Recommendations

- **Diversification Alerts**: Identify over-concentrated positions
- **Rebalancing Suggestions**: Get notified when to rebalance your portfolio
- **Risk Assessment**: Understand your portfolio risk level
- **Opportunity Analysis**: Discover potential improvements

### Data & Visualization

- **Interactive Charts**: Beautiful Recharts visualizations for better insights
- **Comparative Analysis**: Compare current vs. optimized portfolios
- **Holdings Table**: Detailed breakdown of all assets with gain/loss tracking
- **Sector Analysis**: Understand allocation across market sectors

## 🛠️ Tech Stack

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - REST API framework
- **TypeScript** - Type-safe development
- **SQLite** - Local database (no external dependencies)
- **Node-Cache** - In-memory caching for mock data

### Frontend

- **React 18** - UI library
- **TypeScript** - Type-safe React components
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Interactive data visualization
- **Lucide React** - Beautiful icons

### Algorithms & Analysis

- **Modern Portfolio Theory** - Optimal asset allocation
- **Monte Carlo Simulation** - Risk scenario analysis
- **Sharpe Ratio Calculation** - Risk-adjusted returns
- **Correlation Analysis** - Asset relationship modeling

## 📋 System Requirements

- Node.js 16+
- npm or yarn
- 4GB RAM
- Windows/macOS/Linux

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Financial-Optimizer
```

### 2. Backend Setup

```bash
cd backend
npm install

# Start the backend server
npm run dev
```

The backend will start on `http://localhost:5000`

API endpoints available:

- `GET /api/health` - Health check
- `GET /api/portfolio/mock-portfolio` - Get demo portfolio
- `GET /api/portfolio/stocks` - Get all stocks
- `POST /api/portfolio/optimize/max-sharpe` - Optimize for max Sharpe
- `POST /api/portfolio/optimize/min-volatility` - Optimize for min volatility
- `POST /api/portfolio/efficient-frontier` - Generate efficient frontier
- `POST /api/portfolio/analyze` - Analyze current portfolio

### 3. Frontend Setup

In a new terminal:

```bash
cd frontend
npm install

# Start the development server
npm run dev
```

The frontend will start on `http://localhost:3000`

Open [http://localhost:3000](http://localhost:3000) in your browser to access the application.

## 📊 Dashboard Features

### Overview Tab

- Portfolio header with key metrics
- Asset allocation pie charts
- Holdings table with gain/loss tracking

### Optimization Tab

- Efficient frontier visualization
- Portfolio comparison (Current vs. Optimized)
- Asset allocation weights for different strategies

### Analysis Tab

- Smart recommendations
- Detailed portfolio metrics
- Risk-adjusted performance comparison

## 🎓 Understanding the Metrics

### Sharpe Ratio

Risk-adjusted return metric. Higher is better. Calculated as: (Return - Risk-Free Rate) / Volatility

### Volatility

Standard deviation of portfolio returns, expressed as percentage. Measures risk level.

### Efficient Frontier

The curve of optimal portfolios offering the highest expected return for each risk level.

### Expected Return

Annualized expected return based on historical correlation and volatility of assets.

## 💾 Data & Caching

The application uses:

- **Mock Data**: Initial portfolio data stored in Node-Cache for demo purposes
- **SQLite Database**: Local database file (`portfolio.db`) for persistent storage
- **In-Memory Cache**: Fast access to frequently used data

All data is stored locally - no external APIs or cloud services required.

## 🔄 Database Schema

### Portfolios Table

- id (Primary Key)
- name
- description
- totalValue
- createdAt / updatedAt

### Assets Table

- id (Primary Key)
- portfolioId (Foreign Key)
- symbol
- name
- quantity
- purchasePrice
- currentPrice
- sector
- allocation

### Performance History

- Tracks historical portfolio performance
- Enables performance analysis over time

### Recommendations

- Generated recommendations for portfolio improvement
- Stored with priority levels and creation dates

## 📈 Example Mock Data

The application comes with a pre-loaded portfolio containing:

- **AAPL** - Apple Inc. (Technology)
- **MSFT** - Microsoft (Technology)
- **GOOGL** - Alphabet Inc. (Technology)
- **AMZN** - Amazon (Consumer)
- **NVDA** - NVIDIA (Technology)
- **JNJ** - Johnson & Johnson (Healthcare)
- **V** - Visa (Financial Services)
- **WMT** - Walmart (Consumer Staples)

## 🔧 Configuration

### Backend Environment

Create a `.env` file in the backend directory:

```
PORT=5000
NODE_ENV=development
```

### Frontend Environment

Create a `.env` file in the frontend directory:

```
VITE_API_URL=http://localhost:5000/api
```

## 📦 Building for Production

### Backend

```bash
cd backend
npm run build
npm start
```

### Frontend

```bash
cd frontend
npm run build
```

The build output will be in `frontend/dist/`

## 🧪 API Testing

Use tools like Postman or curl to test the API:

```bash
# Get mock portfolio
curl http://localhost:5000/api/portfolio/mock-portfolio

# Optimize for max Sharpe ratio
curl -X POST http://localhost:5000/api/portfolio/optimize/max-sharpe

# Get efficient frontier
curl -X POST http://localhost:5000/api/portfolio/efficient-frontier
```

## 🎨 UI/UX Highlights

- **Modern Design**: Gradient backgrounds and smooth transitions
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Interactive Charts**: Hover effects and tooltips
- **Color-coded Data**: Risk levels shown with color indicators
- **Accessibility**: Semantic HTML and keyboard navigation
- **Performance**: Fast load times with optimized rendering

## 🚀 Performance Optimizations

- React component memoization
- Recharts with optimized rendering
- Backend response caching
- SQLite indexed queries
- Vite lazy loading

## 🔐 Security Notes

- All calculations done locally (no data sent to external services)
- SQLite database is local-only
- CORS enabled for local development
- TypeScript provides type safety

## 📚 References & Resources

- Modern Portfolio Theory: https://en.wikipedia.org/wiki/Modern_portfolio_theory
- Sharpe Ratio: https://en.wikipedia.org/wiki/Sharpe_ratio
- Monte Carlo Simulation: https://en.wikipedia.org/wiki/Monte_Carlo_method
- React Documentation: https://react.dev
- Express.js Guide: https://expressjs.com
- Recharts Documentation: https://recharts.org

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🎓 Educational Purpose

This project is designed to demonstrate:

- Full-stack development with modern tools
- Financial algorithms and portfolio optimization
- Data visualization best practices
- TypeScript in production
- React component architecture
- RESTful API design
- Database design patterns

## ⚠️ Disclaimer

This software is for educational and informational purposes only. It should not be used as the sole basis for investment decisions. Always consult with a qualified financial advisor before making investment decisions.

## 📞 Support

For questions or issues, please create an issue in the repository or contact the development team.

---

**Built with ❤️ using React, Node.js, and Modern Portfolio Theory**
