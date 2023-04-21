import { ServiceProduct } from './serviceProducts';
import { type Request, type Response } from 'express';
import { logger } from '../../config/winstonConfig/winstonConfig';

export class ControllerProduct {
  public serviceProducts: ServiceProduct;

  constructor() {
    this.serviceProducts = new ServiceProduct();
  }

  getProducts = async (_req: Request, res: Response): Promise<void> => {
    try {
      const products = await this.serviceProducts.getProducts();
      res.status(200).json({
        status: true,
        products,
      });
    } catch (error) {
      logger.error(`Error at controller getProducts: ${error}`);
      throw new Error();
    }
  };

  saveProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const { product } = req.body;
      const productSaved = await this.serviceProducts.saveProduct(product);
      if (productSaved) {
        res.status(200).json({
          status: true,
          message: 'Product successfully added',
          product: productSaved,
        });
      } else {
        logger.error(`Error at controller saveProduct, product it's undefined | null`);
        throw new Error();
      }
    } catch (error) {
      logger.error(`Error at controller saveProduct: ${error}`);
      throw new Error();
    }
  };

  deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const productToDelete = await new ServiceProduct().deleteProduct(id);
      if (productToDelete) {
        res.status(200).json({
          status: true,
          message: 'Product successfully deleted',
          product: productToDelete,
        });
      } else {
        res.status(200).json({
          status: false,
          message: 'Product not found',
        });
      }
    } catch (error) {
      logger.error(`Error at controller deleteProduct: ${error}`);
      throw new Error();
    }
  };

  updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const { product } = req.body;
      const productToUpdate = await new ServiceProduct().updateProduct(product);
      if (productToUpdate) {
        res.status(201).json({
          status: true,
          message: 'Product successfully updated',
          product: productToUpdate,
        });
      } else {
        res.status(201).json({
          status: false,
          message: 'Product not found',
        });
      }
    } catch (error) {
      logger.error(`Error at controller updateProduct: ${error}`);
      throw new Error();
    }
  };
}
