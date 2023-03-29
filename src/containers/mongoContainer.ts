import { type Model, type FilterQuery } from 'mongoose';

export abstract class ContainerMongo<T extends Document> {
  constructor(private readonly model: Model<T>) {}

  async getAll(): Promise<T[]> {
    try {
      const foundItems = await this.model.find().exec();
      return foundItems;
    } catch (error) {
      throw new Error(`Error getting all items: ${String(error)}`);
    }
  }

  async create(item: T): Promise<T> {
    try {
      const createdItem = await this.model.create(item);
      return createdItem;
    } catch (error) {
      throw new Error(`Error creating item: ${String(error)}`);
    }
  }

  async findById(id: string): Promise<T | null> {
    try {
      const foundItem = await this.model.findById(id).exec();
      return foundItem;
    } catch (error) {
      throw new Error(`Error finding item by id: ${String(error)}`);
    }
  }

  async find(query: FilterQuery<T>): Promise<T[]> {
    try {
      const foundItems = await this.model.find(query).exec();
      return foundItems;
    } catch (error) {
      throw new Error(`Error finding items: ${String(error)}`);
    }
  }

  async update(id: string, item: T): Promise<T | null> {
    try {
      const updatedItem = await this.model
        .findByIdAndUpdate(id, item, { new: true })
        .exec();
      return updatedItem;
    } catch (error) {
      throw new Error(`Error updating item: ${String(error)}`);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.model.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new Error(`Error deleting item: ${String(error)}`);
    }
  }
}
