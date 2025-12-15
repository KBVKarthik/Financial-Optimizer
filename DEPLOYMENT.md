# Deployment Guide

## Local Development Setup

### Prerequisites

- Node.js 16+
- npm or yarn
- Windows, macOS, or Linux

### Quick Start (3 steps)

```powershell
# 1. Install all dependencies
npm install --prefix backend && npm install --prefix frontend

# 2. Start backend (Terminal 1)
cd backend && npm run dev

# 3. Start frontend (Terminal 2)
cd frontend && npm run dev

# 4. Open http://localhost:3000
```

---

## Production Build

### Build Backend

```powershell
cd backend
npm run build
```

Output: `backend/dist/`

### Build Frontend

```powershell
cd frontend
npm run build
```

Output: `frontend/dist/`

### Run Production

```powershell
# Backend
cd backend
npm start

# Frontend (requires static server)
# Use: npx serve -s dist -l 3000
```

---

## Docker Deployment

### Dockerfile (Backend)

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy backend
COPY backend/package*.json ./
RUN npm ci

COPY backend/src ./src
COPY backend/tsconfig.json ./

RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
```

### Dockerfile (Frontend)

```dockerfile
FROM node:18-alpine AS build

WORKDIR /app

COPY frontend/package*.json ./
RUN npm ci

COPY frontend ./
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

---

## Environment Variables

### Backend (.env)

```
PORT=5000
NODE_ENV=production
DB_PATH=./portfolio.db
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Financial Optimizer
```

---

## Server Deployment Options

### Option 1: Heroku (Free Tier)

**Backend:**

1. Install Heroku CLI
2. `heroku create your-app-name`
3. Set buildpack: `heroku buildpacks:set heroku/nodejs`
4. `git push heroku main`

**Frontend:**

1. Deploy to Vercel/Netlify with environment variable
2. Point to backend URL

### Option 2: AWS EC2

```bash
# 1. SSH into instance
ssh -i key.pem ubuntu@instance-ip

# 2. Install Node.js
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. Clone and build
git clone your-repo
cd Financial-Optimizer
npm install --prefix backend
npm install --prefix frontend
npm run build --prefix backend
npm run build --prefix frontend

# 4. Use PM2 for process management
npm install -g pm2
pm2 start backend/dist/index.js

# 5. Nginx reverse proxy
sudo apt-get install nginx
# Configure nginx to proxy :5000 and serve frontend
```

### Option 3: DigitalOcean App Platform

1. Connect GitHub repository
2. Create app from repository
3. Configure backend service:
   - Build: `npm install --prefix backend && npm run build --prefix backend`
   - Run: `npm start --prefix backend`
4. Configure frontend service:
   - Build: `npm install --prefix frontend && npm run build --prefix frontend`
   - Run: Static site serving `frontend/dist`

---

## Database Migration

### Backup SQLite

```bash
cp backend/portfolio.db backend/portfolio.db.backup
```

### PostgreSQL Migration (Future)

```sql
-- Create tables in PostgreSQL
CREATE TABLE portfolios (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  totalValue DECIMAL(15, 2),
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
);

-- Update connection string in backend/.env
DATABASE_URL=postgresql://user:pass@host:5432/financial_optimizer
```

---

## Performance Tuning

### Backend Optimization

```typescript
// Add caching headers
app.use((req, res, next) => {
  res.set('Cache-Control', 'public, max-age=300');
  next();
});

// Compression
import compression from 'compression';
app.use(compression());
```

### Frontend Optimization

```javascript
// Vite config
export default {
  build: {
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          recharts: ['recharts'],
          react: ['react', 'react-dom'],
        },
      },
    },
  },
};
```

---

## Monitoring & Logging

### Backend Logging

```typescript
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
```

### Frontend Error Tracking

```typescript
// Add error boundary
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error);
    // Send to error tracking service
  }
}
```

---

## SSL/HTTPS Setup

### Using Let's Encrypt with Certbot

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot certonly --standalone -d yourdomain.com

# Configure Nginx
server {
  listen 443 ssl;
  ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
  # ... rest of config
}
```

---

## CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'

      - name: Build Backend
        run: npm run build --prefix backend

      - name: Build Frontend
        run: npm run build --prefix frontend

      - name: Deploy
        run: |
          # Deploy script
          echo "Deploying..."
```

---

## Troubleshooting

### Port Already in Use

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### Database Lock

```bash
# Remove lock file
rm backend/portfolio.db-shm
rm backend/portfolio.db-wal
```

### CORS Issues

```typescript
// Update CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  }),
);
```

### Memory Leaks

```bash
# Monitor memory usage
node --max-old-space-size=2048 backend/dist/index.js
```

---

## Performance Benchmarks

- Frontend load time: < 2 seconds
- API response time: < 100ms
- Database query time: < 50ms
- Monte Carlo simulation: < 5 seconds (10,000 scenarios)

---

## Backup & Recovery

### Automated Backups

```bash
#!/bin/bash
# backup.sh
cp backend/portfolio.db backend/backups/portfolio-$(date +%Y%m%d-%H%M%S).db
find backend/backups -mtime +30 -delete  # Keep 30 days
```

Schedule with cron:

```bash
0 2 * * * /path/to/backup.sh
```

---

## Scaling Considerations

1. **Database**: Migrate to PostgreSQL for horizontal scaling
2. **Caching**: Implement Redis for distributed cache
3. **API**: Add load balancing (Nginx/HAProxy)
4. **Frontend**: Use CDN for static assets
5. **Background Jobs**: Implement Bull/RabbitMQ for async tasks

---

## Security Checklist

- [ ] Update dependencies: `npm audit`
- [ ] Set environment variables
- [ ] Enable HTTPS/SSL
- [ ] Add rate limiting
- [ ] Implement input validation
- [ ] Add CSRF protection
- [ ] Set secure headers
- [ ] Enable logging & monitoring
- [ ] Regular security audits
- [ ] Backup strategy in place

---

For more help, check the main README.md and QUICKSTART.md files.
