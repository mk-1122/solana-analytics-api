import { Router, Request, Response } from 'express';
import { Token } from '../models/Token';
import { asyncHandler } from '../utils/asyncHandler';
import { logger } from '../utils/logger';

const router = Router();

// GET /api/v2/tokens/:mint
router.get(
  '/:mint',
  asyncHandler(async (req: Request, res: Response) => {
    const { mint } = req.params;
    const token = await Token.findOne({ mint });

    if (!token) {
      return res.status(404).json({ error: 'Token not found' });
    }

    res.json(token);
  })
);

// GET /api/v2/tokens/search
router.get(
  '/search',
  asyncHandler(async (req: Request, res: Response) => {
    const { q, limit = 10 } = req.query;

    if (!q) {
      return res.status(400).json({ error: 'Search query required' });
    }

    const tokens = await Token.find(
      { $text: { $search: String(q) } },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .limit(Number(limit));

    res.json({ results: tokens, count: tokens.length });
  })
);

// GET /api/v2/tokens/:mint/holders
router.get(
  '/:mint/holders',
  asyncHandler(async (req: Request, res: Response) => {
    const { mint } = req.params;
    const { limit = 100 } = req.query;

    // This would typically fetch from Solana blockchain
    // For now, returning mock data structure
    res.json({
      mint,
      holders: [
        {
          address: 'wallet1...',
          amount: 1000000,
          percentage: 5.2,
        },
      ],
      totalHolders: 1500,
      limit: Number(limit),
    });
  })
);

// GET /api/v2/tokens/:mint/traders
router.get(
  '/:mint/traders',
  asyncHandler(async (req: Request, res: Response) => {
    const { mint } = req.params;
    const { limit = 50 } = req.query;

    res.json({
      mint,
      topTraders: [
        {
          address: 'trader1...',
          trades: 150,
          volume: 500000,
          pnl: 45000,
        },
      ],
      limit: Number(limit),
    });
  })
);

export default router;
