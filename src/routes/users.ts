import express from 'express';
import { Connection } from 'typeorm';
import { UserService } from '../services/UserService';

const controller = (connection: Connection) => {
  const router = express.Router();

  router.get('/', (_req, res) => {
    const userService = new UserService(connection);
    userService
      .getUserInfo()
      .then((response) => {
        return res.json(response);
      })
      .catch((error) => {
        console.error(error);
        return res.send('Error!');
      });
  });

  return router;
};

export default controller;
