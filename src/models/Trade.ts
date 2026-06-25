import mongoose, { Schema, Document } from 'mongoose';

export interface ITrade extends Document {
  walletAddress: string;
  signature: string;
  tokenMint: string;
  tokenSymbol: string;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  cost: number;
  pnl?: number;
  pnlPercent?: number;
  timestamp: Date;
  blockTime: number;
}

const tradeSchema = new Schema<ITrade>(
  {
    walletAddress: { type: String, required: true, index: true },
    signature: { type: String, required: true, unique: true },
    tokenMint: { type: String, required: true, index: true },
    tokenSymbol: String,
    type: { type: String, enum: ['buy', 'sell'], required: true },
    amount: { type: Number, required: true },
    price: { type: Number, required: true },
    cost: { type: Number, required: true },
    pnl: Number,
    pnlPercent: Number,
    blockTime: { type: Number, required: true },
  },
  { timestamps: true }
);

tradeSchema.index({ walletAddress: 1, blockTime: -1 });
tradeSchema.index({ tokenMint: 1, blockTime: -1 });

export const Trade = mongoose.model<ITrade>('Trade', tradeSchema);
