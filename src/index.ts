import cookieParser from 'cookie-parser';
import express from 'express';
import logger from 'morgan';
import path from 'path';
import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
import indexRouter from './routes/index';
import usersRouter from './routes/users';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));
// app.use(isCloudyToday);

createConnection().then((connection: Connection) => {
  app.use('/', indexRouter);
  app.use('/users', usersRouter(connection));

  app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
  });
});
