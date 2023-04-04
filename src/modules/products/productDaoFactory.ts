import { env } from '../../config/envConfig/envConfig';
import { DaosMongoProduct } from './productDaos';

let DaosProduct: DaosMongoProduct;

if (env.PERSISTENCE === 'MONGO') {
  DaosProduct = new DaosMongoProduct();
} else {
  DaosProduct = new DaosMongoProduct();
}

export default DaosProduct;
