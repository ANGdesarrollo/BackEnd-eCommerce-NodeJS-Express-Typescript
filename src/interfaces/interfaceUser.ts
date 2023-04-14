export interface IUserDTO {
  username: string;
  password: string;
  secretKey?: string;
}

export interface IUser extends IUserDTO {
  _id: string;
  date: string;
  admin: boolean;
}

export interface IUserController {
  username: string;
  admin: boolean;
}
