import { Router, Request, Response } from 'express';
import { Price } from '../models/Price';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

// GET /api/v2/prices/:mint
router.get(
  '/:mint',
  asyncHandler(async (req: Request, res: Response) => {
    const { mint } = req.params;
    const price = await Price.findOne({ mint }).sort({ timestamp: -1 });

    if (!price) {
      return res.status(404).json({ error: 'Price data not found' });
    }

    res.json(price);
  })
);

// GET /api/v2/prices/:mint/history
router.get(
  '/:mint/history',
  asyncHandler(async (req: Request, res: Response) => {
    const { mint } = req.params;
    const { period = '24h', limit = 100 } = req.query;

    const prices = await Price.find({ mint }).sort({ timestamp: -1 }).limit(Number(limit));

    res.json({
      mint,
      period,
      prices: prices.reverse(),
      count: prices.length,
    });
  })
);

export default router;
