import { Schema, model } from 'mongoose';
import { string } from 'joi';
import { IOrder, IUserOrder } from '../../interfaces/interfaceOrders';
import { productSchema } from '../products/modelProducts';

const IUserOrderSchema = new Schema<IUserOrder>({
    created_at: { type: String, required: true},
    orders: [productSchema],
    username: { type: String, required: true },
});


const IOrder = new Schema<IOrder>({
    amount: { type: Number, required: true},
    created_at: { type: String, required: true},
    products: [IUserOrderSchema],
});


