import { ModelOrder } from './modelOrder';
import { logger } from '../../config/winstonConfig/winstonConfig';
import { date } from '../../utils/date/date';
import { useValidators } from '../../utils/validators/useValidators';
import { type DaosFileSystemOrder, type DaosMongoOrder } from './daosOrder';
import DaosModel from './daosOrderFactory';
import { type IOrderDTO, type IOrder } from '../../interfaces/interfaceOrders';

export class ServiceOrder {
  public DaosModel: DaosMongoOrder | DaosFileSystemOrder;
  constructor() {
    this.DaosModel = DaosModel;
  }

  async getOrdersService(): Promise<IOrder[]> {
    try {
      const allOrders = await this.DaosModel.getAll();
      return allOrders;
    } catch (error) {
      logger.error(`Error at getting all orders on Service: ${String(error)}`);
      throw new Error();
    }
  }

  async saveServiceOrder(order: IOrderDTO): Promise<IOrder | undefined> {
    try {
      console.log(order);
      const { orderValidator } = useValidators();
      const validateOrder = await orderValidator(order);
      const formateUserModel: IOrder = new ModelOrder({ ...validateOrder, created_at: date() });
      return await this.DaosModel.save(formateUserModel);
    } catch (error) {
      logger.error(`Error at saving order on Service: ${String(error)}`);
      throw new Error();
    }
  }
}
