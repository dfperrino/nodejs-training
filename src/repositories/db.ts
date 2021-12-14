import { knex } from 'knex';

const options = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: 'minsait',
    database: 'test',
  },
};

export const db = knex(options);
