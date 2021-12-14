import { Connection, Repository } from 'typeorm';
import { db } from '../db';
import { UserEntity } from './UserEntity';
export interface IUserRepository {
  getUser: () => Promise<void | UserEntity>;
  getRawUser: () => Promise<any>;
}
export class UserRepository implements IUserRepository {
  private repository: Repository<UserEntity>;

  constructor(connection: Connection) {
    this.repository = connection.getRepository(UserEntity);
  }

  getUser: () => Promise<void | UserEntity> = () => {
    return this.repository.findOne();
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
