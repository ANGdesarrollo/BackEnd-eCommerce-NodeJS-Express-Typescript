export interface IOrder extends IOrderDTO {
  _id: string;
  created_at: string;
}

export interface IOrderDTO {
  username: string;
  cart: IProductCart[];
  amount: number;
}

export interface IProductCart {
  _id: string;
  qty: number;
}
