import cookieParser from 'cookie-parser';
import express from 'express';
import { connect } from 'mongoose';
import logger from 'morgan';
import path from 'path';
import 'reflect-metadata';
import indexRouter from './routes/index';
import usersRouter from './routes/users';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));
// app.use(isCloudyToday);

connect('mongodb://localhost:27017', {
  user: 'minsait',
  pass: 'minsait',
  dbName: 'local',
}).then(() => {
  app.use('/', indexRouter);
  app.use('/users', usersRouter());

  app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
  });
});
