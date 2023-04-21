export interface IOrder extends IOrderDTO {
  _id: string;
  created_at: string;
}

export interface IOrderDTO {
  username: string;
  cart: IProductCart[];
  amount: number;
}

interface IProductCart {
  _id: string;
  price: number;
  qty: number;
}
