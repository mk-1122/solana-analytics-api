import { Router, Request, Response } from 'express';
import { Wallet } from '../models/Wallet';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

// GET /api/v2/wallets/:address/summary
router.get(
  '/:address/summary',
  asyncHandler(async (req: Request, res: Response) => {
    const { address } = req.params;
    const wallet = await Wallet.findOne({ address });

    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    res.json({
      address,
      totalValue: wallet.totalValue,
      totalPnL: wallet.totalPnL,
      totalPnLPercent: wallet.totalPnLPercent,
      positionCount: wallet.positions.length,
      trades: wallet.trades,
      winRate: wallet.winRate,
    });
  })
);

// GET /api/v2/wallets/:address/positions
router.get(
  '/:address/positions',
  asyncHandler(async (req: Request, res: Response) => {
    const { address } = req.params;
    const wallet = await Wallet.findOne({ address });

    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    res.json({
      address,
      positions: wallet.positions,
      totalValue: wallet.totalValue,
    });
  })
);

// GET /api/v2/wallets/:address/trades
router.get(
  '/:address/trades',
  asyncHandler(async (req: Request, res: Response) => {
    const { address } = req.params;
    const { limit = 50, offset = 0 } = req.query;

    // Fetch trades from Trade model
    res.json({
      address,
      trades: [],
      total: 0,
      limit: Number(limit),
      offset: Number(offset),
    });
  })
);

export default router;
