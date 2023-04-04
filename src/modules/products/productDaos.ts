import { ContainerMongo } from '../../containers/mongoContainer';
import { type IProduct } from '../../interfaces/interfaceProduct';
import { ProductModel } from './modelProducts';

export class DaosMongoProduct extends ContainerMongo<IProduct> {
  constructor() {
    super(ProductModel);
  }
}
