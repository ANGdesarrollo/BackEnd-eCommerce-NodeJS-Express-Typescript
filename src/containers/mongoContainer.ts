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
      logger.error(`Error at getAll DB, ${(error)}`);
      throw new Error();
    }
  }

  async find(data: any): Promise<T | null> {
    try {
      return await this.model.findOne(data);
    } catch (error) {
      logger.error(`Error at find, ${(error)}`);
      throw new Error();
    }
  }

  async save(item: T): Promise<T> {
    try {
      return await this.model.create(item);
    } catch (error) {
      logger.error(`Error at saving Product: ${(error)}`);
      throw new Error();
    }
  }

  async updateOne(item: T): Promise<T | null> {
    try {
      const filter = { _id: item._id };
      console.log(filter)
      const update = { ...item };
      return await this.model.findOneAndUpdate(filter, update, { new: true });
    } catch (error) {
      logger.error(`Error at updating Product: ${(error)}`);
      throw new Error();
    }
  }

  async deleteOne(itemID: string): Promise<T | null | undefined> {
    return await this.model.findByIdAndDelete(itemID);
  }

  // Metodos creados para hacer andar passport sin usar directamente el modelo.

  async findById(id: string | unknown, done: (err: any, user?: T | null) => void): Promise<void> {
    try {
      const user = await this.model.findById(id);
      done(null, user);
    } catch (err) {
      logger.error(`Error at finding document by ID: ${(err)}`);
      done(err);
    }
  }

  async findOne(filter: any, done: (err: any, data?: any, options?: any) => void): Promise<void> {
    try {
      const dataToFind = await this.model.findOne(filter);
      if (!dataToFind) {
        done(null, false);
      } else {
        done(null, dataToFind);
      }
    } catch (error) {
      logger.error(`Error at finding document: ${(error)}`);
      done(error);
    }
  }
}
