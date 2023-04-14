import { ContainerFileSystem } from '../../containers/fileSystemContainer';
import { ContainerMongo } from '../../containers/mongoContainer';
import { type IProduct } from '../../interfaces/interfaceProduct';
import { ProductModel } from './modelProducts';
import fs from 'fs';

export class DaosMongoProduct extends ContainerMongo<IProduct> {
  constructor() {
    super(ProductModel);
  }
}

export class DaosFileSystemProduct extends ContainerFileSystem<IProduct> {
  constructor() {
    const filePath = './src/database/fileSystem/products.txt';
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '[]', 'utf-8');
    }
    super(filePath);
  }
}
