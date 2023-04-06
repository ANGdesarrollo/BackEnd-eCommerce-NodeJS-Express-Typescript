import { logger } from '../../config/winstonConfig/winstonConfig';
import { type IProduct } from '../../interfaces/interfaceProduct';
import DaosProduct from './productDaoFactory';
import { type DaosMongoProduct } from './productDaos';
import { ProductModel } from './modelProducts';
import { useValidators } from '../../utils/validators/useValidators';
import { date } from '../../utils/date/date';

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
      throw new Error();
    }
  }

  async saveProduct(product: IProduct): Promise<IProduct> {
    try {
      const { productValidator } = useValidators();
      const validatedProduct = await productValidator(product);
      const finalProduct = { ...validatedProduct, date: date() };
      const productToSave = new ProductModel(finalProduct);
      await this.daosProduct.save(finalProduct);
      return productToSave;
    } catch (error) {
      logger.error(`Error at saving product: ${String(error)}`);
      throw new Error();
    }
  }

  async deleteProduct(id: string): Promise<IProduct | null> {
    try {
      const { idValidator } = useValidators();
      const validatedID = await idValidator(id);
      return await this.daosProduct.deleteOne(validatedID);
    } catch (error) {
      logger.error(`Error deleting the product: ${String(error)}`);
      throw new Error();
    }
  }
}
