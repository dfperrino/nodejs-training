export interface IBasicUserInfo {
  name: string;
  email: string;
  id: number;
  favouriteColors: string[];
}

export interface UserInfoResponse {
  name: string;
  surname: string;
  id: number;
  colors: string[];
  height: number;
  weight: number;
  email: string;
}

export interface IUserService {
  getUserInfo: () => Promise<IBasicUserInfo>;
}
