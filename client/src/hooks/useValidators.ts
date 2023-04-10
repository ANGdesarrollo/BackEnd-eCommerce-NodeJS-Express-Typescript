import {CreatedProduct} from "../interfaces/interfaceProduct";

export const useValidators = () => {
    const validateRequired = (value: string) => !!value.length;

    const validateCreatedProduct = async(productCreated: CreatedProduct): Promise<boolean> => {
        for (const [key, value] of Object.entries(productCreated)) {
            if (value === '') {
                alert(`${key} it's empty`);
                return false;
            }
        }
        return true;
    }

    return {
        validateRequired,
        validateCreatedProduct
    }
}
