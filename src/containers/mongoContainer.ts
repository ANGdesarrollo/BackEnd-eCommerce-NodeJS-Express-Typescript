import { type Model } from 'mongoose';
import { logger } from '../config/winstonConfig/winstonConfig';

export abstract class ContainerMongo<T> {
  private readonly model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async getAll(): Promise<T[]> {
    try {
      return await this.model.find();
    } catch (error) {
      logger.error(`Error at getAll DB, ${String(error)}`);
      throw new Error();
    }
  }

  async save(item: T): Promise<T> {
    try {
      return await this.model.create(item);
    } catch (error) {
      logger.error(`Error at saving Product: ${String(error)}`);
      throw new Error();
    }
  }

  async deleteOne(itemID: string): Promise<T | null> {
    return await this.model.findByIdAndDelete(itemID);
  }
}
