import { type IChatDTO, type IChat, type IMessage, type IMessageDTO } from '../../interfaces/interfaceChat';
import { type DaosFileSystemChat, type DaosMongoChat } from './daosChat';
import { ModelChat } from './modelChat';
import DaosChat from './chatDaosFactory';
import { date } from '../../utils/date/date';
import { logger } from '../../config/winstonConfig/winstonConfig';
import { useValidators } from '../../utils/validators/useValidators';
import mongoose from 'mongoose';
import { type Server } from 'socket.io';

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
      logger.error(`Error at getting allChats on Service: ${(error)}`);
      throw new Error();
    }
  }

  async getChatUserService(username: string, { io }: { io: Server }): Promise<void> {
    try {
      const userChat: IChat = await this.DaosModel.find({username});
      if(userChat) {
        io.emit(`${username}`, userChat);
      }
    } catch (error) {
      logger.error(`Error at getting allChats on Service: ${(error)}`);
      throw new Error();
    }
  }

  async saveService(message: IMessageDTO, { io }: { io: Server }): Promise<void> {
    try {
      const { messageValidator } = useValidators();
      const { username } = message;
      const findChat: IChat = await this.DaosModel.find({ username });
      const validateMessage = await messageValidator(message);
      const formatedMessage: IMessage = { ...validateMessage, created_at: date(), _id: new mongoose.Types.ObjectId() };

      if (!findChat) {
        const formatedChat: IChatDTO = {
          created_at: date(),
          message: [],
          username,
        };
        formatedChat.message.push(formatedMessage);
        const formatedChatModel: IChat = new ModelChat(formatedChat);
        const chat: IChat = await this.DaosModel.save(formatedChatModel);
        io.sockets.emit('server_chat', chat);
      } else {
        findChat.message.push(formatedMessage);
        const saveMessage = await this.DaosModel.updateOne(findChat);
        if (!saveMessage) {
          logger.error(`Message at saveServiceChat is undefined | null`);
          throw new Error();
        } else {
          io.sockets.emit(`${saveMessage._id}`, saveMessage);
          io.sockets.emit('server_chat', saveMessage);
        }
      }
    } catch (error) {
      logger.error(`Error at saving chat on Service: ${(error)}`);
      throw new Error();
    }
  }

  async saveAdminService(message: IMessageDTO, { io }: { io: Server }): Promise<void> {
    try {
      const { messageValidator } = useValidators();
      const validateMessage = await messageValidator(message);
      const chatToFind: IChat = await DaosChat.find({ _id: message.idRoom });
      const formatedMessage: IMessage = { ...validateMessage, created_at: date(), _id: new mongoose.Types.ObjectId() };
      if (chatToFind) {
        chatToFind.message.push(formatedMessage);
        const saveMessage = await this.DaosModel.updateOne(chatToFind);
        if (saveMessage) {
          io.sockets.emit(`${message.idRoom}`, saveMessage);
          io.sockets.emit('server_chat', saveMessage);
        } else {
          logger.error(`Message at saveAdminServiceChat is undefined | null`);
          throw new Error();
        }
      }
    } catch (error) {
      logger.error(`Error at saving Admin response chat on Service: ${(error)}`);
      throw new Error();
    }
  }
}
