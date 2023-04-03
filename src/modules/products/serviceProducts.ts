// @ts-nocheck
import { logger } from '../../config/winstonConfig/winstonConfig';
import { type IProduct } from '../../interfaces/interfaceProduct';
import DaosProduct from './productDaoFactory';

export class ServiceProduct {
  public daosProduct: any;

  constructor() {
    this.daosProduct = DaosProduct;
    this.instance = this.instance();
  }

  instance(): any {
    console.log('soy servicio y me instancie');
    return this;
  }

  async getProducts(): Promise<IProduct[]> {
    try {
      const products = await this.daosProduct.getAll();
      return products;
    } catch (error) {
      logger.error(`Error at getting all products: ${String(error)}`);
      throw new Error(`Error at getting all products: ${String(error)}`);
    }
  }
}
