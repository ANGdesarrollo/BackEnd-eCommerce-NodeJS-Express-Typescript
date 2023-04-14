import { env } from '../../config/envConfig/envConfig';
import { DaosFileSystemChat, DaosMongoChat } from './daosChat';

let DaosChat: DaosMongoChat | DaosFileSystemChat;

if (env.PERSISTENCE === 'MONGO') {
  DaosChat = new DaosMongoChat();
} else {
  DaosChat = new DaosFileSystemChat();
}

export default DaosChat;
