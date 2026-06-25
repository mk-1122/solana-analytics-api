import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import tokenRoutes from './routes/tokens';
import walletRoutes from './routes/wallets';
import pnlRoutes from './routes/pnl';
import priceRoutes from './routes/prices';
import dexRoutes from './routes/dex';
import leaderboardRoutes from './routes/leaderboards';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './utils/logger';
import { WebSocketServer } from './websocket/server';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/v2/tokens', tokenRoutes);
app.use('/api/v2/wallets', walletRoutes);
app.use('/api/v2/pnl', pnlRoutes);
app.use('/api/v2/prices', priceRoutes);
app.use('/api/v2/dex', dexRoutes);
app.use('/api/v2/leaderboards', leaderboardRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error Handler
app.use(errorHandler);

// Start Server
const startServer = async () => {
  try {
    // Try to connect to MongoDB, but don't fail if it's not available
    try {
      await connectDB();
      logger.info('Database connected');
    } catch (dbError) {
      logger.warn('MongoDB not available, running in demo mode');
    }

    const server = app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });

    // Initialize WebSocket Server
    new WebSocketServer(server);
    logger.info('WebSocket server initialized');
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
