import { db } from '../db';
import { User, UserModel } from './User';
import { UserEntity } from './UserEntity';
export interface IUserRepository {
  getUser: () => Promise<void | User>;
  getRawUser: () => Promise<any>;
}
export class UserRepository implements IUserRepository {
  getUser: () => Promise<void | User> = () => {
    return UserModel.find().then((data) => {
      if (data) {
        return data[0];
      }
    });
  };

  getRawUser: () => Promise<void | UserEntity> = () => {
    return db
      .from('USER')
      .select('*')
      .then((rows) => {
        if (rows.length) {
          const user = rows[0];
          return {
            id: user['ID'],
            name: user['NAME'],
            surname: user['SURNAME'],
            height: user['HEIGHT'],
            weight: user['WEIGHT'],
            email: user['EMAIL'],
          };
        }
      })
      .catch((err) => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        db.destroy();
      });
  };
}
