# Solana Analytics API

A comprehensive REST API for Solana DeFi analytics, token tracking, wallet analysis, and PnL monitoring. Similar to [SolanaTracker](https://www.solanatracker.io/).

## Features

✅ **Token Analytics**
- Token data retrieval (price, supply, holders)
- Token search and discovery
- Holder distribution analysis
- Top traders for tokens

✅ **Wallet Tracking**
- Wallet portfolio summary
- Position management
- Trade history
- Real-time balance updates

✅ **PnL Analysis**
- Profit/Loss calculations
- Win rate analytics
- Leaderboards (PnL, Volume, Win Rate)
- Monthly performance stats

✅ **Price Data**
- Real-time price feeds
- Historical price data
- Market cap and volume tracking
- 24h/7d/30d price changes

✅ **DEX Trading**
- Trade execution tracking
- Top buyers and sellers
- Volume analytics
- Liquidity data

✅ **Real-time WebSocket**
- Live price streams
- Trade notifications
- Portfolio updates
- Custom subscriptions

## Installation

### Prerequisites
- Node.js 18+
- MongoDB 6+
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/mk-1122/solana-analytics-api.git
cd solana-analytics-api
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

4. Start MongoDB:
```bash
# Using Docker
docker-compose up mongo

# Or locally if MongoDB is installed
mongod
```

5. Build TypeScript:
```bash
npm run build
```

6. Start the server:
```bash
npm run start

# Or for development with hot reload
npm run dev
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Token Endpoints

**Get Token by Mint**
```bash
GET /api/v2/tokens/:mint
```

**Search Tokens**
```bash
GET /api/v2/tokens/search?q=solana&limit=10
```

**Get Token Holders**
```bash
GET /api/v2/tokens/:mint/holders?limit=100
```

**Get Token Traders**
```bash
GET /api/v2/tokens/:mint/traders?limit=50
```

### Wallet Endpoints

**Get Wallet Summary**
```bash
GET /api/v2/wallets/:address/summary
```

**Get Wallet Positions**
```bash
GET /api/v2/wallets/:address/positions
```

**Get Wallet Trades**
```bash
GET /api/v2/wallets/:address/trades?limit=50
```

### PnL Endpoints

**Get PnL Leaderboard**
```bash
GET /api/v2/pnl/leaderboards?period=24h&limit=100
```

**Get Wallet Analytics**
```bash
GET /api/v2/pnl/wallet-analytics/:address
```

### Price Endpoints

**Get Current Price**
```bash
GET /api/v2/prices/:mint
```

**Get Price History**
```bash
GET /api/v2/prices/:mint/history?period=24h&limit=100
```

### DEX Endpoints

**Get Token Trades**
```bash
GET /api/v2/dex/tokens/:mint/trades?limit=100
```

**Get Top Buyers**
```bash
GET /api/v2/dex/tokens/:mint/buyers?limit=50
```

**Get Top Sellers**
```bash
GET /api/v2/dex/tokens/:mint/sellers?limit=50
```

### Leaderboard Endpoints

**PnL Leaderboard**
```bash
GET /api/v2/leaderboards/pnl?period=24h&limit=100
```

**Volume Leaderboard**
```bash
GET /api/v2/leaderboards/volume?period=24h&limit=100
```

**Win Rate Leaderboard**
```bash
GET /api/v2/leaderboards/winrate?period=24h&limit=100&minTrades=10
```

## WebSocket Usage

Connect to `ws://localhost:3000/ws`

**Subscribe to channel:**
```json
{
  "type": "subscribe",
  "payload": {
    "channel": "token:prices:EPjFWaLb3ycClbSwbjUhb6jV62aqXs73zNmtjScGkUi"
  }
}
```

**Unsubscribe from channel:**
```json
{
  "type": "unsubscribe",
  "payload": {
    "channel": "token:prices:EPjFWaLb3ycClbSwbjUhb6jV62aqXs73zNmtjScGkUi"
  }
}
```

## Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up

# Or build manually
docker build -t solana-analytics-api .
docker run -p 3000:3000 solana-analytics-api
```

## Environment Variables

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/solana-analytics
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
API_KEY=your_api_key_here
CORS_ORIGIN=*
LOG_LEVEL=info
```

## Development

```bash
# Install dependencies
npm install

# Run in development mode with hot reload
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

## Project Structure

```
.
├── src/
│   ├── config/          # Configuration files
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Express middleware
│   ├── utils/           # Utility functions
│   ├── websocket/       # WebSocket server
│   └── server.ts        # Main server file
├── dist/                # Compiled JavaScript
├── Dockerfile           # Docker configuration
├── docker-compose.yml   # Docker Compose setup
├── tsconfig.json        # TypeScript configuration
├── package.json         # Dependencies
└── README.md           # This file
```

## API Response Format

All responses follow this standard format:

**Success Response:**
```json
{
  "data": {...},
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Error Response:**
```json
{
  "error": {
    "status": 400,
    "message": "Invalid request",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

## Performance Considerations

- Implement caching for frequently accessed data
- Use database indexing on frequently queried fields
- Consider Redis for real-time data caching
- Implement rate limiting on endpoints
- Use pagination for large result sets

## Future Enhancements

- [ ] Integration with Solana blockchain RPC
- [ ] Real-time transaction monitoring
- [ ] Advanced portfolio analytics
- [ ] Machine learning-based predictions
- [ ] Mobile app API
- [ ] Webhook notifications
- [ ] Advanced charting endpoints
- [ ] Multi-chain support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please open an issue on GitHub.
