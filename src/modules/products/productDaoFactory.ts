import { ContainerMongo } from '../../containers/mongoContainer';
import { ProductModel } from './modelProducts';
import { type IProduct } from '../../interfaces/interfaceProduct';
import { env } from '../../config/envConfig/envConfig';

let DaosProduct;

if (env.PERSISTENCE === 'MONGO') {
  class ProductDao extends ContainerMongo<IProduct> {
    constructor() {
      super(ProductModel);
    }
  }
  DaosProduct = new ProductDao();
} else {
  class ProductDao extends ContainerMongo<IProduct> {
    constructor() {
      super(ProductModel);
    }
  }
  DaosProduct = new ProductDao();
}

export default DaosProduct;
