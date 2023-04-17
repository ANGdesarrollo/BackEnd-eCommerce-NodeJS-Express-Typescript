import { Types } from "mongoose";
import { IProduct } from "./interfaceProduct";

export interface IUserOrder extends IUserOrderDTO {
    _id: string;
}

export interface IUserOrderDTO {
    created_at: string;
    username: string;
    orders: IOrder[]
}

export interface IOrder extends IOrderDTO {
    _id: Types.ObjectId;
    created_at: string;
}

export interface IOrderDTO {
    username: string;
    products: IProduct[];
    amount: number;
}