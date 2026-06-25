import mongoose, { Schema, Document } from 'mongoose';

export interface IToken extends Document {
  mint: string;
  symbol: string;
  name: string;
  decimals: number;
  supply: number;
  circulatingSupply: number;
  marketCap: number;
  price: number;
  priceChange24h: number;
  volume24h: number;
  holders: number;
  image?: string;
  description?: string;
  website?: string;
  twitter?: string;
  discord?: string;
  createdAt: Date;
  updatedAt: Date;
}

const tokenSchema = new Schema<IToken>(
  {
    mint: { type: String, required: true, unique: true, index: true },
    symbol: { type: String, required: true },
    name: { type: String, required: true },
    decimals: { type: Number, required: true },
    supply: { type: Number, default: 0 },
    circulatingSupply: { type: Number, default: 0 },
    marketCap: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    priceChange24h: { type: Number, default: 0 },
    volume24h: { type: Number, default: 0 },
    holders: { type: Number, default: 0 },
    image: String,
    description: String,
    website: String,
    twitter: String,
    discord: String,
  },
  { timestamps: true }
);

tokenSchema.index({ symbol: 'text', name: 'text' });

export const Token = mongoose.model<IToken>('Token', tokenSchema);
