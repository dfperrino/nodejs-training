import express from 'express';
import { UserService } from '../services/UserService';

const controller = () => {
  const router = express.Router();

  router.get('/', (_req, res) => {
    const userService = new UserService();
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
