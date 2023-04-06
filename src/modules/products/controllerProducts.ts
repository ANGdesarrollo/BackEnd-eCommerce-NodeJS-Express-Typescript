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
      // ESTA FORMA NO ANDA
      // const products = await this.serviceProducts.getProducts();
      // ESTA FORMA ANDA
      const products = await new ServiceProduct().getProducts();
      res.status(200).json({
        status: true,
        products,
      });
    } catch (error) {
      logger.error(`Error at controller getProducts: ${String(error)}`);
      throw new Error();
    }
  }

  async saveProduct(req: Request, res: Response): Promise<void> {
    try {
      const { body } = req;
      await new ServiceProduct().saveProduct(body);
      res.status(200).json({
        status: true,
        message: 'Product successfully added',
        product: body,
      });
    } catch (error) {
      logger.error(`Error at controller saveProduct: ${String(error)}`);
      throw new Error();
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const statusDelete = await new ServiceProduct().deleteProduct(id);
      if (statusDelete) {
        res.status(200).json({
          status: true,
          message: 'Product successfully deleted',
        });
      } else {
        res.status(200).json({
          status: false,
          message: 'Product not found',
        });
      }
    } catch (error) {
      logger.error(`Error at controller deleteProduct: ${String(error)}`);
      throw new Error();
    }
  }
}
