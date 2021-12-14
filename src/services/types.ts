export interface IBasicUserInfo {
  name: string;
  email: string;
  id: number;
}

export interface IUserService {
  getUserInfo: () => Promise<void | IBasicUserInfo>;
}
