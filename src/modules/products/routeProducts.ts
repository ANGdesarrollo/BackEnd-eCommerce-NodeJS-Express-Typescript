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
    this.router.post('/create', this.controllerProduct.saveProduct);
    this.router.delete('/delete/:id', this.controllerProduct.deleteProduct);
    this.router.put('/update', this.controllerProduct.updateProduct);
    return this.router;
  }
}
