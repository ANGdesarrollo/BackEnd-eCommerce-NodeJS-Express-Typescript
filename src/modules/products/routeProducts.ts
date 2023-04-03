import { Router } from 'express';
import { ControllerProduct } from './controllerProducts';

export class ProductRouter {
  public router: Router;
  private readonly controllerProduct: ControllerProduct;

  constructor() {
    this.controllerProduct = new ControllerProduct();
    this.router = Router();
  }

  start(): Router {
    this.router.get('/', this.controllerProduct.getProducts);
    return this.router;
  }
}
