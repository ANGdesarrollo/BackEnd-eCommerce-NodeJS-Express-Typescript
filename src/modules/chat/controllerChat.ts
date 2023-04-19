import { type Server } from 'socket.io';
import { logger } from '../../config/winstonConfig/winstonConfig';
import { type IMessageDTO, type IChat } from '../../interfaces/interfaceChat';
import { ServiceChat } from './serviceChat';

export class ControllerChat {
  public serviceChat: ServiceChat;
  constructor() {
    this.serviceChat = new ServiceChat();
  }

  async getChats(): Promise<IChat[]> {
    try {
      const allChats = await new ServiceChat().getChatsService();
      return allChats;
    } catch (error) {
      logger.error(`Error at controller Chat, getChats: ${String(error)}`);
      throw new Error();
    }
  }

  async getUserChat(username: string, { io }: { io: Server }): Promise<void> {
    try {
      await new ServiceChat().getChatUserService(username, { io });
    } catch (error) {
      logger.error(`Error at controller Chat, getChats: ${String(error)}`);
      throw new Error();
    }
  }

  async saveMessage(message: IMessageDTO, { io }: { io: Server }): Promise<void> {
    try {
      await new ServiceChat().saveService(message, { io });
    } catch (error) {
      logger.error(`Error at controller Chat, saveMessage: ${String(error)}`);
      throw new Error();
    }
  }

  async saveAdminMessage(message: IMessageDTO, { io }: { io: Server }): Promise<void> {
    try {
      await new ServiceChat().saveAdminService(message, { io });
    } catch (error) {
      logger.error(`Error at controller Chat, saveAdminMessage: ${String(error)}`);
      throw new Error();
    }
  }
}
