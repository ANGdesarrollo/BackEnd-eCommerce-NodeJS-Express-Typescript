import { ModelOrder } from './modelOrder';
import { logger } from '../../config/winstonConfig/winstonConfig';
import { date } from '../../utils/date/date';
import { useValidators } from '../../utils/validators/useValidators';
import { type DaosFileSystemOrder, type DaosMongoOrder } from './daosOrder';
import DaosModel from './daosOrderFactory';
import { type IOrderDTO, type IOrder, IProductCart } from '../../interfaces/interfaceOrders';
import { IProduct } from '../../interfaces/interfaceProduct';
//@ts-nocheck

import { DaosMongoProduct, DaosFileSystemProduct } from '../products/productDaos';
import DaosProduct from '../products/productDaoFactory';
import { emailBody } from './bodyNodemailer';
import { email } from '../../utils/nodemailer/nodemailer';

export class ServiceOrder {
  public DaosModel: DaosMongoOrder | DaosFileSystemOrder;
  public DaosProductModel: DaosMongoProduct | DaosFileSystemProduct;
  public getOrders: any;
  constructor() {
    this.DaosModel = DaosModel;
    this.DaosProductModel = DaosProduct;
  }

  getOrdersService = async (): Promise<IOrder[]> => {
    try {
      const allOrders = await this.DaosModel.getAll();
      if (allOrders) {
        return allOrders;
      } else {
        logger.error('There was an error getting the Orders');
        throw new Error();
      }
    } catch (error) {
      logger.error(`Error at getting all orders on Service: ${error}`);
      throw new Error();
    }
  };

  async saveServiceOrder(order: IOrderDTO): Promise<IOrder | undefined> {
    try {
      const { orderValidator } = useValidators();
      const validateOrder = await orderValidator(order);
      const formateUserModel: IOrder = new ModelOrder({ ...validateOrder, created_at: date() });
      const save = await this.DaosModel.save(formateUserModel);
      if (save) {
        await email(emailBody(order.username), 'Order', order.username, '');
      }
      return save;
    } catch (error) {
      logger.error(`Error at saving order on Service: ${error}`);
      throw new Error();
    }
  }

  updateStockAndSoldQty = async (product: IProductCart[]): Promise<void> => {
    try {
      for (const el of product) {
        const searchProduct = await this.DaosProductModel.find({ _id: el._id });
        const productFound: IProduct = searchProduct._doc;
        if (!searchProduct) {
          logger.error(`Product ${el._id} not found`);
          continue;
        }
        const stock = productFound.stock - el.qty;
        const soldQty = productFound.soldQty + el.qty;

        const updateResult = await this.DaosProductModel.updateOne({ ...productFound, stock, soldQty });
        if (!updateResult) {
          logger.error(`Product ${el._id} could not be updated`);
          throw new Error();
        }
      }
    } catch (err) {
      logger.error(`Error updating stock and sold qty: ${err}`);
      throw new Error('Could not update stock and sold qty');
    }
  };
}
