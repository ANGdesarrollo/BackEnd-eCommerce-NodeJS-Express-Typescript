import { type IProduct } from './interfaceProduct';

export interface IOrder extends IOrderDTO {
  _id: string;
  created_at: string;
}

export interface IOrderDTO {
  username: string;
  products: IProduct[];
  amount: number;
}
