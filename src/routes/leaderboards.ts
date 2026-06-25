import { Router, Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

// GET /api/v2/leaderboards/pnl
router.get(
  '/pnl',
  asyncHandler(async (req: Request, res: Response) => {
    const { period = '24h', limit = 100 } = req.query;

    res.json({
      period,
      leaderboard: [
        {
          rank: 1,
          address: 'top_trader_1...',
          pnl: 1500000,
          pnlPercent: 350,
          trades: 120,
          winRate: 75,
        },
      ],
      limit: Number(limit),
    });
  })
);

// GET /api/v2/leaderboards/volume
router.get(
  '/volume',
  asyncHandler(async (req: Request, res: Response) => {
    const { period = '24h', limit = 100 } = req.query;

    res.json({
      period,
      leaderboard: [
        {
          rank: 1,
          address: 'high_volume_trader...',
          volume: 50000000,
          tradeCount: 5000,
        },
      ],
      limit: Number(limit),
    });
  })
);

// GET /api/v2/leaderboards/winrate
router.get(
  '/winrate',
  asyncHandler(async (req: Request, res: Response) => {
    const { period = '24h', limit = 100, minTrades = 10 } = req.query;

    res.json({
      period,
      leaderboard: [
        {
          rank: 1,
          address: 'accurate_trader...',
          winRate: 95,
          trades: 50,
          pnl: 250000,
        },
      ],
      limit: Number(limit),
      minTrades: Number(minTrades),
    });
  })
);

export default router;
