import { logger } from '../../config/winstonConfig/winstonConfig';
import { type IProductDTO, type IProduct } from '../../interfaces/interfaceProduct';
import DaosProduct from './productDaoFactory';
import { type DaosFileSystemProduct, type DaosMongoProduct } from './productDaos';
import { useValidators } from '../../utils/validators/useValidators';
import { date } from '../../utils/date/date';
import { ProductModel } from './modelProducts';

export class ServiceProduct {
  public daosProduct: DaosMongoProduct | DaosFileSystemProduct;

  constructor() {
    this.daosProduct = DaosProduct;
  }

  async getProducts(): Promise<IProduct[]> {
    try {
      return await this.daosProduct.getAll();
    } catch (error) {
      logger.error(`Error at getting all products: ${String(error)}`);
      throw new Error();
    }
  }

  async saveProduct(product: IProductDTO): Promise<IProduct> {
    try {
      const { productCreateValidator } = useValidators();
      const productToValidate = await productCreateValidator(product);
      const validatedProduct = { ...productToValidate, createdAt: date(), updatedAt: date(), soldQty: 0 };
      const finalProduct: IProduct = new ProductModel(validatedProduct);
      return await this.daosProduct.save(finalProduct);
    } catch (error) {
      logger.error(`Error at saving product: ${String(error)}`);
      throw new Error();
    }
  }

  async deleteProduct(id: string): Promise<IProduct | null | undefined> {
    try {
      console.log('ENTRE AL PRODUCTI Y SE VIENE EL CONSOLE.LOG DE LO Q BORRA')
      const { idValidator } = useValidators();
      const validatedID = await idValidator(id);
      const product = await this.daosProduct.deleteOne(validatedID);
      console.log(product);
      return product;
    } catch (error) {
      logger.error(`Error deleting the product: ${String(error)}`);
      throw new Error();
    }
  }

  async updateProduct(item: IProduct): Promise<IProduct | null> {
    try {
      const { productUpdateValidator } = useValidators();
      const updateDate = { ...item, updatedAt: date() };
      const validatedProduct = await productUpdateValidator(updateDate);
      return await this.daosProduct.updateOne(validatedProduct);
    } catch (error) {
      logger.error(`Error updating the product: ${String(error)}`);
      throw new Error();
    }
  }
}
