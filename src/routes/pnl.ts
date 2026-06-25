import { Router, Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

// GET /api/v2/pnl/leaderboards
router.get(
  '/leaderboards',
  asyncHandler(async (req: Request, res: Response) => {
    const { period = '24h', limit = 100 } = req.query;

    res.json({
      period,
      leaderboards: [
        {
          rank: 1,
          address: 'wallet1...',
          pnl: 500000,
          pnlPercent: 250,
          trades: 45,
        },
      ],
      limit: Number(limit),
    });
  })
);

// GET /api/v2/pnl/wallet-analytics/:address
router.get(
  '/wallet-analytics/:address',
  asyncHandler(async (req: Request, res: Response) => {
    const { address } = req.params;

    res.json({
      address,
      totalTrades: 150,
      winRate: 65,
      avgWin: 5000,
      avgLoss: 2000,
      largestWin: 50000,
      largestLoss: 15000,
      profitFactor: 2.5,
      monthlyStats: [
        {
          month: 'January',
          pnl: 100000,
          trades: 25,
        },
      ],
    });
  })
);

export default router;
