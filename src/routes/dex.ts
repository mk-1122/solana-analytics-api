import { Router, Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

// GET /api/v2/dex/tokens/:mint/trades
router.get(
  '/tokens/:mint/trades',
  asyncHandler(async (req: Request, res: Response) => {
    const { mint } = req.params;
    const { limit = 100 } = req.query;

    res.json({
      mint,
      trades: [
        {
          signature: 'tx1...',
          type: 'buy',
          amount: 1000,
          price: 50,
          timestamp: new Date(),
          buyer: 'wallet1...',
          seller: 'wallet2...',
        },
      ],
      limit: Number(limit),
    });
  })
);

// GET /api/v2/dex/tokens/:mint/buyers
router.get(
  '/tokens/:mint/buyers',
  asyncHandler(async (req: Request, res: Response) => {
    const { mint } = req.params;
    const { limit = 50 } = req.query;

    res.json({
      mint,
      topBuyers: [
        {
          address: 'buyer1...',
          volume: 500000,
          tradeCount: 45,
        },
      ],
      limit: Number(limit),
    });
  })
);

// GET /api/v2/dex/tokens/:mint/sellers
router.get(
  '/tokens/:mint/sellers',
  asyncHandler(async (req: Request, res: Response) => {
    const { mint } = req.params;
    const { limit = 50 } = req.query;

    res.json({
      mint,
      topSellers: [
        {
          address: 'seller1...',
          volume: 300000,
          tradeCount: 30,
        },
      ],
      limit: Number(limit),
    });
  })
);

export default router;
