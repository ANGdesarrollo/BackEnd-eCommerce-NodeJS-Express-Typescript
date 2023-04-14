import { ContainerFileSystem } from '../../containers/fileSystemContainer';
import { ContainerMongo } from '../../containers/mongoContainer';
import { type IChat } from '../../interfaces/interfaceChat';
import { ModelChat } from './modelChat';
import fs from 'fs';

export class DaosMongoChat extends ContainerMongo<IChat> {
  constructor() {
    super(ModelChat);
  }
}

export class DaosFileSystemChat extends ContainerFileSystem<IChat> {
  constructor() {
    const filePath = './src/database/fileSystem/chats.txt';
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '[]', 'utf-8');
    }
    super(filePath);
  }
}
