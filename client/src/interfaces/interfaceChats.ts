export interface IChat {
    _id: string;
    created_at: string;
    message: IMessage[];
    username: string;
    edit?: any;
}

export interface IMessage extends IMessageDTO {
    _id: string;
    created_at: string;
}

export interface IResponseMessage extends  IMessageDTO {
    idRoom: string;
}

export interface IMessageDTO {
    message: string;
    username: string;
}



