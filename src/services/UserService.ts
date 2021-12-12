import axios from 'axios';
import { IBasicUserInfo, IUserService, UserInfoResponse } from './types';

export class UserService implements IUserService {
  getUserInfo: () => Promise<void | IBasicUserInfo> = () => {
    console.log('hola, estoy procesando');
    return axios
      .get<UserInfoResponse>(
        'https://run.mocky.io/v3/c85781ec-af93-4ea2-b7e2-34de7be5aad5'
      )
      .then((response) => {
        if (response.data) {
          return {
            name: `${response.data.name} ${response.data.surname}`,
            email: response.data.email,
            id: response.data.id,
            favouriteColors: response.data.colors,
          };
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
}
