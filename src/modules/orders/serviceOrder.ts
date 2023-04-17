import mongoose from 'mongoose';
import { logger } from '../../config/winstonConfig/winstonConfig';
import { IOrder, IOrderDTO, IUserOrder, IUserOrderDTO } from '../../interfaces/interfaceOrders';
import { date } from '../../utils/date/date';
import { useValidators } from '../../utils/validators/useValidators';
import { DaosFileSystemOrder, DaosMongoOrder } from './daosOrder';
import DaosModel from './daosOrderFactory';
import { ModelOrder } from './modelOrder';

export class ServiceOrder {
    public DaosModel: DaosMongoOrder | DaosFileSystemOrder
    constructor() {
        this.DaosModel = DaosModel;
    }

    async getOrdersService(): Promise<IUserOrder[]> {
        try {
          const allOrders = await this.DaosModel.getAll();
          return allOrders;
        } catch (error) {
          logger.error(`Error at getting all orders on Service: ${String(error)}`);
          throw new Error();
        }
      }
    
      async saveServiceOrder(order: IOrderDTO): Promise<IUserOrder | undefined> {
        try {
          const { orderValidator } = useValidators();
          const { username } = order;
          const findOrder: IUserOrder = await this.DaosModel.find({ username });
          const validateOrder = await orderValidator(order);
          const formatedUserOrder: IOrder = { ...validateOrder, created_at: date(), _id: new mongoose.Types.ObjectId() };
    
          if (!findOrder) {
            const formatedOrder: IUserOrderDTO = {
              created_at: date(),
              orders: [],
              username,
            };
            formatedOrder.orders.push(formatedUserOrder);
            console.log(`SOY FORMATED ORDER ${JSON.stringify(formatedOrder, null, 2)}`)
            const formatedOrderModel: IUserOrder = new ModelOrder(formatedOrder);
            console.log(`SOY MODEL ORDER ${formatedOrderModel}`)
            const order: IUserOrder = await this.DaosModel.save(formatedOrderModel);
            return order;
          } else {
            findOrder.orders.push(formatedUserOrder);
            const saveOrder = await this.DaosModel.updateOne(findOrder);
            if (!saveOrder) {
              logger.error(`Order at saveServiceOrder is undefined | null`);
              throw new Error();
            } else {
                return saveOrder;
            }
          }
        } catch (error) {
          logger.error(`Error at saving order on Service: ${String(error)}`);
          throw new Error();
        }
      }
}