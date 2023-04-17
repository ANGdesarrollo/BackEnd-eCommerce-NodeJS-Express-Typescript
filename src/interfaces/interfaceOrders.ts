import { Types } from "mongoose";
import { IProduct } from "./interfaceProduct";

export interface IUserOrder {
    created_at: string;
    username: string;
    orders: IOrder[]
}

export interface IOrder {
    _id: Types.ObjectId;
    created_at: string;
    products: IProduct[];
    amount: number;
}