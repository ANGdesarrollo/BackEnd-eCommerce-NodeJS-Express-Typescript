import { logger } from '../../config/winstonConfig/winstonConfig';
import { type IChat, type IMessage } from '../../interfaces/interfaceChat';
import { ServiceChat } from './serviceChat';

export class ControllerChat {
  public serviceChat: ServiceChat;
  constructor() {
    this.serviceChat = new ServiceChat();
  }

  async getChats(): Promise<IChat[]> {
    try {
      const allChats = await new ServiceChat().getChatsService();
      console.log('ENNTREEEE', allChats);
      return allChats;
    } catch (error) {
      logger.error(`Error at controller Chat, getChats: ${String(error)}`);
      throw new Error();
    }
  }

  async saveMessage(message: IMessage): Promise<void> {
    try {
      await new ServiceChat().saveService(message);
    } catch (error) {
      logger.error(`Error at controller Chat, saveMessage: ${String(error)}`);
      throw new Error();
    }
  }
}
