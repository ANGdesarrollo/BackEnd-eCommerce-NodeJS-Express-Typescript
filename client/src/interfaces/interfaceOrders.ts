export interface IOrder extends IOrderDTO {
    _id: string;
    created_at: string;
}

export interface IOrderDTO {
    username: string;
    cart: IOrderDetail[];
    amount: number;
}

export interface IOrderDetail {
    _id: string;
    qty: number;
    thumbnail: string;
    price: number;
    name: string;
    totalPrice: string;
}
