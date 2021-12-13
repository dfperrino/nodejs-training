import { UserRepository } from '../repositories/user/UserRepository';
import { IBasicUserInfo, IUserService } from './types';

export class UserService implements IUserService {
  getUserInfo: () => Promise<void | IBasicUserInfo> = () => {
    console.log('hola, estoy procesando');
    return UserRepository.getUser()
      .then((data) => {
        if (data) {
          return {
            name: `${data.name} ${data.surname}`,
            email: data.email,
            id: data.id,
            favouriteColors: data.colors,
          };
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
}
