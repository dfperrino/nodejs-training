import { Connection, Repository } from 'typeorm';
import { UserEntity } from './UserEntity';

export interface IUserRepository {
  getUser: () => Promise<void | UserEntity>;
}
export class UserRepository implements IUserRepository {
  private repository: Repository<UserEntity>;

  constructor(connection: Connection) {
    this.repository = connection.getRepository(UserEntity);
  }

  getUser: () => Promise<void | UserEntity> = () => {
    return this.repository.findOne();
  };
}
