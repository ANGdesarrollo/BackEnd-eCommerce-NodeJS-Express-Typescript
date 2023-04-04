import { logger } from '../../config/winstonConfig/winstonConfig';
import { type IProduct } from '../../interfaces/interfaceProduct';
import DaosProduct from './productDaoFactory';
import { type DaosMongoProduct } from './productDaos';
import { ProductModel } from './modelProducts';

export class ServiceProduct {
  public daosProduct: DaosMongoProduct;

  constructor() {
    this.daosProduct = DaosProduct;
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

  async saveProduct(product: IProduct): Promise<IProduct> {
    try {
      const productToSave = new ProductModel(product);
      await this.daosProduct.save(productToSave);
      return productToSave;
    } catch (error) {
      logger.error(`Error at getting all products: ${String(error)}`);
      throw new Error(`Error at getting all products: ${String(error)}`);
    }
  }
}
