import { promises as fs } from 'fs';
import { logger } from '../config/winstonConfig/winstonConfig';

interface MyDocument {
  _id: string;
}

export abstract class ContainerFileSystem<T extends MyDocument> {
  private readonly filePath: string;

  protected constructor(filePath: string) {
    this.filePath = filePath;
  }

  async getAll(): Promise<T[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      logger.error(`Error at getAll FS, ${(error)}`);
      throw new Error();
    }
  }

  async find(data: any): Promise<any> {
    const allData = await this.getAll();
    return allData.find((item: any) => {
      return Object.entries(data).every(([key, value]) => {
        return item[key] === value;
      });
    });
  }

  async save(item: T): Promise<T> {
    try {
      const allItems = await this.getAll();
      allItems.push(item);
      await fs.writeFile(this.filePath, JSON.stringify(allItems, null, 4));
      return item;
    } catch (err) {
      logger.info(err);
      throw new Error('FileSystem DB Error');
    }
  }

  async updateOne(item: T): Promise<T | null> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      const items = JSON.parse(data);
      const itemIndex = items.findIndex((i: T) => i._id === item._id);
      if (itemIndex === -1) {
        return null;
      }
      items[itemIndex] = item;
      await fs.writeFile(this.filePath, JSON.stringify(items, null, 4));
      return item;
    } catch (error) {
      logger.error(`Error at updating Product: ${(error)}`);
      throw new Error();
    }
  }

  async deleteOne(itemID: string): Promise<T | null | undefined> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      const items = JSON.parse(data);
      const itemIndex = items.findIndex((i: T) => i._id === itemID);
      if (itemIndex === -1) {
        return null;
      }
      const deletedItem = items.splice(itemIndex, 1)[0];
      await fs.writeFile(this.filePath, JSON.stringify(items, null, 4));
      return deletedItem;
    } catch (error) {
      logger.error(`Error at deleting Product: ${(error)}`);
      throw new Error();
    }
  }

  // Metodos creados para hacer funcionar passport con diferentes persistencias.

  async findById(id: string | unknown, done: (err: any, user?: T | null) => void): Promise<void> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      const items = JSON.parse(data);
      const user = items.find((i: T) => i._id === id);

      if (!user) {
        done(user, null);
        return;
      }
      done(null, user);
    } catch (err) {
      logger.error(`Error at finding document by ID: ${(err)}`);
      done(err);
    }
  }

  async findOne(filter: any, done: (err: any, user?: any, options?: any) => void): Promise<void> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      const parsedData = JSON.parse(data);
      const user = parsedData.find((i: any) => {
        return Object.entries(filter).every(([key, value]) => i[key] === value);
      });
      if (!user) {
        done(null, false);
      } else {
        done(null, user);
      }
    } catch (error) {
      logger.error(`Error at finding document: ${(error)}`);
      done(error);
    }
  }
}
