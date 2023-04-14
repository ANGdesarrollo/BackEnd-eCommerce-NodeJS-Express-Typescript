import { env } from '../../config/envConfig/envConfig';
import { DaosFileSystemProduct, DaosMongoProduct } from './productDaos';

let DaosProduct: DaosMongoProduct | DaosFileSystemProduct;

if (env.PERSISTENCE === 'MONGO') {
  DaosProduct = new DaosMongoProduct();
} else {
  DaosProduct = new DaosFileSystemProduct();
}

export default DaosProduct;
