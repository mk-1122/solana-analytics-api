import mongoose, { Schema, Document } from 'mongoose';

export interface IWallet extends Document {
  address: string;
  totalValue: number;
  totalPnL: number;
  totalPnLPercent: number;
  positions: Array<{
    mint: string;
    symbol: string;
    amount: number;
    value: number;
    costBasis: number;
    pnl: number;
    pnlPercent: number;
  }>;
  trades: number;
  winRate: number;
  createdAt: Date;
  updatedAt: Date;
}

const walletSchema = new Schema<IWallet>(
  {
    address: { type: String, required: true, unique: true, index: true },
    totalValue: { type: Number, default: 0 },
    totalPnL: { type: Number, default: 0 },
    totalPnLPercent: { type: Number, default: 0 },
    positions: [
      {
        mint: String,
        symbol: String,
        amount: Number,
        value: Number,
        costBasis: Number,
        pnl: Number,
        pnlPercent: Number,
      },
    ],
    trades: { type: Number, default: 0 },
    winRate: { type: Number, default: 0 },
  },
  { timestamps: true }
);

walletSchema.index({ address: 1 });

export const Wallet = mongoose.model<IWallet>('Wallet', walletSchema);
