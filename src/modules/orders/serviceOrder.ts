import { ModelOrder } from './modelOrder';
import { logger } from '../../config/winstonConfig/winstonConfig';
import { date } from '../../utils/date/date';
import { useValidators } from '../../utils/validators/useValidators';
import { type DaosFileSystemOrder, type DaosMongoOrder } from './daosOrder';
import DaosModel from './daosOrderFactory';
import { type IOrderDTO, type IOrder, IProductCart } from '../../interfaces/interfaceOrders';
import { IProduct } from '../../interfaces/interfaceProduct';
import { DaosMongoProduct, DaosFileSystemProduct } from '../products/productDaos';
import DaosProduct from '../products/productDaoFactory';
import { emailBody } from './bodyNodemailer';
import { email } from '../../utils/nodemailer/nodemailer';

export class ServiceOrder {
  public DaosModel: DaosMongoOrder | DaosFileSystemOrder;
  public DaosProductModel: DaosMongoProduct | DaosFileSystemProduct;
  constructor() {
    this.DaosModel = DaosModel;
    this.DaosProductModel = DaosProduct;
  }

  async getOrdersService(): Promise<IOrder[]> {
    try {
      const allOrders = await this.DaosModel.getAll();
      return allOrders;
    } catch (error) {
      logger.error(`Error at getting all orders on Service: ${(error)}`);
      throw new Error();
    }
  }

  async saveServiceOrder(order: IOrderDTO): Promise<IOrder | undefined> {
    try {
      const { orderValidator } = useValidators();
      const validateOrder = await orderValidator(order);
      const formateUserModel: IOrder = new ModelOrder({ ...validateOrder, created_at: date() });
      const save = await this.DaosModel.save(formateUserModel);
      if(save) {
        await email(emailBody(order.username), 'Order', order.username, '' );
      }
      return save;
    } catch (error) {
      logger.error(`Error at saving order on Service: ${(error)}`);
      throw new Error();
    }
  }

  async updateStockAndSoldQty(product: IProductCart[]): Promise<void> {
    console.log('entre')
    product.map(async (el) => {
      const searchProduct: IProduct = await this.DaosProductModel.find({ _id: el._id });
      if (searchProduct) {
        const stock = searchProduct.stock - el.qty;
        const qtySold = searchProduct.soldQty + el.qty;
        const updatedProduct = { ...searchProduct, stock, qtySold };
        const updateInDB = await this.DaosProductModel.updateOne(updatedProduct);
        if(!updateInDB) {
          logger.error("There was a problem updating the stock and qty information")
          throw new Error()
        }
      }
    });
  }
}
