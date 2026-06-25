import mongoose, { Schema, Document } from 'mongoose';

export interface IPrice extends Document {
  mint: string;
  symbol: string;
  price: number;
  volume24h: number;
  marketCap: number;
  priceChange24h: number;
  priceChange7d: number;
  priceChange30d: number;
  timestamp: Date;
}

const priceSchema = new Schema<IPrice>(
  {
    mint: { type: String, required: true, index: true },
    symbol: { type: String, required: true },
    price: { type: Number, required: true },
    volume24h: { type: Number, default: 0 },
    marketCap: { type: Number, default: 0 },
    priceChange24h: { type: Number, default: 0 },
    priceChange7d: { type: Number, default: 0 },
    priceChange30d: { type: Number, default: 0 },
  },
  { timestamps: true }
);

priceSchema.index({ mint: 1, timestamp: -1 });

export const Price = mongoose.model<IPrice>('Price', priceSchema);
