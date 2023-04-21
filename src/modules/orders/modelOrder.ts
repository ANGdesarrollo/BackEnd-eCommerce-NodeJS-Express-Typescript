import { Schema, Types, model } from 'mongoose';
import { type IOrder } from '../../interfaces/interfaceOrders';

const IOrderSchema = new Schema<IOrder>({
  username: { type: String, required: true },
  amount: { type: Number, required: true },
  created_at: { type: String, required: true },
  cart: [
    {
      _id: { type: Types.ObjectId, required: true },
      qty: { type: Number, required: true },
    },
  ],
});

export const ModelOrder = model<IOrder>('order', IOrderSchema);
