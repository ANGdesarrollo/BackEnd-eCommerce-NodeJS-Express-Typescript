import { logger } from '../../config/winstonConfig/winstonConfig';
import { type IMessageDTO } from '../../interfaces/interfaceChat';
import { IEmail } from '../../interfaces/interfaceEmail';
import { IOrderDTO } from '../../interfaces/interfaceOrders';
import { type IProductDTO, type IProduct } from '../../interfaces/interfaceProduct';
import {
  idSchema,
  productCreateSchema,
  productUpdateSchema,
  messageSchema,
  emailSchema,
  orderSchema,
} from './joiSchemas';

interface Validators {
  emailValidator: (email: string) => boolean;
  idValidator: (id: string) => Promise<string>;
  productCreateValidator: (product: IProductDTO) => Promise<IProductDTO>;
  productUpdateValidator: (product: IProduct) => Promise<IProduct>;
  messageValidator: (message: IMessageDTO) => Promise<IMessageDTO>;
  nodemailerValidator: (email: IEmail) => Promise<IEmail>;
  orderValidator: (order: IOrderDTO) => Promise<IOrderDTO>
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

  const productCreateValidator = async (product: IProductDTO): Promise<IProductDTO> => {
    try {
      const value = await productCreateSchema.validateAsync(product);
      return value;
    } catch (error) {
      logger.error(`Invalid format of product: ${String(error)}`);
      throw new Error();
    }
  };

  const productUpdateValidator = async (product: IProduct): Promise<IProduct> => {
    try {
      const value = await productUpdateSchema.validateAsync(product);
      return value;
    } catch (error) {
      logger.error(`Invalid format of product: ${String(error)}`);
      throw new Error();
    }
  };

  const messageValidator = async (message: IMessageDTO): Promise<IMessageDTO> => {
    try {
      const value = await messageSchema.validateAsync(message);
      return value;
    } catch (error) {
      logger.error(`Invalid format of message: ${String(error)}`);
      throw new Error();
    }
  };

  const nodemailerValidator = async (message: IEmail): Promise<IEmail> => {
    try {
      const value = await emailSchema.validateAsync(message);
      return value;
    } catch (error) {
      logger.error(`Invalid format of contact Message: ${String(error)}`);
      throw new Error();
    }
  };

  const orderValidator = async (order: IOrderDTO): Promise<IOrderDTO> => {
    try {
      const value = await orderSchema.validateAsync(order);
      return value;
    } catch (error) {
      logger.error(`Invalid format of client order: ${String(error)}`);
      throw new Error();
    }
  };

  return {
    emailValidator,
    idValidator,
    productCreateValidator,
    productUpdateValidator,
    messageValidator,
    nodemailerValidator,
    orderValidator,
  };
};
