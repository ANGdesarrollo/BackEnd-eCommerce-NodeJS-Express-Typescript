import { ServiceProduct } from './serviceProducts';
import { type Request, type Response } from 'express';
import { logger } from '../../config/winstonConfig/winstonConfig';

export class ControllerProduct {
  public serviceProducts: ServiceProduct;

  constructor() {
    this.serviceProducts = new ServiceProduct();
  }

  async getProducts(_req: Request, res: Response): Promise<void> {
    try {
      const products = await new ServiceProduct().getProducts();
      res.status(200).json({
        status: true,
        products,
      });
    } catch (error) {
      logger.error(`Error at controller getProducts: ${String(error)}`);
      throw new Error(`Error at controller getProducts: ${String(error)}`);
    }
  }
}
