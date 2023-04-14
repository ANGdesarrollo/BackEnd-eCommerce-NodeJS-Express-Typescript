import { type Server } from 'socket.io';
import { logger } from '../../../build/config/winstonConfig/winstonConfig';
import { ControllerChat } from './controllerChat';

const Chat = new ControllerChat();

export const ioSocket = ({ io }: { io: Server }): void => {
  io.on('connection', async (socket) => {
    logger.info(`user ${socket.id} is online`);
    socket.on('client_message', Chat.saveMessage);
    socket.emit('server_allMessages', await Chat.getChats());
  });
};
