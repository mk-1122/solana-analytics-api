import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: BASE_URL,
  validateStatus: () => true, // Don't throw on any status code
});

describe('Solana Analytics API Tests', () => {
  // Health Check
  describe('Health Check', () => {
    it('should return health status', async () => {
      const response = await api.get('/health');
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('status', 'ok');
      expect(response.data).toHaveProperty('timestamp');
    });
  });

  // Token Endpoints
  describe('Token Endpoints', () => {
    it('should get token by mint', async () => {
      const response = await api.get('/api/v2/tokens/EPjFWaLb3ycClbSwbjUhb6jV62aqXs73zNmtjScGkUi');
      expect([200, 404]).toContain(response.status);
    });

    it('should search tokens', async () => {
      const response = await api.get('/api/v2/tokens/search', {
        params: { q: 'solana', limit: 10 },
      });
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('results');
    });

    it('should get token holders', async () => {
      const response = await api.get('/api/v2/tokens/EPjFWaLb3ycClbSwbjUhb6jV62aqXs73zNmtjScGkUi/holders');
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('mint');
    });

    it('should get token traders', async () => {
      const response = await api.get('/api/v2/tokens/EPjFWaLb3ycClbSwbjUhb6jV62aqXs73zNmtjScGkUi/traders');
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('topTraders');
    });
  });

  // Wallet Endpoints
  describe('Wallet Endpoints', () => {
    const mockWalletAddress = 'wallet1234567890';

    it('should get wallet summary', async () => {
      const response = await api.get(`/api/v2/wallets/${mockWalletAddress}/summary`);
      expect([200, 404]).toContain(response.status);
    });

    it('should get wallet positions', async () => {
      const response = await api.get(`/api/v2/wallets/${mockWalletAddress}/positions`);
      expect([200, 404]).toContain(response.status);
    });

    it('should get wallet trades', async () => {
      const response = await api.get(`/api/v2/wallets/${mockWalletAddress}/trades`, {
        params: { limit: 50 },
      });
      expect([200, 404]).toContain(response.status);
    });
  });

  // PnL Endpoints
  describe('PnL Endpoints', () => {
    it('should get PnL leaderboards', async () => {
      const response = await api.get('/api/v2/pnl/leaderboards', {
        params: { period: '24h', limit: 100 },
      });
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('leaderboards');
    });

    it('should get wallet analytics', async () => {
      const response = await api.get('/api/v2/pnl/wallet-analytics/wallet1234567890');
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('totalTrades');
    });
  });

  // Price Endpoints
  describe('Price Endpoints', () => {
    it('should get current price', async () => {
      const response = await api.get('/api/v2/prices/EPjFWaLb3ycClbSwbjUhb6jV62aqXs73zNmtjScGkUi');
      expect([200, 404]).toContain(response.status);
    });

    it('should get price history', async () => {
      const response = await api.get('/api/v2/prices/EPjFWaLb3ycClbSwbjUhb6jV62aqXs73zNmtjScGkUi/history', {
        params: { period: '24h', limit: 100 },
      });
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('prices');
    });
  });

  // DEX Endpoints
  describe('DEX Endpoints', () => {
    it('should get token trades', async () => {
      const response = await api.get('/api/v2/dex/tokens/EPjFWaLb3ycClbSwbjUhb6jV62aqXs73zNmtjScGkUi/trades');
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('trades');
    });

    it('should get top buyers', async () => {
      const response = await api.get('/api/v2/dex/tokens/EPjFWaLb3ycClbSwbjUhb6jV62aqXs73zNmtjScGkUi/buyers');
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('topBuyers');
    });

    it('should get top sellers', async () => {
      const response = await api.get('/api/v2/dex/tokens/EPjFWaLb3ycClbSwbjUhb6jV62aqXs73zNmtjScGkUi/sellers');
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('topSellers');
    });
  });

  // Leaderboard Endpoints
  describe('Leaderboard Endpoints', () => {
    it('should get PnL leaderboard', async () => {
      const response = await api.get('/api/v2/leaderboards/pnl', {
        params: { period: '24h', limit: 100 },
      });
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('leaderboard');
    });

    it('should get volume leaderboard', async () => {
      const response = await api.get('/api/v2/leaderboards/volume', {
        params: { period: '24h', limit: 100 },
      });
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('leaderboard');
    });

    it('should get win rate leaderboard', async () => {
      const response = await api.get('/api/v2/leaderboards/winrate', {
        params: { period: '24h', limit: 100, minTrades: 10 },
      });
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('leaderboard');
    });
  });

  // Error Handling
  describe('Error Handling', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await api.get('/api/v2/nonexistent');
      expect(response.status).toBe(404);
      expect(response.data).toHaveProperty('error');
    });
  });
});
