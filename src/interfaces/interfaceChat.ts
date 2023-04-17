import { type Types } from 'mongoose';

export interface IChat extends IChatDTO {
  _id: string;
}

export interface IChatDTO {
  created_at: string;
  message: IMessage[];
  username: string;
}

export interface IChatDTOAdminResponse {
  idRoom: string;
  username: string;
  message: string;
}

export interface IMessage extends IMessageDTO {
  _id: Types.ObjectId;
  created_at: string;
}

export interface IMessageDTO {
  idRoom?: string;
  message: string;
  username: string;
}
