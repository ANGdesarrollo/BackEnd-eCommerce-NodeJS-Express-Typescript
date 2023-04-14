import { ContainerFileSystem } from '../../containers/fileSystemContainer';
import { ContainerMongo } from '../../containers/mongoContainer';
import { type IUser } from '../../interfaces/interfaceUser';
import UserModel from './modelUser';
import fs from 'fs';

export class DaosMongoUser extends ContainerMongo<IUser> {
  constructor() {
    super(UserModel);
  }
}

export class DaosFileSystemUser extends ContainerFileSystem<IUser> {
  constructor() {
    const filePath = './src/database/fileSystem/users.txt';
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '[]', 'utf-8');
    }
    super(filePath);
  }
}
