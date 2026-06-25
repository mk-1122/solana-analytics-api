# Solana Analytics API - Test Guide

## Prerequisites
- API running on `http://localhost:3000`
- MongoDB running and connected

## Health Check

```bash
curl http://localhost:3000/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2026-06-25T21:30:00.000Z"
}
```

---

## Token Endpoints

### 1. Get Token by Mint
```bash
curl http://localhost:3000/api/v2/tokens/EPjFWaLb3ycClbSwbjUhb6jV62aqXs73zNmtjScGkUi
```

### 2. Search Tokens
```bash
curl "http://localhost:3000/api/v2/tokens/search?q=solana&limit=10"
```

### 3. Get Token Holders
```bash
curl "http://localhost:3000/api/v2/tokens/EPjFWaLb3ycClbSwbjUhb6jV62aqXs73zNmtjScGkUi/holders?limit=100"
```

### 4. Get Token Traders
```bash
curl "http://localhost:3000/api/v2/tokens/EPjFWaLb3ycClbSwbjUhb6jV62aqXs73zNmtjScGkUi/traders?limit=50"
```

---

## Wallet Endpoints

### 1. Get Wallet Summary
```bash
curl "http://localhost:3000/api/v2/wallets/YOUR_WALLET_ADDRESS/summary"
```

### 2. Get Wallet Positions
```bash
curl "http://localhost:3000/api/v2/wallets/YOUR_WALLET_ADDRESS/positions"
```

### 3. Get Wallet Trades
```bash
curl "http://localhost:3000/api/v2/wallets/YOUR_WALLET_ADDRESS/trades?limit=50&offset=0"
```

---

## PnL Endpoints

### 1. Get PnL Leaderboards
```bash
curl "http://localhost:3000/api/v2/pnl/leaderboards?period=24h&limit=100"
```

### 2. Get Wallet Analytics
```bash
curl "http://localhost:3000/api/v2/pnl/wallet-analytics/YOUR_WALLET_ADDRESS"
```

---

## Price Endpoints

### 1. Get Current Price
```bash
curl "http://localhost:3000/api/v2/prices/EPjFWaLb3ycClbSwbjUhb6jV62aqXs73zNmtjScGkUi"
```

### 2. Get Price History
```bash
curl "http://localhost:3000/api/v2/prices/EPjFWaLb3ycClbSwbjUhb6jV62aqXs73zNmtjScGkUi/history?period=24h&limit=100"
```

---

## DEX Endpoints

### 1. Get Token Trades
```bash
curl "http://localhost:3000/api/v2/dex/tokens/EPjFWaLb3ycClbSwbjUhb6jV62aqXs73zNmtjScGkUi/trades?limit=100"
```

### 2. Get Top Buyers
```bash
curl "http://localhost:3000/api/v2/dex/tokens/EPjFWaLb3ycClbSwbjUhb6jV62aqXs73zNmtjScGkUi/buyers?limit=50"
```

### 3. Get Top Sellers
```bash
curl "http://localhost:3000/api/v2/dex/tokens/EPjFWaLb3ycClbSwbjUhb6jV62aqXs73zNmtjScGkUi/sellers?limit=50"
```

---

## Leaderboard Endpoints

### 1. PnL Leaderboard
```bash
curl "http://localhost:3000/api/v2/leaderboards/pnl?period=24h&limit=100"
```

### 2. Volume Leaderboard
```bash
curl "http://localhost:3000/api/v2/leaderboards/volume?period=24h&limit=100"
```

### 3. Win Rate Leaderboard
```bash
curl "http://localhost:3000/api/v2/leaderboards/winrate?period=24h&limit=100&minTrades=10"
```

---

## WebSocket Testing

### Connect to WebSocket
```bash
wscat -c ws://localhost:3000/ws
```

If `wscat` is not installed:
```bash
npm install -g wscat
```

### Subscribe to Channel
After connecting, send:
```json
{
  "type": "subscribe",
  "payload": {
    "channel": "token:prices:EPjFWaLb3ycClbSwbjUhb6jV62aqXs73zNmtjScGkUi"
  }
}
```

### Unsubscribe from Channel
```json
{
  "type": "unsubscribe",
  "payload": {
    "channel": "token:prices:EPjFWaLb3ycClbSwbjUhb6jV62aqXs73zNmtjScGkUi"
  }
}
```

---

## Test Results Summary

| Endpoint | Status | Response Time | Notes |
|----------|--------|----------------|-------|
| `/health` | ✓ | | |
| `/api/v2/tokens/:mint` | ✓ | | Returns mock data if not in DB |
| `/api/v2/tokens/search` | ✓ | | |
| `/api/v2/wallets/:address/summary` | ✓ | | |
| `/api/v2/pnl/leaderboards` | ✓ | | |
| `/api/v2/prices/:mint` | ✓ | | |
| `/api/v2/dex/tokens/:mint/trades` | ✓ | | |
| `/api/v2/leaderboards/pnl` | ✓ | | |
| WebSocket `/ws` | ✓ | | Subscribe/Unsubscribe working |

---

## Notes

- Replace `YOUR_WALLET_ADDRESS` with an actual Solana wallet address
- The API returns mock data for demonstration. To get real data, you need to:
  - Integrate with Solana RPC endpoints
  - Populate the MongoDB database with real token/wallet data
  - Implement real-time data fetching
