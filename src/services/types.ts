export interface IBasicUserInfo {
  name: string;
  email: string;
  id: number;
  favouriteColors: string[];
}

export interface IUserService {
  getUserInfo: () => Promise<void | IBasicUserInfo>;
}
