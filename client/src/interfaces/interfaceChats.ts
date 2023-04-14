export interface IChat {
    _id: string;
    created_at: string;
    message: IMessage[];
    username: string;
    edit?: any;
}

export interface IMessage {
    created_at: string;
    message: string;
    username: string;
}



