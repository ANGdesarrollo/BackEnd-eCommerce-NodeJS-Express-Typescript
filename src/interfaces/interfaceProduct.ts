import { type ObjectId } from 'mongoose';

export interface IProductDTO {
  name: string;
  thumbnail: string;
  stock: number;
  discount: Discount;
  category: string;
}

export interface IProductFinal extends IProductDTO {
  _id: ObjectId;
  date: Date;
}

interface Discount {
  percentage: number;
  expires_day: Date;
}
