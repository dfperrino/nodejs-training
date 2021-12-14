import { Connection } from 'typeorm';
import {
  IUserRepository,
  UserRepository,
} from '../repositories/user/UserRepository';
import { IBasicUserInfo, IUserService } from './types';

export class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor(connection: Connection) {
    this.userRepository = new UserRepository(connection);
  }

  getUserInfo: () => Promise<void | IBasicUserInfo> = () => {
    console.log('hola, estoy procesando');
    return this.userRepository
      .getRawUser()
      .then((data) => {
        if (data) {
          return {
            name: `${data.name} ${data.surname}`,
            email: data.email,
            id: data.id,
          };
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
}
