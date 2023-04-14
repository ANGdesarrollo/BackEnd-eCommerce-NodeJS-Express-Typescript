export interface IChat extends IChatDTO {
  _id: string;
}

export interface IChatDTO {
  created_at: string;
  message: IMessage[];
  username: string;
}

export interface IMessage extends IMessageDTO {
  created_at: string;
}

export interface IMessageDTO {
  message: string;
  username: string;
}
