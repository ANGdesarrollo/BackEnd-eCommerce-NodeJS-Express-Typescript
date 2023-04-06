import { logger } from '../../config/winstonConfig/winstonConfig';
import { type IProduct } from '../../interfaces/interfaceProduct';
import { idSchema, productSchema } from './joiSchemas';

interface Validators {
  emailValidator: (email: string) => boolean;
  idValidator: (id: string) => Promise<string>;
  productValidator: (product: IProduct) => Promise<IProduct>;
}

export const useValidators = (): Validators => {
  const emailValidator = (email: string): boolean => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const idValidator = async (id: string): Promise<string> => {
    try {
      const value = await idSchema.validateAsync(id);
      return value;
    } catch (error) {
      logger.error(`Invalid ObjectID: ${String(error)}`);
      throw new Error();
    }
  };

  const productValidator = async (product: IProduct): Promise<IProduct> => {
    try {
      const value = await productSchema.validateAsync(product);
      return value;
    } catch (error) {
      logger.error(`Invalid format of product: ${String(error)}`);
      throw new Error();
    }
  };

  return {
    emailValidator,
    idValidator,
    productValidator,
  };
};
