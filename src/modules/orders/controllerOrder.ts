import { type Request, type Response } from 'express';
import { logger } from '../../config/winstonConfig/winstonConfig';
import { ServiceOrder } from './serviceOrder';

export class ControllerOrder {
  public serviceOrder: ServiceOrder;
  constructor() {
    this.serviceOrder = new ServiceOrder();
  }

  getOrders = async (_req: Request, res: Response): Promise<void> => {
    try {
      const allOrders = await this.serviceOrder.getOrdersService();
      res.status(200).json({
        status: true,
        allOrders,
      });
    } catch (error) {
      logger.error(`Error at controller Order, getOrders: ${String(error)}`);
      throw new Error();
    }
  };

  createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
      const { body } = req;
      console.log(body);
      const orderToSave = await this.serviceOrder.saveServiceOrder(body);
      await new ServiceOrder().updateStockAndSoldQty(body.cart);
      res.status(201).json({
        status: true,
        order: orderToSave,
      });
    } catch (error) {
      logger.error(`Error at controller Order, createOrder: ${String(error)}`);
      throw new Error();
    }
  };
}
