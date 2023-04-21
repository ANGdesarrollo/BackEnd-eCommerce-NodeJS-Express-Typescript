import { Request, Response } from 'express';
import { logger } from '../../config/winstonConfig/winstonConfig';
import { ServiceOrder } from './serviceOrder';

export class ControllerOrder {
  public serviceOrder: ServiceOrder;
  constructor() {
    this.serviceOrder = new ServiceOrder();
  }

  async getOrders(_req: Request, res: Response): Promise<void> {
    try {
      const allOrders = await new ServiceOrder().getOrdersService();
      if (allOrders) {
        res.json({
          status: true,
          allOrders,
        });
      } else {
        res.json({
          status: false,
        });
      }
    } catch (error) {
      logger.error(`Error at controller Order, getOrders: ${(error)}`);
      throw new Error();
    }
  }

  async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const { body } = req;
      const orderToSave = await new ServiceOrder().saveServiceOrder(body);
      if (orderToSave) {
        await new ServiceOrder().updateStockAndSoldQty(body.cart);
        res.json({
          status: true,
          order: orderToSave,
        });
      } else {
        res.json({
          status: false,
        });
      }
    } catch (error) {
      logger.error(`Error at controller Order, createOrder: ${(error)}`);
      throw new Error();
    }
  }
}
