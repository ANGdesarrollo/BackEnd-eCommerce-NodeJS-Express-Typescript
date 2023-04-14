import { type IChatDTO, type IChat, type IMessage, type IMessageDTO } from '../../interfaces/interfaceChat';
import { type DaosFileSystemChat, type DaosMongoChat } from './daosChat';
import { ModelChat } from './modelChat';
import DaosChat from './chatDaosFactory';
import { date } from '../../utils/date/date';
import { logger } from '../../../build/config/winstonConfig/winstonConfig';
import { useValidators } from '../../utils/validators/useValidators';

export class ServiceChat {
  public DaosModel: DaosMongoChat | DaosFileSystemChat;
  constructor() {
    this.DaosModel = DaosChat;
  }

  async getChatsService(): Promise<IChat[]> {
    try {
      const allChats = await this.DaosModel.getAll();
      return allChats;
    } catch (error) {
      logger.error(`Error at getting allChats on Service: ${String(error)}`);
      throw new Error();
    }
  }

  async saveService(message: IMessageDTO): Promise<void> {
    try {
      const { messageValidator } = useValidators();
      const { username } = message;
      const findChat: IChat = await this.DaosModel.find({ username });
      const validateMessage = await messageValidator(message);
      const formatedMessage: IMessage = { ...validateMessage, created_at: date() };

      if (!findChat) {
        console.log('entre');
        const formatedChat: IChatDTO = {
          created_at: date(),
          message: [],
          username,
        };
        formatedChat.message.push(formatedMessage);
        const formatedChatModel: IChat = new ModelChat(formatedChat);
        await this.DaosModel.save(formatedChatModel);
      } else {
        findChat.message.push(formatedMessage);
        const saveMessage = await this.DaosModel.updateOne(findChat);
        if (!saveMessage) {
          logger.error(`Message at saveServiceChat is undefined | null`);
          throw new Error();
        }
      }
    } catch (error) {
      logger.error(`Error at saving chat on Service: ${String(error)}`);
      throw new Error();
    }
  }
}
