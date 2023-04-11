import { IProduct } from '../../../interfaces/interfaceProduct';

export interface IProductInitial {
    products: IProduct[];
    onLoading: boolean;
}

export interface IActionProductGetAll {
    payload: IProduct[];
    type: string;
}

export interface IActionProduct {
    payload: IProduct;
    type: string;
}
