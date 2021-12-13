import axios from 'axios';
import { UserEntity } from './UserEntity';

export class UserRepository {
  static getUser: () => Promise<void | UserEntity> = () => {
    return axios
      .get<UserEntity>(
        'https://run.mocky.io/v3/c85781ec-af93-4ea2-b7e2-34de7be5aad5'
      )
      .then((resp) => resp.data);
  };
}
