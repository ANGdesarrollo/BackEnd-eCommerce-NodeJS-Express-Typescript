import { IProduct } from '../../../interfaces/interfaceProduct';

export interface IProductInitial {
    products: IProduct[];
}

export interface IActionProductGetAll {
    payload: IProductInitial;
    type: string;
}

export interface IActionProduct {
    payload: IProduct;
    type: string;
}
