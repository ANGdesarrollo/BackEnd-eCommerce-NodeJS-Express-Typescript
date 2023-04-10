import { type Model } from 'mongoose';
import { logger } from '../config/winstonConfig/winstonConfig';

interface MyDocument {
  _id: string;
}

export abstract class ContainerMongo<T extends MyDocument> {
  private readonly model: Model<T>;

  protected constructor(model: Model<T>) {
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

  async updateOne(item: T): Promise<T | null> {
    try {
      console.log(item);
      const filter = { _id: item._id };
      const update = { ...item };
      return await this.model.findOneAndUpdate(filter, update, { new: true });
    } catch (error) {
      logger.error(`Error at updating Product: ${String(error)}`);
      throw new Error();
    }
  }

  async deleteOne(itemID: string): Promise<T | null> {
    return await this.model.findByIdAndDelete(itemID);
  }
}
