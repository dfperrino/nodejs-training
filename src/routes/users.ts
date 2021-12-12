import express from 'express';
import { UserService } from '../services/UserService';
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

export default router;
