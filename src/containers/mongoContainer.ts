import { type Model } from 'mongoose';

export abstract class ContainerMongo<T> {
  private readonly model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async getAll(): Promise<T[]> {
    return await this.model.find();
  }

  async save(item: T): Promise<T> {
    return await this.model.create(item);
  }
}
