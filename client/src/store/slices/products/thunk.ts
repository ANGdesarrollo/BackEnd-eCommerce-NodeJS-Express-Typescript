import { AppDispatch } from '../../store';
import { axiosApi } from '../../../config/axiosApi';
import {
    createProductSlice,
    deleteProductSlice,
    getProductsSlice,
    onLoading,
    updateProductSlice
} from './productSlice';
import {IProduct, IProductDTO} from '../../../interfaces/interfaceProduct';
import {swalAlert} from "../../../utils/swalAlert";

export const getProducts = (): any => async (dispatch: AppDispatch) => {
    dispatch(onLoading(true));
    axiosApi
        .get('/products')
        .then(({ data }) => {
            dispatch(onLoading(false));
            const products: IProduct[] = data.products;
            dispatch(getProductsSlice(products));
        })
        .catch((error) => {
            dispatch(onLoading(false));
            swalAlert({status: 'warning', message: 'Get products error'})
            alert('Credentials Error');
            throw new Error(`Error at log in, ${error}`);
        });
};

export const updateProduct = (product: IProduct): any => async (dispatch: AppDispatch) => {
    dispatch(onLoading(true));
    axiosApi.put('/products/update', {
        product
    })
        .then(({data}) => {
            dispatch(onLoading(false));
            const objectUpdated: IProduct = data.product;
            dispatch(updateProductSlice(objectUpdated))
            swalAlert({ status: 'success', message: 'Product successfully updated' });
        })
        .catch(() => {
            dispatch(onLoading(false));
            swalAlert({status: 'warning', message: 'Error updating the product'})
        });
}

export const deleteProduct = (id: string): any => async (dispatch: AppDispatch) => {
    dispatch(onLoading(true));
    axiosApi.delete(`/products/delete/${id}`)
        .then(({data}) => {
            dispatch(onLoading(false));
            const productDeleted: IProduct = data.product;
            dispatch(deleteProductSlice(productDeleted))
        })
        .catch(() => {
            dispatch(onLoading(false));
            swalAlert({status: 'warning', message: 'Error deleting the product'})
        })
}

export const createProduct = (product: IProductDTO): any => async (dispatch: AppDispatch) => {
    dispatch(onLoading(true));
    axiosApi.post('/products/create', {
        product
    })
        .then(({data}) => {
            dispatch(onLoading(false));
            const newProduct: IProduct = data.product;
            dispatch(createProductSlice(newProduct))
            swalAlert({ status: 'success', message: 'Product successfully created' });
        })
        .catch(() => {
            dispatch(onLoading(false));
            swalAlert({status: 'warning', message: 'Error creating the product'})
        });
}
