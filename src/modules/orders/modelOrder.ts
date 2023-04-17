import { Schema, Types, model } from 'mongoose';
import { IOrder, IUserOrder } from '../../interfaces/interfaceOrders';

const IOrder = new Schema<IOrder>({
    amount: { type: Number, required: true},
    created_at: { type: String, required: true},
    products: [{
        _id: { type: Types.ObjectId, required: true},
        qty: { type: Number, required: true},

    }],
});

const IUserOrderSchema = new Schema<IUserOrder>({
    created_at: { type: String, required: true},
    orders: [IOrder],
    username: { type: String, required: true },
});




export const ModelOrder = model<IUserOrder>('order', IUserOrderSchema);


