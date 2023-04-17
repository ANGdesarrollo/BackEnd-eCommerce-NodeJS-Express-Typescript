import { type Server } from 'socket.io';
import { logger } from '../../config/winstonConfig/winstonConfig';
import { ControllerChat } from './controllerChat';
import { type IMessageDTO } from '../../interfaces/interfaceChat';

const Chat = new ControllerChat();

export const ioSocket = ({ io }: { io: Server }): void => {
  io.on('connection', async (socket) => {
    logger.info(`user ${socket.id} is online`);
    socket.on('client_message', async (data: IMessageDTO) => {
      await Chat.saveMessage(data, { io });
    });
    socket.on('admin_message', async (data: IMessageDTO) => {
      await Chat.saveAdminMessage(data, { io });
    });
    socket.emit('server_allMessages', await Chat.getChats());
  });
};
