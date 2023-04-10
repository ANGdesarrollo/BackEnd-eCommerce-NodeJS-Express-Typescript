import { AppDispatch } from '../../store';
import { axiosApi } from '../../../config/axiosApi';
import {createProductSlice, deleteProductSlice, getProductsSlice, updateProductSlice} from './productSlice';
import {IProduct, IProductDTO} from '../../../interfaces/interfaceProduct';

export const getProducts = (): any => async (dispatch: AppDispatch) => {
    axiosApi
        .get('/products')
        .then(({ data }) => {
            const products: IProduct[] = data.products;
            dispatch(getProductsSlice({ products }));
        })
        .catch((error) => {
            alert('Credentials Error');
            throw new Error(`Error at log in, ${error}`);
        });
};

export const updateProduct = (product: IProduct): any => async (dispatch: AppDispatch) => {
    axiosApi.put('/products/update', {
        product
    })
        .then(({data}) => {
            const objectUpdated: IProduct = data.product;
            dispatch(updateProductSlice(objectUpdated))
        })
        .catch(() => alert('Error at updating the product'));
}

export const deleteProduct = (id: string): any => async (dispatch: AppDispatch) => {
    axiosApi.delete(`/products/delete/${id}`)
        .then(({data}) => {
            const productDeleted: IProduct = data.product;
            dispatch(deleteProductSlice(productDeleted))
        })
        .catch(() => alert('Error at deleting product'))
}

export const createProduct = (product: IProductDTO): any => async (dispatch: AppDispatch) => {
    axiosApi.post('/products/create', {
        product
    })
        .then(({data}) => {
            const newProduct: IProduct = data.product;
            dispatch(createProductSlice(newProduct))
        })
        .catch(() => alert('Error at creating the product'));
}
