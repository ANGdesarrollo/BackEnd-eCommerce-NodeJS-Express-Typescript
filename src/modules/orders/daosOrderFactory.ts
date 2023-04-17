import { env } from '../../config/envConfig/envConfig';
import { DaosFileSystemOrder, DaosMongoOrder } from './daosOrder';

let DaosOrder: DaosMongoOrder | DaosFileSystemOrder;

if (env.PERSISTENCE === 'MONGO') {
  DaosOrder = new DaosMongoOrder();
} else {
  DaosOrder = new DaosFileSystemOrder();
}

export default DaosOrder;
