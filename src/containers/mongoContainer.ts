import { type Model, type Types } from 'mongoose';

export class ContainerMongo<T> {
  private readonly model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async getAll(): Promise<T[]> {
    return await this.model.find();
  }

  async update(id: Types.ObjectId | string, update: Partial<T>): Promise<T | null> {
    const options = { new: true } as const;
    const document = await this.model.findByIdAndUpdate(id, update, options).lean().exec();
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return document ? ({ ...document } as T) : null;
  }

  async delete(id: Types.ObjectId | string): Promise<T | null> {
    const document = await this.model.findByIdAndDelete(id).lean().exec();
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return document ? ({ ...document } as T) : null;
  }
}
