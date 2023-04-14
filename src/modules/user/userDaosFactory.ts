import { env } from '../../config/envConfig/envConfig';
import { DaosFileSystemUser, DaosMongoUser } from './userDaos';

let DaosUser: DaosMongoUser | DaosFileSystemUser;

if (env.PERSISTENCE === 'MONGO') {
  DaosUser = new DaosMongoUser();
} else {
  DaosUser = new DaosFileSystemUser();
}

export default DaosUser;
