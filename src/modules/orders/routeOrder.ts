import { Router } from 'express';
import { ControllerOrder } from './controllerOrder';

export class OrderRouter {
  public router: Router;
  private readonly controllerOrder: ControllerOrder;

  constructor() {
    this.controllerOrder = new ControllerOrder();
    this.router = Router();
  }

  start(): Router {
    this.router.post('/', this.controllerOrder.createOrder);
    this.router.get('/', this.controllerOrder.getOrders);
    return this.router;
  }
}
