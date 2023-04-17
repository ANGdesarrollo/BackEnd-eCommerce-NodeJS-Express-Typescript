import { Request, Response } from "express";
import { logger } from "../../config/winstonConfig/winstonConfig";
import { ServiceOrder } from "./serviceOrder";

export class ControllerOrder {
    public serviceOrder: ServiceOrder;
    constructor() {
        this.serviceOrder = new ServiceOrder();
    }

    async createOrder(req: Request, res: Response): Promise<void> {
        try {
            const { body } = req;
            const orderToSave = await new ServiceOrder().saveServiceOrder(body);
            if(orderToSave) {
              res.json({
                status: true,
                order: orderToSave
              })
            } else {
              res.json({
                status: false,
              })
            }
            
          } catch (error) {
            logger.error(`Error at controller Order, createOrder: ${String(error)}`);
            throw new Error();
          }
    }
}