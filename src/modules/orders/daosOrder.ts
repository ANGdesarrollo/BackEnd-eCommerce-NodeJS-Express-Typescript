import { ContainerFileSystem } from '../../containers/fileSystemContainer';
import { ContainerMongo } from '../../containers/mongoContainer';
import { type IOrder } from '../../interfaces/interfaceOrders';
import { ModelOrder } from './modelOrder';
import fs from 'fs';

export class DaosMongoOrder extends ContainerMongo<IOrder> {
  constructor() {
    super(ModelOrder);
  }
}

export class DaosFileSystemOrder extends ContainerFileSystem<IOrder> {
  constructor() {
    const filePath = './src/database/fileSystem/orders.txt';
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '[]', 'utf-8');
    }
    super(filePath);
  }
}
